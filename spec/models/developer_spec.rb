require 'rails_helper'

RSpec.describe Developer, type: :model do
  let(:factory_dev) do
    build(:developer)
  end

  it "has a valid factory" do
    expect(factory_dev.valid?).to be true
  end

  describe :attributes do
    #       first:  :text, required
    #      middle:  :text,
    #        last:  :text, required
    #      suffix:  :text,
    #         dob:  :date, required
    #       email:  :text, required
    #  created_at:  :datetime,
    #  updated_at:  :datetime

    %w(
      first
      last
    ).each do |nm|
      describe nm do
        let(:record) do
          factory_dev.dup
        end

        it "is required" do
          record.__send__("#{nm}=", nil)
          expect(record.valid?).to be false
          expect(record.errors[nm.to_sym]).to include("can't be blank")
        end

        it "is must be at least 2 characters" do
          record.__send__("#{nm}=", 'a')
          expect(record.valid?).to be false
          expect(record.errors[nm.to_sym]).to include("is too short (minimum is 2 characters)")

          record.__send__("#{nm}=", 'ab')
          expect(record.valid?).to be true
          expect(record.save).to be true
        end
      end
    end

    %w(
      middle
      suffix
    ).each do |nm|
      describe nm do
        let(:record) do
          factory_dev.dup
        end

        it "is optional" do
          record.__send__("#{nm}=", nil)
          expect(record.valid?).to be true
          expect(record.errors[nm.to_sym]).to be_empty
        end
      end
    end

    describe :email do
      let(:record) do
        record = factory_dev.dup
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

    describe :dob do
      let(:record) do
        record = factory_dev.dup
      end

      it "is required" do
        record.dob = nil
        expect(record.valid?).to be false
        expect(record.errors[:dob]).to include("can't be blank")
      end

      it "has to be at least 13 years ago" do
        record.dob = 13.years.ago.to_date + 1.day
        expect(record.valid?).to be false
        expect(record.errors[:dob]).to include("You must be at least 13 years old to use this app")

        record.dob = 13.years.ago.to_date
        expect(record.valid?).to be true
        expect(record.errors[:dob]).to be_empty
      end
    end

  end

  describe :associations do
    it "has many tasks" do
      t = Developer.reflect_on_association(:tasks)
      expect(t.options[:inverse_of]).to eq(:developer)
      expect(t.foreign_key.to_sym).to eq(:developer_id)
      expect(t.macro).to eq(:has_many)
    end
  end
end
