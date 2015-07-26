---
layout: archive
title: "Portfolio"
group: portfolio
---

{% for groupIter in site.data.portfolio %}
  {% assign groupKey = groupIter[0] %}
  {% include post-grid.html groupKey=groupKey %}
{% endfor %}
