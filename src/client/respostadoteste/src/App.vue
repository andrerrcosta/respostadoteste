<template>
  <div class="main-container">
    <div class="header screen-header">
      <router-link class="header-item" to="/lista">Lista</router-link>
      <router-link class="header-item" to="/">Cadastro</router-link>
    </div>
    <router-view />
    <div class="main-footer">André Costa - 2020</div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");

body {
  margin: 0;
  padding: 0;
}

.main-container {
  background: #f5f5f5;
  width: 100%;
  min-height: 100vh;
  font-family: "Nunito", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #17222d;
  height: 55px;
  color: #f5f5f5;
}

@media screen and (max-width: 500px) {
  .screen-header {
    padding: 0 10px;
  }
}

@media screen and (max-width: 10000px) {
  .screen-header {
    padding: 0 50px;
  }
}

.header-item {
  margin: 13px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.4s ease;
  text-decoration: none;
}

.header-item:hover {
  opacity: 1;
}

.main-footer {
  padding: 0 50px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #0e72c7;
  color: #fff;
}
</style>
