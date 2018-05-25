class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.queue_adapter_inline?
    @@queue_adapter ||= Rails.application.config.active_job.queue_adapter
    @@queue_adapter == :inline
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
