---
layout: homepage
---

## About Me

I am a Ph.D. student in Computer Science at [Virginia Tech](https://cs.vt.edu/), advised by [Prof. Dawei Zhou](https://sites.google.com/view/dawei-zhou/home?authuser=0) in the [VLOG Lab](https://sites.google.com/view/dawei-zhou/vlog-lab). My research develops efficient, data-aware foundation models and agentic AI systems, with a particular interest in long-context modeling, adaptive data selection, multimodal reasoning, and scientific discovery.

I build learning systems that connect graph and multimodal representation learning, generative modeling, and physics-grounded agents for materials and molecular science. My work has appeared at COLM, KDD, ACL, ICML, NAACL, AAAI, and TNNLS. In Summer 2026, I am a PhD SWE+ Intern at [Google](https://www.google.com/), working on training and inference efficiency for large-scale recommendation models.

<div class="pillar-grid">
  <div class="pillar-card">
    <span>01</span>
    <strong>Efficient Foundation Models</strong>
    <p>Long-context modeling, adaptive token/state selection, data-efficient training, and quality-efficiency tradeoffs.</p>
  </div>
  <div class="pillar-card">
    <span>02</span>
    <strong>Agentic AI for Science</strong>
    <p>LLM agents, symbolic latent optimization, physics-grounded verification, and scientific reasoning workflows.</p>
  </div>
  <div class="pillar-card">
    <span>03</span>
    <strong>Multimodal Graph Learning</strong>
    <p>Representation learning and generative modeling for multi-view graphs, metamaterials, and molecular structures.</p>
  </div>
</div>

## News

<div class="news-list" tabindex="0" aria-label="All news">
{% for item in site.data.news %}
  <div class="news-item">
    <time>{{ item.display_date }}</time>
    <p>{{ item.text | markdownify | remove: '<p>' | remove: '</p>' }}</p>
  </div>
{% endfor %}
</div>

<!--
## Experience
 - **[May. 2026 - Aug. 2026]** PhD Intern \| [Google](https://www.google.com/) \| YouTube
 - **[Sep. 2023 - Dec. 2024]** Research Intern \| [Shanghai AI Lab](https://www.shlab.org.cn/) \| Physical Science
-->

## Experience

<div class="experience-list">
  <div class="experience-item">
    <div>
      <strong><a href="https://www.google.com/">Google</a></strong>
      <p>PhD SWE+ Intern, YouTube Shorts Ranking</p>
    </div>
    <time>May 2026 - Aug. 2026</time>
    <p>Optimizing training and inference efficiency for large-scale recommendation models.</p>
  </div>
  <div class="experience-item">
    <div>
      <strong><a href="https://www.shlab.org.cn/">Shanghai AI Laboratory</a></strong>
      <p>Research Intern, Physical Science</p>
    </div>
    <time>Sep. 2023 - Dec. 2024</time>
    <p>Developed AI for Science methods for scientific machine learning and physical science applications.</p>
  </div>
</div>

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
