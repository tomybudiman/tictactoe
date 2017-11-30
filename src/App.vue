<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Architects+Daughter|Roboto');

html,body {
  margin: 0;
  width: 100%;
  height: 100%;
  background: #34495e;
  background: radial-gradient(#7f8c8d,#34495e);
  background: -o-radial-gradient(#7f8c8d,#34495e);
  background: -moz-radial-gradient(#7f8c8d,#34495e);
  background: -webkit-radial-gradient(#7f8c8d,#34495e);
}

#app {
  width: 100%;
  height: 100%;
}
</style>
