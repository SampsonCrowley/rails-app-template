FactoryBot.define do
  factory :admin_user do
    email "sample@email.address"
    password 'asdfasdf'
    password_confirmation 'asdfasdf'
  end
end
