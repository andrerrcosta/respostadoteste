<template>
  <div class="list-container">
    <div class="header">
      <div class="header-flexbox screen-title">Lista</div>
    </div>
    <div class="content">
      <div class="content-flexbox">
        <CustomLabel title="Lista de Clientes" />
        <CustomInput
          label="Nome do Cliente"
          v-on:mkeyup="filterRecords"
          v-model="inputValue"
        />
        <div class="table-container">
          <table class="list-table" cellspacing="0">
            <thead>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Criado em</th>
            </thead>
            <tbody>
              <tr v-for="record in filter" :key="record.cpf">
                <td>{{ record.name }}</td>
                <td>{{ record.email }}</td>
                <td>{{ record.cpf }}</td>
                <td>{{ record.created }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "../components/form-objects/Input";
import CustomLabel from "../components/form-objects/Label";
import System from "../services/system.service";
import { DateFormat } from "../components/utils/formatters.module";

export default {
  name: "List",
  components: {
    CustomInput,
    CustomLabel,
  },
  data() {
    return {
      inputValue: "",
      filter: [],
      records: [],
    };
  },
  methods: {
    setUp: function () {
      this.records.forEach((r) => this.filter.push(r));
      // console.log(this.filter);
    },
    filterRecords: function () {
      this.filter = this.records.filter((r) =>
        r.name.toLowerCase().startsWith(this.inputValue.toLowerCase())
      );
    },
  },
  mounted() {
    System.getAll().then((res) => {
      this.records = res.data.map((record) => {
        record.created = DateFormat(record.created);
        return record;
      });
      this.setUp();
    });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

.list-container {
  width: 100%;
  font-family: "Roboto Mono", monospace;
  position: relative;
  min-height: calc(100vh - 165px);
  background: white;
}

.header {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #eff4f9;
  padding: 20px 0;
}

.header-flexbox {
  max-width: 800px;
  width: 100%;
  color: #17222d;
  /* border: 1px dashed red; */
}

@media screen and (max-width: 10000px) {
  .screen-title {
    font-size: 70px;
  }
}

@media screen and (max-width: 400px) {
  .screen-title {
    font-size: 60px;
  }
}

.content {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background: #fff;
}

.content-flexbox {
  max-width: 800px;
  width: 100%;
  color: #595d6e;
  display: flex;
  flex-direction: column;
}

.table-container {
  overflow-x: auto;
  margin: 5px;
}

.list-table {
  min-width: 250px;
  width: 100%;
  border: 1px solid #344b61;
  font-size: 13px;
}

.list-table td {
  border-collapse: collapse;
  white-space: nowrap;
  border: 1px solid #344b61;
  padding: 3px;
}

.list-table thead {
  /* border: 1px solid #eff4f9; */
  background: #17222d;
  color: #eff4f9;
}
</style>