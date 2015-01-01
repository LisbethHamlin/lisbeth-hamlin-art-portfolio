---
layout: archive
permalink: /
title: "Latest Additions"
---

<div class="tiles">
{% for post in site.posts %}
  {% if post.folder == nil %}
    {% include post-grid.html %}
    {% if {{forloop.index}} == {{site.front-page-posts}} %}
      {% break %}
    {% endif %}
  {% endif %}
{% endfor %}
</div><!-- /.tiles -->