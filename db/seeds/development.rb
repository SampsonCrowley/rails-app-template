# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
dev = Developer.create!(email: 'sampsonsprojects@gmail.com', password: 'asdfasdf', first: 'Sampson', middle: 'Robert', last: 'Crowley', dob: 20.years.ago)

5.times do |i|
  dev.tasks << Task.new(
    title: "Some Task #{i}",
    description: "do some BS task",
    due_date: 10.days.from_now
  )
end

client = Client.create!(first_name: 'asdf',last_name: 'asdf',email: 'asdf@asdf.asdf',phone: '1000000000',phone_type: 'home')

5.times do |i|
  start = (30 * rand).to_i.days.from_now.midnight + 6.hours
  client.appointments << Appointment.new(
    title: "appointment #{i}",
    description: 'checking on things',
    starting: start,
    ending: start + (rand * 5).hours
  )
end
