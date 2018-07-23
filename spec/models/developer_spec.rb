require 'rails_helper'

RSpec.describe Developer, type: :model do
  has_valid_factory(:developer)

  describe :attributes do
    #       first:  :text, required
    #      middle:  :text,
    #        last:  :text, required
    #      suffix:  :text,
    #         dob:  :date, required
    #       email:  :text, required
    #  created_at:  :datetime,
    #  updated_at:  :datetime

    [ :first, :last ].each do |nm|
      required_column(:developer, nm) do
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
          build(:developer)
        end

        it "is optional" do
          record.__send__("#{nm}=", nil)
          expect(record.valid?).to be true
          expect(record.errors[nm.to_sym]).to be_empty
        end
      end
    end

    required_column(:developer, :email, true) do
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

    required_column(:developer, :dob) do
      it "has to be at least 13 years ago" do
        record.dob = 13.years.ago.to_date + 1.day
        expect(record.valid?).to be false
        expect(record.errors[:dob]).to include("You must be at least 13 years old to use this app")

        record.dob = 13.years.ago.to_date
        expect(record.valid?).to be true
        expect(record.errors[:dob]).to be_empty
      end
    end

    describe :avatar do
      let(:developer) do
        create(:developer)
      end

      before(:each) do
        developer.avatar.purge
        developer.reload
      end

      it "accepts any image mime_type" do
        png_image_file = File.open(Rails.root.join('spec', 'factories', 'images', 'avatar.png'))
        svg_image_file = File.open(Rails.root.join('spec', 'factories', 'images', 'avatar.svg'))
        pdf_file = File.open(Rails.root.join('spec', 'factories', 'pdfs', 'sample.pdf'))
        developer.avatar.attach(io: pdf_file, filename: 'sample.pdf')
        expect(developer.valid?).to be false
        expect(developer.errors[:avatar]).to include('is not an image file')

        developer.reload
        expect(developer.avatar.attached?).to be false

        developer.avatar.attach(io: png_image_file, filename: 'avatar.png', content_type: 'image/png')
        expect(developer.valid?).to be true
        expect(developer.errors[:avatar]).to be_empty

        developer.reload
        expect(developer.avatar.attached?).to be true

        developer.avatar.purge
        developer.reload

        developer.avatar.attach(io: svg_image_file, filename: 'avatar.svg', content_type: 'image/svg+xml')
        expect(developer.valid?).to be true
        expect(developer.errors[:avatar]).to be_empty

        developer.reload
        expect(developer.avatar.attached?).to be true
      end

      it "is < 500KB" do
        small_image_file = File.open(Rails.root.join('spec', 'factories', 'images', 'avatar.png'))
        large_image_file = File.open(Rails.root.join('spec', 'factories', 'images', 'large-avatar.jpg'))

        developer.avatar.attach(io: large_image_file, filename: 'large.jpg', content_type: 'image/jpeg')
        expect(developer.valid?).to be false
        expect(developer.errors[:avatar]).to include('is too large, avatar must be < 500KB')

        developer.reload
        expect(developer.avatar.attached?).to be false

        developer.avatar.attach(io: small_image_file, filename: 'small.png', content_type: 'image/png')
        expect(developer.valid?).to be true
        expect(developer.errors[:avatar]).to be_empty

        developer.reload
        expect(developer.avatar.attached?).to be true
      end

      it "will not overwrite an existing avatar with an invalid one" do
        small_image_file = File.open(Rails.root.join('spec', 'factories', 'images', 'avatar.png'))
        large_image_file = File.open(Rails.root.join('spec', 'factories', 'images', 'large-avatar.jpg'))

        developer.attach_avatar(io: small_image_file, filename: 'small.png', content_type: 'image/png')

        developer.reload
        expect(developer.avatar.attached?).to be true
        expect(developer.last_avatar.attached?).to be true

        developer.avatar.attach(io: large_image_file, filename: 'large.jpg', content_type: 'image/jpeg')
        expect(developer.valid?).to be false
        expect(developer.errors[:avatar]).to include('is too large, avatar must be < 500KB')

        developer.reload
        expect(developer.avatar.attached?).to be true
        expect(developer.last_avatar.attached?).to be true
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
