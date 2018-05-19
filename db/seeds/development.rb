# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'sampsonsprojects@gmail.com', password: 'asdfasdf', password_confirmation: 'asdfasdf')
dev = Developer.create!(email: 'sampsonsprojects@gmail.com', first: 'Sampson', middle: 'Robert', last: 'Crowley', dob: Date.today)

5.times do |i|
  dev.tasks << Task.new(
    title: "Some Task #{i}",
    description: "do some BS task",
    due_date: 10.days.from_now
  )
end
