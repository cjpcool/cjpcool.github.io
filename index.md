---
layout: homepage
---

## About Me

I am currently a Ph.D. student in the Department of Computer Science at [Virginia Tech](https://cs.vt.edu/) since Aug. 2023, where I am advised by [Prof. Dawei Zhou](https://sites.google.com/view/dawei-zhou/home?authuser=0) in [VLOG Lab](https://sites.google.com/view/dawei-zhou/vlog-lab).
During my M.S. degree at University of Electronic Science and Technology of China (UESTC), I was fortunately advised by [Prof. Yazhou Ren](https://yazhou-ren.github.io/) and [Prof. Lifang He](https://engineering.lehigh.edu/faculty/lifang-he) on the topic of multi-view/graph self-supervised learning.

Generally, my research lies in **data mining** and **machine learning**, with a particular focus on self-/un-supervised **multi-modal/view/graph learning**. and **Agentic LLMs**. I also seek to apply my research to scientific domains, such as 3D graph modeling of **metamaterials** and **molecules**, contributing to the broader community of **AI for science**. *To date, my work has led to multiple publications in top-tier venues, including KDD, AAAI, TNNLS, ICML, NAACL, etc., spanning machine learning, language models, and scientific discovery.*
Some major results are as follows (with overlap across domains):
* **Agentic LLMs** (Preprints'25: LinguaMate, ChemBOMAS) paves the way for collaboration between knowledge-driven agents and data-driven agents by exploring symbolic-driven latent optimization and finetuned LLM with Bayesian optimization.
* **Multi-view/modal learning** (ICML'25, AAAI'23, AAAI'24, ICONIP'22) studies unsupervised multi-view/modal alignment and collaboration mechanisms for clustering and generative tasks.
* **Graph learning/generation** (INS'24, TNNLS'25) develops methods for graph semantic extraction and specification-aware variational inference for graph generation.
* **Applications on Molecular and Material Science** (KDD'25, ICML'25, IJCAI'24) investigates how the advanced LLMs and generative models can be integrated with domain-specific knowledge for molecule and material modeling.
  
## News
<style>
.news-list li {
    margin-bottom: 2px;   /* 控制每条之间的间距 */
    /* line-height: 1.1;     /* 控制行高 */ */
}
</style>
<ul class="news-list">
{% for item in site.data.news limit:10 %}
  <li><strong>[{{ item.date }}]</strong> {{ item.text }}</li>
{% endfor %}
</ul>


<!-- ## Internship Experience 
 - **[Sep. 2023 - Dec. 2024]** Reserach Intern \| [Shanghai AI Lab](https://www.shlab.org.cn/) \| AI for Science 
-->

{% include_relative _includes/publications.md %}


## Talks
- Accepted Talk (Integrating Heterogeneous Data, Computational Tools, and Visual Interface for Metamaterial Discovery) at **Towards Agentic AI for Science, AAAI Spring Symposia 2025**

{% include_relative _includes/services.md %}

---
<div style="width:300px; max-width:100%;">
<script type="text/javascript" id="clustrmaps" 
        src="//clustrmaps.com/map_v2.js?d=STUe-Dr80qV_XZa9IGl3qynH3BoXdUUmmQVd9mkim3M&cl=ffffff&w=a">
</script>
</div>
