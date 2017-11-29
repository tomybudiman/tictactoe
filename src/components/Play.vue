<template>
  <button type="button" @click="createRoom">Hai</button>
</template>
<script type="text/javascript">
import * as firebase from "firebase";
firebase.initializeApp({
  apiKey: "AIzaSyDzFWZDmj4qjUEBpo8hXbFBow5zWQy1tWU",
  authDomain: "group-project-week-3.firebaseapp.com",
  databaseURL: "https://group-project-week-3.firebaseio.com",
  projectId: "group-project-week-3"
});
export default{
  data(){
    return{
      database:firebase.database()
    }
  },
  methods:{
    createRoom(){
      console.log("Masuk");
    }
  }
}
</script>
<style lang="scss">
</style>
