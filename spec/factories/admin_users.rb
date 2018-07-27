FactoryBot.define do
  factory :admin_user do
    sequence(:email) {|n| "admin_user_email_#{n}@email.address" }
    password 'asdfasdf'
    password_confirmation 'asdfasdf'
  end
end
