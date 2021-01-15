<template>
  <div class="container">
    <div
      class="radio"
      :style="additionalStyles"
      v-for="radio in radios"
      :key="radio.value"
      @click="selectRadio(radio.value)"
    >
      <div
        :class="{
          'radio-selected': radio.value === currentValue,
          'radio-unselected': radio.value !== currentValue,
        }"
      ></div>
      <div class="label screen-label">{{ radio.label }}</div>
    </div>
  </div>
</template>

<script>
import { Percent } from "../utils/formatters.module";
export default {
  name: "CustomRadioGroup",
  data() {
    return {
      selected: false,
      radioId: undefined,
      currentValue: undefined,
      additionalStyles: "",
    };
  },
  props: {
    radios: {
      type: Array,
      default: new Array(),
    },
    defaultValue: String,
    cols: Number,
    name: String,
  },
  methods: {
    selectRadio: function (value) {
      this.currentValue = value;
      this.$emit("input", value);
    },
  },
  mounted() {
    this.radioId = "radio" + this._uid;
    this.additionalStyles = `flex-basis: ${Percent(this.cols, 1, true)}%;`;

    this.currentValue = this.radios.find(
      (radio) => radio.value === this.defaultValue
    ).value;

    if (this.currentValue === undefined) {
      this.defaultValue = this.radios[0].value + "";
      this.currentValue = this.radios[0].value + "";
    }

    this.$emit("input", this.currentValue);
  },
};
</script>

<style scoped>
.container {
  background: transparent;
  width: 100%;
  font-family: "Nunito", sans-serif;
  display: flex;
  flex-flow: wrap;
  margin: 5px 0;
  cursor: default;
  align-items: center;
}

.label {
  color: #17222d;
  margin: 5px;
  white-space: nowrap;
}

@media screen and (max-width: 10000px) {
  .screen-label {
    font-size: 23px;
  }
}

@media screen and (max-width: 400px) {
  .screen-label {
    font-size: 19px;
  }
}

.radio {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.radio-selected {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 7px solid #0e72c7;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin: 5px;
}

.radio-unselected {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #0e72c7;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin: 5px;
}
</style>
