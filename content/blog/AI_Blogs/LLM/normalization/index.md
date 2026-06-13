---
title: "Normalization Methods"
subtitle: "What BatchNorm, LayerNorm, RMSNorm, GroupNorm, and InstanceNorm are actually doing to the tensor."
date: 2026-06-10
series_section: "LLM"
excerpt: |
  Five normalization methods. One tensor shape. The difference is just which dimensions you average over and that choice has large consequences for stability, batch size sensitivity, and whether you can even run the model at inference. This post visualizes each method on the same [B, S, D] tensor so the differences are immediate.
link: "/blog/ai_blogs/normalization.html"
read_time: 12
build:
  list: always
  render: never
  publishResources: true
featured_image: "featured.svg"
categories:
  - Deep Learning
  - Training
---
