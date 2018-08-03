class Address < ApplicationRecord
  # == Constants ============================================================

  # == Attributes ===========================================================

  # == Extensions ===========================================================

  # == Relationships ========================================================
  belongs_to :state, optional: true, inverse_of: :addresses

  # == Validations ==========================================================
  # validates_uniqueness_of :street, scope: [:street_2, :city, :state, :zip, :root_id]
  validate :state_or_province_and_country_exists

  # == Scopes ===============================================================
  default_scope { includes(:state) }

  # == Callbacks ============================================================
  after_validation :normalize

  # == Class Methods ========================================================
  def self.default_print
    [
      :id,
      :inline,
      :is_foreign,
    ]
  end

  def self.normalize(address)
    is_foreign = Boolean.parse(address['is_foreign'])
    {
      is_foreign: is_foreign,
      street: (address['street'].presence || '').strip.titleize.presence,
      street_2: (address['street_2'].presence || '').strip.titleize.presence,
      street_3: (address['street_3'].presence || '').strip.titleize.presence,
      city: (address['city'].presence || '').strip.titleize.presence,
      state: State.find_by_value(address['state_id'] || address['state']),
      province: (address['province'].presence || '').strip.titleize.presence,
      zip: (is_foreign ? address['zip'].presence : normal_zip(address['zip'])),
      country: (address['country'].presence || '').strip.upcase.presence,
    }
  end

  def self.normal_zip(zip)
    return nil unless zip.present?
    zip = "#{zip}".gsub(/\D/, '')
    return "0#{zip}" if zip.length < 5
    return zip.insert(-5, '-') if zip.length > 5
    zip
  end

  def self.new(attrs = {})
    return super(attrs) if attrs.blank?
    super(attrs.merge(normalize(attrs.with_indifferent_access)))
  end

  def self.merge_or_create(address, skip_save = false)
    found = Address.find_or_initialize_by(Address.normalize(address))

    found.save unless skip_save
    found
  end

  def self.changed(address_1, address_2)
    normalize(address_1).except(:category) != normalize(address_2).except(:category)
  end

  def self.run_autosave_for_other_models(model, addresses)
    return true unless addresses.present?
    addresses_list = []

    addresses.each do |address|
      if address._destroy
        model.addresses.delete(address)
        next
      end
      # rms = address.returned_mails.to_a
      # puts "\n\n\n\n\n\n", rms, "\n\n\n\n\n\n"

      if address.new_record?
        puts 'NEW RECORD'
        address = merge_or_create(address)
      else
        if existing = find_by(id: address.id)
          if changed(address, existing)
            model.addresses.delete(address)
            address = merge_or_create(address)
          elsif address.category != existing.category
            address.save
          end
        else
          model.addresses.delete(address)
          next
        end
      end

      # address.returned_mails ||= []

      # address.returned_mails |= rms

      address.save

      addresses_list << address
    end

    addresses_list.each do |address|
      unless model.addresses.any? {|addr| addr.id == address.id}
        begin
          model.addresses << address
        rescue
          puts $!.message
          puts $!.backtrace.first(100)
        end
      end
    end
  end

  def self.run_autosave_for_belongs_to_model(model, address)
    unless address.present?
      model.address = nil
      return true
    end

    # rms = address.returned_mails.to_a
    if address.new_record?
      address = merge_or_create(address)
    elsif existing = find_by(id: address.id)
      if changed(address, existing)
        address = merge_or_create(address)
      end
    end
    # address.returned_mails ||= []
    # address.returned_mails |= rms
    address.save

    model.address = address
  end

  # == Instance Methods =====================================================
  def to_s(formatting = :default)
    puts "Called"
    case formatting
    when :inline
      "#{street}, #{piv(street_2, true)}#{piv(street_3, true)}#{city}, #{porsa}, #{zip}#{cif(true)}"
    else
      "#{street}\n#{piv(street_2)}#{piv(street_3)}#{city}, #{porsa} #{zip}#{cif}"
    end
  end

  def to_shipping
    if is_foreign
      {
        street: street,
        street_2: street_2,
        street_3: street_3,
        city: city,
        province: province,
        zip: zip,
        country: country
      }
    else
      {
        street: street,
        street_2: street_2,
        city: city,
        state: state.abbr,
        zip: zip
      }
    end
  end

  def inline
    to_s(:inline)
  end

  def label
    to_s
  end

  def province_or_state_abbr
    province.presence || (state && state.abbr)
  end

  def country_if_foreign(inline = false)
    is_foreign ? "#{inline ? ', ': "\n"}#{country}" : nil
  end

  def print_if_value(val, inline = false)
    val.present? ? "#{val}#{inline ? ', ': "\n"}" : ''
  end

  private
    def piv(*args)
      print_if_value *args
    end

    def porsa
      province_or_state_abbr
    end

    def cif(*args)
      country_if_foreign *args
    end

    def normalize
      self.attributes = self.attributes.deep_symbolize_keys.merge(Address.normalize(self.attributes.with_indifferent_access))
    end

    def values_changed?
      self.street_changed? ||
      self.street_2_changed? ||
      self.street_3_changed? ||
      self.city_changed? ||
      self.state_id_changed? ||
      self.province_changed? ||
      self.zip_changed? ||
      self.country_changed?
    end

    def state_or_province_and_country_exists
      unless state_id.present? || (province.present? && country.present?)
        if is_foreign
          errors.add(:province, "Province is required for foreign addresses")
          errors.add(:country, "Country is required for foreign addresses")
        else
          errors.add(:state_id, "Address State is required for US addresses")
        end
      end
    end
end
