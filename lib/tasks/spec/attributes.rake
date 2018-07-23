namespace :spec do
  desc 'add attribute comments to model spec'
  task attributes: :environment do |t, args|
    raise 'No Model Given' unless ARGV[1].present?
    model_name = ARGV[1]
    file_path = Rails.root.join('spec', 'models', "#{model_name.underscore}_spec.rb")
    if File.exists?(file_path)
      file = File.read(file_path)

      model = model_name.constantize

      attr_line_regex = /([ ]+describe \'Attributes\' do\n)/

      s_idx = (file =~ attr_line_regex)

      if s_idx
        e_idx = file.index(/describe/, s_idx) - 1

        prefix = "#{file[s_idx..e_idx]}  "

        existance_regex = /[ ]+# run \`rails spec:attributes .*?\` to replace this line\n/

        if file =~ existance_regex
          file.sub!(existance_regex, model.column_comments(prefix))
        else
          attributes = model.column_comments.split("\n")
          attributes.each do |attribute|
            file.sub!(/[ ]*?#{Regexp.escape(attribute)}[ ]*?\n/, '')
          end
          file.sub!(attr_line_regex, "\\0#{model.column_comments(prefix)}")
        end

        File.open(file_path, 'w') {|f| f.puts file}
      else
        puts 'Attributes section not found'
      end
    else
      puts "#{file_path} not found"
    end
    task ARGV[1].to_sym do ; end
  end
end
