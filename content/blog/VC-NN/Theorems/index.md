---
title: "Part 2 - VC Dimension Theorems and Lemmas"
weight: 1
subtitle: ""
excerpt: "The VC dimension of a Hypothesis Space <span>&#8459;</span> on <span>&#8477;<sup>d</sup></span> is cardinality of the largest set <b>S</b> such that S is shattered by <span>&#8459;</span>."
date: 2022-09-18
draft: false
commentable: true
show-related: true
---

This is the second part of the <a href="/blog/vc-nn/">VC Dimension and Neural Networks</a> series. This part lists important theorems with proofs and explanations. To know the basics of VC dimension, check <a href="/blog/vc-nn/introduction">Part 1 - VC Dimension</a>.

## 1. Definitions
<p>	
$\textbf{Dichotomy}:$ A dichotomy of $S$ induced by $h \in \mathscr{H}$ is a partition of S into two disjoint sets $S_1$ and $S_2$ such that $$h(x_i)=\begin{cases}
       1 \, \text{if} \, x_i \in S_1 \\
      -1 \, \text{if} \, x_i \in S_2\\
     \end{cases}$$
</p>

