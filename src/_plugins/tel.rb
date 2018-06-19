module Jekyll
  module TelFilter
    def tel(tel)
      "#{tel}".insert(6, '-').insert(3, '-')
    end
  end
end

Liquid::Template.register_filter(Jekyll::TelFilter)
