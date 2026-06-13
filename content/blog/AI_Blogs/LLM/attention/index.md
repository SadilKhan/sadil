---
title: "Attention & FlashAttention"
subtitle: "Self-attention to FlashAttention-3 — the mechanism, its variants, and why standard attention is slow on real GPUs."
date: 2026-06-06
series_section: "LLM"
excerpt: |
  Eleven sections from self-attention through FlashAttention-3. The first half covers the mechanism: QKV projections, cross-attention, multi-head, attention patterns, and linear attention. The second half goes deep on the GPU: why the N×N score matrix is the bottleneck, how online softmax makes tiling possible, and how FA-1, FA-2, and FA-3 progressively eliminate the memory wall.
link: "/blog/ai_blogs/attention.html"
read_time: 28
build:
  list: always
  render: never
  publishResources: true
featured_image: "featured.svg"
categories:
  - Deep Learning
  - Transformers
---
