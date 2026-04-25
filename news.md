---
layout: page
title: News
permalink: /news/
---

## News

{% assign news_items = site.data.news | sort: "date" | reverse %}
{% for item in news_items %}
- **[{{ item.display_date }}]** {{ item.text | markdownify | remove: '<p>' | remove: '</p>' }}
{% endfor %}
