<template>
  <div class="container" :id="dataPickerId">
    <div class="up" @click="up">
      <span class="material-icons"> keyboard_arrow_up </span>
    </div>
    <div class="content" :id="contentId">
      <div
        v-for="item in data"
        :key="item.value"
        :id="itemId(item)"
        class="content-item"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="down" @click="down">
      <span class="material-icons"> keyboard_arrow_down </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualDataPicker",
  data() {
    return {
      currentData: undefined,
      dataIndex: 0,
      dataPickerId: undefined,
      contentId: undefined,
    };
  },
  props: {
    data: {
      type: Array,
      default: new Array(10).fill({ label: "No items", value: 1 }),
    },
  },
  methods: {
    up: function () {
      if (this.dataIndex > 0) {
        this.dataIndex--;
        let element = document.getElementById(
          this.dataPickerId + "-" + this.data[this.dataIndex].value
        );
        element.scrollIntoView({ behavior: "smooth" });
        this.$emit("input", this.data[this.dataIndex]);
      }
    },
    down: function () {
      if (this.dataIndex < this.data.length - 1) {
        this.dataIndex++;
        let element = document.getElementById(
          this.dataPickerId + "-" + this.data[this.dataIndex].value
        );
        element.scrollIntoView({ behavior: "smooth" });

        this.$emit("input", this.data[this.dataIndex]);
      }
    },
    scrollTo: function (index) {
      if (index >= 0 && index < this.data.length - 1) {
        this.dataIndex = index;
        let element = document.getElementById(
          this.dataPickerId + "-" + this.data[this.dataIndex]?.value
        );
        element?.scrollIntoView({ behavior: "smooth" });

        this.$emit("input", this.data[this.dataIndex]);
      }
    },
    itemId: function (val) {
      return this.dataPickerId + "-" + val?.value;
    },
  },
  mounted() {
    this.currentData = this.data[0];
    this.dataPickerId = "virtual-data-picker-" + this._uid;
    this.contentId = "virtual-data-picker-content-" + this._uid;
    this.scrollTo(0);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: #bbccdd;
}

.up {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.75;
  transition: all 0.6s ease;
}

.up:hover {
  transition: all 0.6s ease;
  opacity: 1;
}

.up span {
  font-size: 60px;
}

.down {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.75;
  transition: all 0.6s ease;
}

.down:hover {
  transition: all 0.6s ease;
  opacity: 1;
}

.down span {
  font-size: 60px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  max-height: 50px;
}

.content-item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-weight: 800;
  padding: 8px 5px;
  cursor: pointer;
  opacity: 0.75;
  transition: all 0.6s ease;
}

.content-item:hover {
  transition: all 0.6s ease;
  opacity: 1;
}
</style>