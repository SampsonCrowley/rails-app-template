class Developer < ApplicationRecord
  # == Constants ============================================================

  # == Attributes ===========================================================
  #          id:  :integer,
  #       first:  :text, required
  #      middle:  :text,
  #        last:  :text, required
  #      suffix:  :text,
  #         dob:  :date, required
  #       email:  :text, required
  #  created_at:  :datetime,
  #  updated_at:  :datetime

  # == Extensions ===========================================================

  # == Relationships ========================================================
  has_one_attached :pre_avatar
  has_one_attached :avatar
  has_many :tasks, inverse_of: :developer

  # == Validations ==========================================================
  validates :first, :last, presence: true, length: { minimum: 2 }

  validates_presence_of :dob
  validate :older_than_12, if: :dob_changed?

  validates :email, presence: true,
                    format: { with: /\A[^@;\/\\]+\@[^@;\/\\]+\.[^@;\.\/\\]+\z/ },
                    uniqueness: { case_sensitive: false }

  validate :pre_avatar, :valid_image

  # == Scopes ===============================================================

  # == Callbacks ============================================================

  # == Class Methods ========================================================

  # == Instance Methods =====================================================

  private
    def older_than_12
      if dob > 13.years.ago.to_date
        errors.add(:dob, 'You must be at least 13 years old to use this app')
        false
      else
        true
      end
    end

    def valid_image_format
      unless pre_avatar.blob.content_type.start_with? 'image/'
        errors.add(:pre_avatar, 'is not an image file')
        return false
      end
      true
    end

    def valid_image_size
      if pre_avatar.blob.byte_size > 500.kilobytes
        errors.add(:pre_avatar, 'is too large, avatar must be < 500KB')
        return false
      end
      true
    end

    def valid_image
      return unless pre_avatar.attached?

      valid_image_format &&
      valid_image_size &&
      avatar.attach(pre_avatar.blob)

      pre_avatar.purge_later
    end
end
