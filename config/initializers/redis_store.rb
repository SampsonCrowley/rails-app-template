begin
  tmp_rds = Redis::Namespace.new("#{Rails.application.class.parent_name}::active_page", redis: Redis.new(url: ENV.fetch('REDIS_URL') { 'redis://localhost:6379/1' }))

  tmp_rds.get('test')
rescue
  if (!Rails.env.production? && !Boolean.parse(ENV.fetch('FORCE_REDIS') { false })) || Boolean.parse(ENV.fetch('ALLOW_FAKE_REDIS') { false })
    require Rails.root.join('lib', 'fake_redis')
    puts "WARNING!!! Redis Server not found"
    tmp_rds = FakeRedis.new
  else
    raise
  end
end

Rails.application.class.parent.const_set('REDIS', tmp_rds)

module Rails
  def self.redis
    Rails.application.class.parent.const_get('REDIS')
  end
end
