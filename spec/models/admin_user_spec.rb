require 'rails_helper'

RSpec.describe AdminUser, type: :model do
  has_valid_factory(:admin_user)
  describe 'Attributes' do
    #                  email: :string, required
    #     encrypted_password: :string, required
    #   reset_password_token: :string
    # reset_password_sent_at: :datetime
    #    remember_created_at: :datetime
    #          sign_in_count: :integer, required
    #     current_sign_in_at: :datetime
    #        last_sign_in_at: :datetime
    #     current_sign_in_ip: :inet
    #        last_sign_in_ip: :inet
    #             created_at: :datetime, required
    #             updated_at: :datetime, required

    required_column(:admin_user, :email, true) do
      it "must be a valid format" do
        record.email = 'sample@sample'
        expect(record.valid?).to be false
        expect(record.errors[:email]).to_not include("can't be blank")
        expect(record.errors[:email]).to include("is invalid")

        record.email = 'valid@email.email'
        expect(record.valid?).to be true
      end

      it "must be case-insensitively unique" do
        expect(record.save).to be true

        not_unique = record.dup
        expect(not_unique.valid?).to be false
        expect(not_unique.errors[:email]).to include("has already been taken")


        not_unique.email.upcase!
        expect(not_unique.email).to eq(record.email.upcase)
        expect(not_unique.valid?).to be false
        expect(not_unique.errors[:email]).to include("has already been taken")
      end
    end

    required_column(:admin_user, :password, false, true)

  end

end
