FactoryBot.define do
  sequence :email do |n|
    "sample_#{n}@email.address"
  end
  factory :developer do
    email
    first "MyString"
    middle "MyString"
    last "MyString"
    suffix "MyString"
    dob 20.years.ago
  end
end
