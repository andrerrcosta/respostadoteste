<template>
  <div class="container">
    <div class="label">
      {{ title }}
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "CustomLabel",
  props: {
    title: String,
  },
};
</script>

<style scoped>


.container {
  background: transparent;
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-direction: column;
  margin: 5px;
}

.label {
  font-size: 23px;
  color: #0e72c7;
}

.line {
  border-bottom: 3px solid #e5e5e5;
  /* width: 100%; */
  margin: 10px 0;
}
</style>
