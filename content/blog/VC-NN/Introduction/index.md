---
title: "Part 1 - VC Dimension"
weight: 1
subtitle: ""
excerpt: "The VC dimension of a Hypothesis Space <span>&#8459;</span> on <span>&#8477;<sup>d</sup></span> is cardinality of the largest set <b>S</b> such that S is shattered by <span>&#8459;</span>."
date: 2022-09-18
draft: false
commentable: true
show-related: true
---


## Definition
<p>
Let $S=\{x_1,x_2,\cdots,x_m\}$ be the set of m random points from $\mathbb{R}^d$ and $\mathscr{H}$ be a class of $\\{-1,+1\\}$ valued functions on $\mathbb{R}^d$ i.e $$\forall \\, h \in H, h:S \to \{0,1\}^m$$ One such example is $h_1(x_i)=1 \,\forall \, x_i \in S$. In the context of Machine Learning, $\mathscr{H}$ is the learning algorithm generally used for any classification task such as Logistic Regression etc. For each parameter $\theta$ in Logistic Regression we get $h(\theta;x) \in \mathscr{H}$.
</p>
<p>
$\textbf{Shattering}:$ $S$ is shattered by $\mathscr{H}$ when all labeling of $S$ (with 0 and 1) can be computed by $\mathscr{H}$ i.e for all labeling of $S$ denoted by $Y=\{0,1\}^m$, $\exists \\, h\in \mathscr{H}$ such that the $|h(x_i)-y_i|=0$, where $y_i$ is the label of the ith point. Consider in Figure 1, $\mathscr{H}=\{wx+b;w,b\in \mathbb{R}\}$.
<figure>
					<center><img src="/blog/VC-NN/sidebar-featured.png" width="600"> </center>
					<figcaption style= "text-align:center">Figure 1:  Shattering of 3 points in xy plane by lines.
					</figcaption>
				</figure>

</p>
<p>	
$\textbf{Dichotomy}:$ A dichotomy of $S$ induced by $h \in \mathscr{H}$ is a partition of S into two disjoint sets $S_1$ and $S_2$ such that $$h(x_i)=\begin{cases}
       1 \, \text{if} \, x_i \in S_1 \\
      -1 \, \text{if} \, x_i \in S_2\\
     \end{cases}$$
</p>
