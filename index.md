---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
        <h1>WMXPY's</h1>
        <h2>Automated Bug Factory</h2>
        <!-- <h2>我一直以来的Bug编写历程</h2> -->
      </div>
    </div>
    <div class="index-content">
      <ul class="artical-list">
        <li>
          <strong><a href="http://mengw.io/blog/Resume" class="title">Resume</a></strong>
          <div class="title-desc">我的简历|My Resume</div>
        </li>
        {% for post in site.posts %}
        <li>
          <a href="{{ post.url }}" class="title">{{ post.title }}</a>
          <div class="title-desc">{{ post.description }}</div>
        </li>
        {% endfor %}
      </ul>
    </div>
  </div>
</body>
