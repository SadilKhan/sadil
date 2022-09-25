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
$\textbf{Dichotomy}:$ A dichotomy of $S=\{x_1,x_2,\cdots,x_m\}$ induced by $h \in \mathscr{H}$ is a partition of S into two disjoint sets $S_1$ and $S_2$ such that $$h(x_i)=\begin{cases}
       1 \, \text{if} \, x_i \in S_1 \\
      -1 \, \text{if} \, x_i \in S_2\\
     \end{cases}$$
</p>
<br>
Let $\mathscr{H}(S)$ be the set of all labelings or dichotomies that can be realized by $\mathscr{H}$. $$\mathscr{H}(S)=\{ \{ h(x_1),h(x_2),\cdots h(x_m) \}; h \in \mathscr{H} \}$$ If $|\mathscr{H}(S)|=2^{|S|}$, then $S$ is shattered by $\mathscr{H}$.</br>
<br>
Since $S$ is chosen randomly, we define $\textbf{Growth Function}$ <a href="#lecture1">[1]</a> $$\mathscr{H}[m]=max\{|\mathscr{H}(S)|; |S|=m ; S \subset R^m \}$$
</br>

## 2. Theorem 1 - Radon's Theorem
<p>
$\textbf{Theorem 1 (Radon's Theorem):}$ <i>For every set $S \subset {R}^{d}$ with $|S|=d+2$, $S$ can be divided into two disjoint sets whose convex hulls intersect.</i>
</p>
<p>
$\textbf{Proof:}$ Let $S=\{x_1,x_2,\cdots,x_{d+2}\} \subset R^{d}$. Then $S$ is a linearly dependent set. Let $S_{aug}=\{[x_1;1],[x_2,;1]\cdots,[x_{d+2};1]\} \subset R^{d+1}$ be the augmented set and it's also a dependent set. Then the equation $$\sum_{i=1}^{d+2}a_i[x_i;1]=0$$ has non-zero solution (not all $a_i=0$) and $\sum_{i=1}^{d+2}a_i=0$.
Let I be the convex hull of $\{x_i:a_i>0\}$ and J be the convex hull of $\{x_i:a_i\leq 0\}$.
$\{x_i:a_i>0\} \cap \{x_i:a_i\leq 0\} =\phi$. 
<br>
Let $A=\sum_{i:x_i\in I}a_i=-\sum_{j:x_j\in J}a_j$.
</br>
<br>Then $\frac{1}{A}\sum_{i=1}^{d+2}a_ix_i=0 \implies \sum_{i:x_i\in I}\frac{a_j}{A}x_j=-\sum_{j:x_j\in J}\frac{a_j}{A}x_j$</br>
<br> So $p=\sum_{i:x_i\in I}\frac{a_j}{A}x_j=-\sum_{j:x_j\in J}\frac{a_j}{A}x_j$ </br>
<br> So $p \in I \text{ and } p \in J$.</br>
<br> So, S can be divided into two disjoint sets whose convex hulls intersect. </br>
</p>

## 3. Theorem 2 - $VC(\mathscr{H}) \leq log_2(|\mathscr{H}|)$
<p>
$\textbf{Theorem 2:}$ <i>Let $\mathscr{H}$ be a set of binary-valued functions and $\mathscr{H}$ is finite. Then $VC(\mathscr{H}) \leq log_2(|\mathscr{H}|)$.
</i>
</p>
<p>
<br>
$\textbf{Proof:}$ Let $VC(\mathscr{H})=d$, then there exists a set of $d$ points such that for every $2^d$ possible labelings, $\exists \, h \in \mathscr{H}$ which can classify the points. Then the cardinality of $\mathscr{H}$ must be greater than $2^d$.</br>
<br>
So $|\mathscr{H}|\geq 2^d \implies d \leq log_2(\mathscr{H}) \implies VC(\mathscr{H}) \leq log_2(\mathscr{H})$.;
</br>
</p>

## 4. Theorem 3 - Sauer's Lemma
<p>
$\textbf{Theorem 2:}$ <i> Let $VC(\mathscr{H})=d$ and $S$ be a set of $m$ points. Then $$\mathscr{H}[m] \leq \Phi_{d}(m)=\sum\limits_{i=0}^{d} {m\choose i}$$ </i>
</p>
<p>
<br> $\textbf{Proof:}$ We will prove it by induction.</br>
<br> <strong> Base Case: </strong>For the base case, we have to prove for (1) $d=0$ and arbitrary $m$ and (2) $m=0$ and arbitrary $d$. When $VC(\mathscr{H})=d=0$, it means that no set of points can be shattered, so points can only be labeled one way. So, $\mathscr{H}[m] = 1 \leq \Phi_{d}(m)$. When $m=0$ and $d$ is arbitrary, we can label $0$ points at most $1$ way.   
</br>
<br>
<strong> Inductive Step: </strong> Let us assume that $\forall m_1,d_1$
</br>
</p>


## Bibliography

<ol>
<li>
    <p id="lecture1"><a href="http://www.cs.cmu.edu/%7Eninamf/ML11/lect0922.pdf"><i>8803 Machine Learning Theory</i></a></p>
 </li>
 
 </ol>
