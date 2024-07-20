<template>
  <div id="app">
    <!-- <div class="system-bar">
      <img alt="Bank logo" src="~@/assets/logoImage.png" width="150" style="height: 60px;" />
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
};
</script>

<style>
body {
  margin: 0px;
}
.system-bar {
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
  padding: 8px;
}
</style>
