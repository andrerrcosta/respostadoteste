<template>
  <div :class="{ container: !disabled, 'container disabled': disabled }">
    <div class="label">{{ label }}</div>
    <div class="input">
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        v-on:keyup="mkeydown"
        v-on:blur="mblur"
      />
    </div>
    <div v-if="errors.error" class="error-message">
      {{ errors.errorMsg }}
    </div>
  </div>
</template>

<script>
import Validate from "../utils/validators";
import InputFormatter from "../utils/input-formatter";

export default {
  name: "CustomInput",
  data() {
    return {
      formatter: null,
    };
  },
  props: {
    label: String,
    type: {
      type: String,
      default: "text",
    },
    value: String,
    placeholder: String,
    disabled: Boolean,
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
  },
  computed: {
    inputValue: {
      get() {
        return this.formatInput(this.value);
      },
      set(val) {
        this.$emit("input", this.formatInput(val));
      },
    },
  },
  methods: {
    mkeydown: function (event) {
      if (!event.target.value) {
        event.preventDefault();
      } else {
        event.target.value = this.formatInput(event.target.value);
      }
      this.$emit("mkeyup", event);

      if (this.error) {
        this.mblur();
      }
    },
    mblur: function () {
      if (!this.validation.default) {
        this.$emit("validation-error", Validate(this.validation, this.value));
      }
    },
    formatInput: function (val) {
      if (!this.validation.default && this.validation.custom) {
        if (this.formatter === null) this.formatter = new InputFormatter();
        return this.formatter.format(this.validation.custom, val);
      } else {
        return val;
      }
    },
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
}

.label {
  font-size: 23px;
  color: #17222d;
  margin: 5px;
}

.error-message {
  font-size: 12px;
  color: red;
  padding: 5px;
}

.input {
  display: flex;
}

.input input {
  background: #eff4f9;
  width: 100%;
  color: #17222d;
  border-radius: 6px;
  border: none;
  border-bottom: 3px solid #bbccdd;
  height: 65px;
  padding: 0 20px;
  outline: none;
  font-size: 20px;
  margin: 5px;
}

.input input::placeholder {
  color: #bbccdd;
}

.input input:-ms-input-placeholder {
  color: #bbccdd;
}

.input input::-ms-input-placeholder {
  color: #bbccdd;
}

.disabled {
  opacity: 0.3;
  pointer-events: none;
  cursor: default;
}
</style>
