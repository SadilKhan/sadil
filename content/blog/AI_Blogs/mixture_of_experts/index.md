---
title: "Mixture of Experts"
subtitle: "Sparse routing, and the tricks that keep it from collapsing."
date: 2026-04-24
weight: 6
excerpt: |
  Most modern frontier models route each token through a small subset of experts instead of one dense MLP. This piece is about why that scales better, and about the surprisingly fiddly routing layer (top k selection, load balancing, auxiliary losses) that keeps the experts from drifting into copies of each other.
link: "/blog/ai_blogs/mixture_of_experts.html"
read_time: 18
build:
  list: always
  render: never
  publishResources: true
featured_image: "featured.svg"
categories:
  - LLM
  - Architecture
  - MoE
---
