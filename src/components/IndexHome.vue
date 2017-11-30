<template>
  <div class="input-name">
    <img src="../assets/tic-tac-toe.png" alt="Icon">
    <span>Tic Tac Toe</span>
    <router-link :to="getURL" class="btn btn-primary">Start Game</router-link>
  </div>
</template>
<script>
export default {
  data(){
    return{
      getURL:""
    }
  },
  created(){
    this.createRoomURL();
  },
  methods:{
    createRoomURL(){
      const newkey=this.$database.ref().push().key;
      this.getURL=`/${newkey}`;
    }
  }
}
</script>
<style lang="scss">
.input-name {
  top: 50%;
  margin: auto;
  width: 300px;
  padding: 25px;
  position: relative;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: white;
  transform: translateY(-50%);
  box-shadow: 0 0 10px 0 rgba(0,0,0,.3);
  img {
    width: 30%;
    margin: auto;
    display: block;
  }
  span {
    color: #555;
    display: block;
    font-size: 35px;
    margin-top: 15px;
    text-align: center;
    font-family: "Architects Daughter",fantasy;
  }
  .btn {
    margin: auto;
    display: block;
    margin-top: 20px;
    font-family: "Roboto",sans-serif;
  }
}
</style>
