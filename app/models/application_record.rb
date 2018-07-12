class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.queue_adapter_inline?
    @@queue_adapter ||= Rails.application.config.active_job.queue_adapter
    @@queue_adapter == :inline
  end

  def self.transaction(*args)
    super(*args) do
      if Current.user
        ip = Current.ip_address ? "'#{Current.ip_address}'" : 'NULL'

        ActiveRecord::Base.connection.execute <<-SQL
          CREATE TEMP TABLE IF NOT EXISTS
            "_app_user" (user_id integer, user_type text, ip_address inet);

          UPDATE
            _app_user
          SET
            user_id=#{Current.user.id},
            user_type='#{Current.user.class.to_s}',
            ip_address=#{ip};

          INSERT INTO
            _app_user (user_id, user_type, ip_address)
          SELECT
            #{Current.user.id},
            '#{Current.user.class.to_s}',
            #{ip}
          WHERE NOT EXISTS (SELECT * FROM _app_user);
        SQL
      end

      yield
    end
  end

  def queue_adapter_inline?
    self.class.queue_adapter_inline?
  end

  %w(path url).each do |cat|
    self.__send__ :define_method, :"rails_blob_#{cat}" do |*args|
      Rails.application.routes.url_helpers.__send__ :"rails_blob_#{cat}", *args
    end
  end

  def purge(attached)
    attached.__send__ queue_adapter_inline? ? :purge : :purge_later
  end

end
