---
title: "Positional Encoding"
subtitle: "Sinusoidal PE to RoPE to YaRN — why transformers are blind to order, and the nine-year arc of fixes that now power 128k-context models."
date: 2026-06-11
excerpt: |
  Nine sections covering the full arc of positional encoding. Starts with why attention is a set operation and order simply doesn't exist without injection. Walks through sinusoidal, learned absolute, and relative approaches, then builds RoPE from scratch: pair splitting, rotation matrices, and why absolute position cancels in the dot product. Closes with the long-context toolkit — Position Interpolation, NTK-aware scaling, and YaRN's per-frequency surgery that ships in Qwen2 and DeepSeek.
link: "/blog/ai_blogs/positional_encoding.html"
read_time: 25
build:
  list: always
  render: never
  publishResources: true
featured_image: "featured.svg"
categories:
  - Deep Learning
  - Transformers
---
