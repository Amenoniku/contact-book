<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  .container {
    margin: 25px auto;
    padding: 10px;
    width: 500px;
    height: 90%;
    border: 2px cadetblue solid;
    border-radius: 10px;
  }
}
</style>
