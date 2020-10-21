---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
        <h1>WMXPY's</h1>
        <h2>Automated Bug Factory</h2>
        <div class="info-space"/>
        <div class="redirect-combo">
            <a class="redirect-link" href="https://github.com/wmxpy">
                <i class="fa fa-github fa-fw" aria-hidden="true"></i> Github
            </a>
        </div>
        <div class="redirect-combo">
            <a class="redirect-link" href="https://www.linkedin.com/in/meng-wang-690327150/">
                <i class="fa fa-linkedin fa-fw" aria-hidden="true"></i> LinkedIn
            </a>
        </div>
      </div>
    </div>
    <div class="index-content">
      <ul class="article-list">
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
