class Developer < ApplicationRecord
  # == Constants ============================================================

  # == Attributes ===========================================================
  #          id:  :integer,
  #       first:  :text, required
  #      middle:  :text,
  #        last:  :text, required
  #      suffix:  :text,
  #         dob:  :date, required
  #       email:  :text, required
  #  created_at:  :datetime,
  #  updated_at:  :datetime

  # == Extensions ===========================================================

  # == Relationships ========================================================
  has_many :tasks, inverse_of: :developer

  # == Validations ==========================================================
  validates :first, :last, presence: true, length: { minimum: 2 }

  validates_presence_of :dob

  validates :email, presence: true,
                    format: { with: /\A[^@;\/\\]+\@[^@;\/\\]+\.[^@;\.\/\\]+\z/ },
                    uniqueness: { case_sensitive: false }

  # == Scopes ===============================================================

  # == Callbacks ============================================================

  # == Class Methods ========================================================

  # == Instance Methods =====================================================

end
