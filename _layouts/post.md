---
layout: default
---

<body class="body-post">
  <div class="post-wrapper">
    <h1 class="post-title"><a href="{{ page.url }}" title="{{ page.title }}">{{ page.title }}</a></h1>
    <p class="post-date">{{ page.date|date:"%Y-%m-%d" }}</p>
    {{ content }}
  </div>
<div class="div_right_bottom"><a href="../">Go Back</a></div>
  {% include about.html %}

  <script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
  <script src="/js/post.js" type="text/javascript"></script>

</body>
