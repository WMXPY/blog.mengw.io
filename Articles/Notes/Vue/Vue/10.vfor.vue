<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <div v-for="book in books">
        {{$index}}{{book.name}} {{book.price}}
    </div>
</div>
<script src="vue.js"></script>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            books:[
                {name:'javascript',price:50},
                {name:'node',price:50},
                {name:'ajax',price:50},
                {name:'vue',price:50},
            ]
        }
    })
</script>
</body>
</html>