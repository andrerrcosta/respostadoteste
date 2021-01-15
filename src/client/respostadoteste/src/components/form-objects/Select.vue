<template>
  <div class="container">
    <select style="display: none" v-model="inputValue" id="selectInput">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div class="label">{{ label }}</div>
    <div class="select" @click="toggleSelect" :id="selectId">
      <div v-if="selected === undefined" class="select-placeholder">
        {{ placeholder }}
      </div>
      <div v-if="selected !== undefined" class="select-placeholder">
        {{ selected }}
      </div>
      <div class="select-icon">
        <i class="material-icons">{{ arrowIcon }}</i>
      </div>
    </div>
    <div v-if="errors.error" class="error-message">{{ errors.errorMsg }}</div>
    <div
      :class="{ 'dropdown-open slide-top': isOpen, 'dropdown-closed': !isOpen }"
      id="dropdown"
    >
      <div
        v-for="option in options"
        class="dropdown-item"
        :key="option.value"
        @click="selectItem(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
import Validate from "../utils/validators";

export default {
  name: "CustomSelect",
  data() {
    return {
      selectId: null,
      isOpen: false,
      arrowIcon: "keyboard_arrow_down",
      selected: undefined,
    };
  },
  props: {
    label: String,
    model: String,
    options: {
      type: Array,
    },
    value: {
      label: String,
      value: [String, Number],
    },
    validation: {
      type: Object,
      default: () => ({
        required: false,
        min: undefined,
        max: undefined,
        custom: undefined,
        size: undefined,
        default: true,
      }),
    },
    errors: {
      type: Object,
      default: () => ({
        error: false,
        errorMsg: "",
      }),
    },
    placeholder: String,
  },
  methods: {
    toggleSelect: function () {
      // this.setDropdownDirection();
      this.isOpen = !this.isOpen;
      this.arrowIcon = this.isOpen
        ? "keyboard_arrow_up"
        : "keyboard_arrow_down";
    },
    selectItem: function (option) {
      this.selected = option.label;
      this.inputValue = option.value;
      this.$emit("validation-error", Validate(this.validation, option.value));
      this.toggleSelect();
    },
    onClickOutside(event) {
      let select = document.getElementById(this.selectId);
      if (select.contains(event.target)) return;
      if (this.isOpen) {
        if (!this.validation.default) {
          this.$emit(
            "validation-error",
            Validate(this.validation, this.inputValue)
          );
        }
        this.toggleSelect();
      }
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
    this.selectId = "select" + this._uid;
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickOutside);
  },
};
</script>

<style scoped>
.container {
  background: transparent;
  width: 100%;
  font-family: "Nunito", sans-serif;
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  position: relative;
}

.label {
  font-size: 23px;
  color: #17222d;
  margin: 5px;
}

.select {
  display: flex;
  background: #eff4f9;
  /* width: 100%; */
  color: #17222d;
  border-radius: 6px;
  border: none;
  border-bottom: 3px solid #bbccdd;
  height: 65px;
  padding: 0 20px;
  outline: none;
  font-size: 20px;
  margin: 5px;
  flex-flow: nowrap;
  cursor: default;
  justify-content: space-between;
}

.select-placeholder {
  display: flex;
  align-items: center;
  color: #bbccdd;
}

.select-icon {
  display: flex;
  align-items: center;
  width: 25px;
}

.dropdown-closed {
  position: absolute;
  display: none;
  top: 95px;
  transition: all 0.8s ease;
}

.dropdown-open {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 115px;
  left: 5px;
  transition: all 0.8s ease;
  max-height: 210px;
  background: #eff4f9;
  overflow: hidden auto;
  border-radius: 6px;
  z-index: 20;
  width: calc(100% - 10px);
}

.dropdown-item {
  display: flex;
  font-size: 20px;
  cursor: default;
  padding: 5px 5px 5px 20px;
}

.dropdown-item:hover {
  background: #17222d;
  color: #fff;
}

.error-message {
  font-size: 12px;
  color: red;
  padding: 5px;
}

/** Animations */

.slide-top {
  animation: anim-comingfrombottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation-iteration-count: 1;
  transform-origin: 0% 100%;
  animation-fill-mode: forwards;
  /*when the spec is finished*/
  -webkit-animation: anim-comingfrombottom 0.2s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 0% 100%;
  -webkit-animation-fill-mode: forwards;
  /*Chrome 16+, Safari 4+*/
  -moz-animation: anim-comingfrombottom 0.2s
    cubic-bezier(0.25, 0.46, 0.45, 0.94 both);
  -moz-animation-iteration-count: 1;
  -moz-transform-origin: 0% 100%;
  -moz-animation-fill-mode: forwards;
  /*FF 5+*/
  -o-animation: anim-comingfrombottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  -o-animation-iteration-count: 1;
  -o-transform-origin: 0% 100%;
  -o-animation-fill-mode: forwards;
  /*Not implemented yet*/
  -ms-animation: anim-comingfrombottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 0% 100%;
  -ms-animation-fill-mode: forwards;
  /*IE 10+*/
}

/*
 * KeyFrames
 */

@keyframes anim-comingfrombottom {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  30% {
    opacity: 0.2;
  }
  60% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@-moz-keyframes anim-comingfrombottom {
  0% {
    opacity: 0;
    -moz-transform: translate(0px, 0px, 0px, 20px);
  }
  100% {
    opacity: 1;
    -moz-transform: translate(0px, 0px, 0px, 2px);
  }
}

@-webkit-keyframes anim-comingfrombottom {
  0% {
    opacity: 0;
    -webkit-transform: translate(0px, 0px, 0px, 20px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate(0px, 0px, 0px, 0px);
  }
}

@-o-keyframes anim-comingfrombottom {
  0% {
    opacity: 0;
    -o-transform: translate(0px, 0px, 0px, 20px);
  }
  100% {
    opacity: 1;
    -o-transform: translate(0px, 0px, 0px, 0px);
  }
}

@-ms-keyframes anim-comingfrombottom {
  0% {
    opacity: 0;
    -ms-transform: translate(0px, 0px, 0px, 20px);
  }
  100% {
    opacity: 1;
    -ms-transform: translate(0px, 0px, 0px, 0px);
  }
}

</style>
