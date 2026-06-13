---
title: "LLM Parallelism"
subtitle: "How a 70B model actually gets split across a GPU cluster."
date: 2026-05-01
series_section: "LLM"
excerpt: |
  A walk through data parallel, tensor parallel, pipeline parallel, ZeRO, FSDP, and expert parallel, and how those axes compose into the 3D and 4D meshes used on real clusters. Diagrams for what gets sharded where, what has to cross the network between nodes, and what each axis actually costs in throughput.
link: "/blog/ai_blogs/llm_parallelism.html"
read_time: 15
build:
  list: always
  render: never
  publishResources: true
featured_image: "featured.svg"
categories:
  - LLM
  - Distributed Training
  - Systems
---
