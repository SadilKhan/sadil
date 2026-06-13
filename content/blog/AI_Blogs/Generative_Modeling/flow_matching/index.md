---
title: "Flow Matching"
subtitle: "The journey after diffusion — straight paths, conditional flows, and the optimal transport that makes SD3, FLUX, and Sora possible."
date: 2026-06-13
series_section: "Generative Modeling"
excerpt: |
  Nine sections on flow matching and why it superseded diffusion for most frontier generative models. Frames probability as a fluid moving under a vector field, derives the marginal flow matching objective and why it is intractable, then introduces the conditional flow matching trick that makes training practical. Chooses the simplest possible path between noise and data: a straight line. Explains why straight paths cross, why crossings cause curvature in the marginal flow, and how rectification wars against them. Shows that diffusion is a special case of flow matching, then closes with optimal transport coupling and the model zoo it enabled.
link: "/blog/ai_blogs/flow_matching.html"
read_time: 25
build:
  list: always
  render: never
  publishResources: true
featured_image: "featured.svg"
categories:
  - Generative Models
  - Deep Learning
---
