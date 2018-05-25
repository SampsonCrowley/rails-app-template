class ApplicationJob < ActiveJob::Base

  %w(path url).each do |cat|
    self.__send__ :define_method, :"rails_blob_#{cat}" do |*args|
      Rails.application.routes.url_helpers.__send__ :"rails_blob_#{cat}", *args
    end
  end

end
