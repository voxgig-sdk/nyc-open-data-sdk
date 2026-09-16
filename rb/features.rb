# NycOpenData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NycOpenDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      NycOpenDataBaseFeature.new
    when "ratelimit"
      NycOpenDataRatelimitFeature.new
    when "retry"
      NycOpenDataRetryFeature.new
    when "test"
      NycOpenDataTestFeature.new
    when "timeout"
      NycOpenDataTimeoutFeature.new
    else
      NycOpenDataBaseFeature.new
    end
  end
end
