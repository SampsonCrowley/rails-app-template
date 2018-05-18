class AdminUser < ApplicationRecord


  # == Constants ============================================================

  # == Attributes ===========================================================
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  # == Extensions ===========================================================
  devise :database_authenticatable,
    :recoverable, :rememberable, :trackable, :validatable

  # == Relationships ========================================================

  # == Validations ==========================================================

  # == Scopes ===============================================================

  # == Callbacks ============================================================

  # == Class Methods ========================================================

  # == Instance Methods =====================================================

end
