---
layout: archive
title: "Portfolio"
date: 
modified:
excerpt: ""
share: false
image:
  feature:
  teaser: 
  thumb:
ads: false
---

{% for groupIter in site.data.portfolio %}
  {% assign groupKey = groupIter[0] %}
  {% include post-grid.html groupKey=groupKey %}
{% endfor %}
