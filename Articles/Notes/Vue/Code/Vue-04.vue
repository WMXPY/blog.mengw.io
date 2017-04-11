<!DOCTYPE>
<input v-model.trim="content">
<!--example-->
<html>

<head>
    <title>04 VUE</title>
</head>

<body>
    <form>
        <h1>Reg</h1>
        <div>
            <label for="username">User</label>
            <input type="text" id="username" v-model.lazy="username" v-on:change="checkusername">
            <span v-if="usernameisfine"> Fine</span>
        </div>
        <div>
            <label for="age">AGE</label>
            <input type="number" id="age" v-model.number="age">
        </div>
        <div>
            <label for="content">Conteng</label>
            <textarea rows="8" cols="55" id="content" v-model.trim="content"></textarea>
        </div>
    </form>
    <div>
        <p>{{username}}</p>
        <p>{{age}}</p>
        <p>{{contentt}}</p>
    </div>
</body>
<script>
    //Some vue script
</script>

</html>