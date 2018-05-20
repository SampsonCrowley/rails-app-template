class AdminUser < ApplicationRecord


  # == Constants ============================================================

  # == Attributes ===========================================================
  #                     :id => :integer,
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

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable


  # == Extensions ===========================================================
  devise :database_authenticatable,
    :recoverable, :rememberable, :trackable, :validatable

  # == Relationships ========================================================

  # == Validations ==========================================================
  validates :email, presence: true,
                    format: { with: /\A[^@;\/\\]+\@[^@;\/\\]+\.[^@;\.\/\\]+\z/ },
                    uniqueness: { case_sensitive: false }

  # == Scopes ===============================================================

  # == Callbacks ============================================================

  # == Class Methods ========================================================

  # == Instance Methods =====================================================

end
