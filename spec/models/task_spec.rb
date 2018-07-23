require 'rails_helper'

RSpec.describe Task, type: :model do
  has_valid_factory(:task)

  describe :attributes do
    #        :title => :string,
    #  :description => :string,
    #     :due_date => :date,
    # :developer_id => :integer,
    #   :created_at => :datetime,
    #   :updated_at => :datetime

    required_column(:task, :title) do
      it "must be at least 5 characters" do
        record.title = 'a'
        expect(record.valid?).to be false
        expect(record.errors[:title]).to include("is too short (minimum is 5 characters)")

        record.title = 'abcde'
        expect(record.valid?).to be true
        expect(record.save).to be true
      end
    end

    describe :description do
      let(:record) do
        build(:task)
      end

      it "is optional" do
        record.description = nil
        expect(record.valid?).to be true
        expect(record.errors[:description]).to be_empty
      end
    end

    describe :due_date do
      let(:record) do
        build(:task)
      end

      it "is optional" do
        record.due_date = nil
        expect(record.valid?).to be true
        expect(record.errors[:due_date]).to be_empty
      end

      it "cannot be in the past" do
        record.due_date = Date.today
        expect(record.valid?).to be true
        expect(record.errors[:due_date]).to be_empty

        record.due_date = Date.yesterday
        expect(record.valid?).to be false
        expect(record.errors[:due_date]).to include('cannot be in the past')
      end
    end

  end

  describe :associations do
    it "belongs to a developer" do
      t = Task.reflect_on_association(:developer)
      expect(t.options[:inverse_of]).to eq(:tasks)
      expect(t.options[:required]).to_not eq(false)
      expect(t.foreign_key.to_sym).to eq(:developer_id)
      expect(t.macro).to eq(:belongs_to)
    end
  end
end
