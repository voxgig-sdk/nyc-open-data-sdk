# NycOpenData SDK exists test

require "minitest/autorun"
require_relative "../NycOpenData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = NycOpenDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
