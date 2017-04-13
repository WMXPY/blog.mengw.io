---
layout: post
title:  "Pass Functions"
categories: Linux
description: 我觉得传递方法，或者说传递lambda方法看起来是最爽的，但是一直以来都没有注意过
---

# 厉害了

以后没准再补吧。。先放一段java代码

```java
StringRequest request = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {

            @Override
            public void onResponse(String response) {
                delegate.successBlock(response);
            }

        }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                delegate.errorBlock(error.getLocalizedMessage());
            }

        }){
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                return map;
            }
        };;
```

我们向StringRequest的构造函数给了一个 new Response啥玩意，这个就是java传递方法的写法，这个的源头是

```java
public interface ShiDianHttpDelegate {

    public void successBlock(String dataString);
    public void errorBlock(String dataString);
}
```

也就是说java实现这玩意是通过interface弄的吧。  
gaygay
