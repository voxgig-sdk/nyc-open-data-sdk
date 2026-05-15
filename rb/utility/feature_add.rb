# NycOpenData SDK utility: feature_add
module NycOpenDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
