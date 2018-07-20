FactoryBot.define do
  sequence :email do |n|
    "sample_#{n}@email.address"
  end
  factory :developer do
    email
    new_password 'asdfasdf'
    new_password_confirmation 'asdfasdf'
    first "MyString"
    middle "MyString"
    last "MyString"
    suffix "MyString"
    dob 20.years.ago
    after(:create) do |developer|
      developer.avatar.attach(io: File.open(Rails.root.join('spec', 'factories', 'images', 'avatar.svg')), filename: 'avatar.svg', content_type: 'image/svg+xml')
    end
  end
end
