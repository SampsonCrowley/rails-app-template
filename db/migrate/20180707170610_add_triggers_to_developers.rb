class AddTriggersToDevelopers < ActiveRecord::Migration[5.2]
  def change
    audit_table :developers, true, false, %w(password)
    login_triggers :developers
  end
end
