ActiveRecord::Base.transaction do
  seed_file = "#{Rails.root}/db/seeds/#{Rails.env}.rb"
  if File.exists?(seed_file)
    puts "- - Seeding data from file: #{Rails.env}"
    require seed_file
  end
end
