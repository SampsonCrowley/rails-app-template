require 'rails_helper'

RSpec.describe AdminUser, type: :model do
  let(:factory_admin) do
    build(:admin_user)
  end

  it 'has a valid factory' do
    expect(factory_admin.valid?).to be true
  end

  describe :attributes do
    #                  :email => :string,
    #     :encrypted_password => :string,
    #   :reset_password_token => :string,
    # :reset_password_sent_at => :datetime,
    #    :remember_created_at => :datetime,
    #          :sign_in_count => :integer,
    #     :current_sign_in_at => :datetime,
    #        :last_sign_in_at => :datetime,
    #     :current_sign_in_ip => :inet,
    #        :last_sign_in_ip => :inet,
    #             :created_at => :datetime,
    #             :updated_at => :datetime

    describe :email do
      let(:record) do
        record = factory_admin.dup
      end

      it "is required" do
        record.email = nil
        expect(record.valid?).to be false
        expect(record.errors[:email]).to include("can't be blank")
        expect(record.errors[:email]).to include("is invalid")
      end

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

    describe :password do
      it "is required" do
        record = factory_admin.dup

        record.password = nil
        expect(record.valid?).to be false
        expect(record.errors[:password]).to include("can't be blank")
      end

      it "is required" do
        record = factory_admin.dup

        record.password = nil
        expect(record.valid?).to be false
        expect(record.errors[:password]).to include("can't be blank")
      end
    end

  end

end
