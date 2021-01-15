<template>
  <div :class="{ container: !disabled, 'container disabled': disabled }">
    <div class="label">{{ label }}</div>
    <div class="calendar" @click="toggleCalendar" :id="calendarId">
      <div v-if="!monthSelected && !yearSelected" class="calendar-placeholder">
        {{ placeholder }}
      </div>
      <div v-if="!monthSelected && yearSelected" class="calendar-placeholder">
        Mês - {{ year.label }}
      </div>
      <div v-if="monthSelected && !yearSelected" class="calendar-placeholder">
        {{ month.label }} - Ano
      </div>
      <div v-if="monthSelected && yearSelected" class="calendar-placeholder">
        {{ month.label }} - {{ year.label }}
      </div>
      <div class="calendar-icon">
        <i class="material-icons">{{ arrowIcon }}</i>
      </div>
    </div>
    <div v-if="errors.error" class="error-message">{{ errors.errorMsg }}</div>
    <div
      :class="{ 'dropdown-open slide-top': isOpen, 'dropdown-closed': !isOpen }"
      :id="dropdownId"
    >
      <VirtualDataPicker v-if="isDirty" :data="months" @input="setMonth" />
      <VirtualDataPicker v-if="isDirty" :data="years" @input="setYear" />
    </div>
  </div>
</template>

<script>
import CalendarData from "../data/calendar.data";
import Validate from "../utils/validators";
import VirtualDataPicker from "../common/virtual-data-picker";
import { IsValid } from "../utils/formatters.module";

export default {
  name: "CustomCalendar",
  data() {
    return {
      calendarId: null,
      dropdownId: null,
      arrowIcon: "keyboard_arrow_down",
      isOpen: false,
      years: [],
      months: CalendarData.CalendarMonths,
      month: undefined,
      year: undefined,
      monthSelected: false,
      yearSelected: false,
      isDirty: false,
    };
  },
  props: {
    label: String,
    name: String,
    placeholder: String,
    disabled: Boolean,
    validation: {
      type: Object,
      default: () => ({
        required: false,
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
  components: {
    VirtualDataPicker,
  },
  methods: {
    toggleCalendar: function () {
      this.isDirty = true;
      this.isOpen = !this.isOpen;
      this.arrowIcon = this.isOpen
        ? "keyboard_arrow_up"
        : "keyboard_arrow_down";
      console.log(this.month, this.year);
    },
    fetchYears: function () {
      if (this.years.length === 0) {
        let currentYear = new Date().getFullYear();

        for (let i = 0; i < 100; i++) {
          this.years.push({
            label: currentYear + i,
            value: currentYear + i,
          });
        }
      }
    },
    setMonth: function (month) {
      console.log("setMonth", month);
      this.month = month;
      this.monthSelected = IsValid(month);
      this.$emit("input", { month: this.month?.value, year: this.year?.value });
    },

    setYear: function (year) {
      console.log("setYear", year);
      this.year = year;
      this.yearSelected = IsValid(year);
      this.$emit("input", { month: this.month?.value, year: this.year?.value });
    },
    onClickOutside(event) {
      let calendar = document.getElementById(this.calendarId);
      if (calendar.contains(event.target)) {
        return;
      } else {
        let dropdown = document.getElementById(this.dropdownId);
        if (dropdown?.contains(event.target)) {
          return;
        } else if (this.isOpen) {
          if (!this.validation.default) {
            this.$emit(
              "validation-error",
              Validate(this.validation, {
                month: this.month?.value,
                year: this.year?.value,
              })
            );
          }
          this.toggleCalendar();
        }
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
    this.fetchYears();
    this.calendarId = "calendar-" + this._uid;
    this.dropdownId = "dropdown-" + this._uid;
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

.calendar {
  display: flex;
  background: #eff4f9;
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

.calendar-placeholder {
  display: flex;
  align-items: center;
  color: #bbccdd;
}

.calendar-icon {
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
  top: 115px;
  left: 5px;
  transition: all 0.8s ease;
  max-height: 210px;
  background: #eff4f9;
  border-radius: 6px;
  z-index: 20;
  width: calc(100% - 10px);
}

.month-box {
  display: flex;
  flex-flow: wrap;
  padding: 10px;
}

.month-item {
  background: #3d5f7b;
  color: #fff;
  margin: 1px;
  flex-grow: 1;
  flex-basis: 26%;
  padding: 7px;
  cursor: pointer;
  opacity: 0.7;
  text-align: center;
  border-radius: 5px;
}

.month-item:hover {
  opacity: 1;
}

.year-box {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.year-header {
  background: #506373;
  color: #fff;
  margin: 1px;
  flex-grow: 1;
  flex-basis: 0;
  padding: 7px;
  cursor: pointer;
  opacity: 0.7;
  text-align: center;
}

.year-header:hover {
  opacity: 1;
}

.year-item {
  background: #344b61;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  cursor: pointer;
  opacity: 0.7;
  font-size: 14px;
  margin: 1px;
  opacity: 0.7;
}

.year-item:hover {
  opacity: 1;
}

.dropdown-item {
  display: flex;
  font-size: 20px;
  cursor: default;
  padding: 5px;
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

.disabled {
  opacity: 0.3;
  pointer-events: none;
  cursor: default;
}

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
