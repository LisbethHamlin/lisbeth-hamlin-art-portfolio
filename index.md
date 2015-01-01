---
layout: archive
permalink: /
title: "Latest Additions"
excerpt: "My art is dedicated to fostering an appreciation of cultural diversity."
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