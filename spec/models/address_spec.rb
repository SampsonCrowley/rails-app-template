require 'rails_helper'

RSpec.describe Address, type: :model do
  has_valid_factory(:pre_verified_address)

  describe 'Attributes' do
    #      is_foreign: :boolean, required
    #          street: :text, required
    #        street_2: :text
    #        street_3: :text
    #            city: :text, required
    #        state_id: :integer
    #        province: :text
    #             zip: :text, required
    #         country: :text
    #      created_at: :datetime, required
    #      updated_at: :datetime, required

    pending "add some examples to (or delete) #{__FILE__} Attributes"
  end

  describe 'Associations' do
    pending "add some examples to (or delete) #{__FILE__} Attributes"
  end
end
