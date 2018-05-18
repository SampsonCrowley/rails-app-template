module Paperclip
  class UnzipToFiles < Processor
    def make
      tmp_path = Rails.root.join('tmp', 'fr_kits')
      Dir.mkdir(tmp_path) unless File.exists?(tmp_path)

      tmp_path = Rails.root.join('tmp', 'fr_kits', @attachment.instance.athlete_id.to_s)
      Dir.mkdir(tmp_path) unless File.exists?(tmp_path)

      zip_path = "#{tmp_path}/#{@attachment.instance.zip_file_name}"
      FileUtils.rm zip_path, force: true

      FileUtils.cp @file.path, zip_path
      `unzip -o #{zip_path} -d #{tmp_path}`

      @file_list = {}
      collect_entries(Dir.entries(tmp_path), tmp_path)

      @file_list.each do |description, files|
        file_group = @attachment.instance.files.find_by(description: description) || @attachment.instance.files.build(description: description)
        files.each do |f|
          file = File.open(f[:path])
          if f[:mime] =~ /image\/jpe?g/
            file_group.image = file
          else
            file_group.pdf = file
          end
        end
        file_group.save
      end

      FileUtils.rm_r tmp_path

      File.open(@file.path)
    end

    def collect_entries(entries, base_path)
      entries.each do |entry|
        unless entry =~ /^\.*$/
          mime_type = `file --b --mime-type '#{"#{base_path}/#{entry}"}'`.strip
          if mime_type =~ /directory/
            collect_entries(Dir.entries("#{base_path}/#{entry}"), "#{base_path}/#{entry}")
          elsif mime_type =~ /(image\/jpe?g|application\/pdf)/
            @file_list[File.basename(entry, '.*')] ||= []
            @file_list[File.basename(entry, '.*')] << {
              path: "#{base_path}/#{entry}",
              mime: mime_type
            }
          end
        end
      end
    end
  end
end
