# NycOpenData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NycOpenDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      NycOpenDataBaseFeature.new
    when "test"
      NycOpenDataTestFeature.new
    else
      NycOpenDataBaseFeature.new
    end
  end
end
