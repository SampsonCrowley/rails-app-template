class Integer
  def cents
    MoneyInteger.new(self)
  end
end
