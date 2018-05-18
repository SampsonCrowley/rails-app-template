class MoneyInteger
  include Comparable

  def initialize(num = nil)
    return @num = nil unless num

    if num.is_a?(MoneyInteger)
      @num = num.to_i
    elsif num.is_a?(Integer)
      @num = num
    else
      @num = (num.to_d * 100).to_i
    end
  end

  def self.===(other)
    Integer === other
  end

  def self.<=>(other)
    Integer <=> other
  end

  def <=>(other)
    @num <=> other
  end

  def == (compare)
    @num == compare
  end

  def kind_of?(klass)
    @num.kind_of?(klass)
  end

  def to_i
    @num.to_i
  end

  def to_f
    to_i/100.0
  end

  def to_d
    to_i.to_d/100
  end

  def cents
    self
  end

  def value
    @num
  end

  def as_json(*args)
    @num.as_json(*args)
  end

  def inspect
    to_s(true)
  end

  def negative_sign
    value < 0 ? '-' : ''
  end

  def coerce(other)
    [other, @num]
  end

  def to_s(currency = false)
    return nil unless currency || @num.present?
    "#{negative_sign}#{currency ? '$' : ''}#{sprintf("%0.02f",to_d.abs)}".reverse.gsub(/(\d{3})(?=\d)/, currency ? '\\1,' : '\\1').reverse
  end

  def method_missing(name, *args, &blk)
    ret = @num.send(name, *args, &blk)
    ret.is_a?(Numeric) ? MoneyInteger.new(ret) : ret
  end
end
