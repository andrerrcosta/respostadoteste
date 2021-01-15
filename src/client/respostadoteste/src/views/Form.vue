<template>
  <div class="form-container" id="form">
    <div class="header">
      <div class="header-flexbox screen-title">Cadastro</div>
    </div>
    <form class="content">
      <!-- {{ this.form }} -->
      <div class="content-flexbox">
        <CustomInput
          label="Nome"
          v-model="formItems[0].model"
          :validation="formItems[0].validator"
          :errors="formItems[0].errors"
          @validation-error="updateErrorMessage($event, 0)"
        />
        <CustomInput
          label="Email"
          v-model="formItems[1].model"
          :validation="formItems[1].validator"
          :errors="formItems[1].errors"
          @validation-error="updateErrorMessage($event, 1)"
        />
        <CustomInput
          label="CPF"
          v-model="formItems[2].model"
          :validation="formItems[2].validator"
          :errors="formItems[2].errors"
          placeholder="111.111.111-01"
          @validation-error="updateErrorMessage($event, 2)"
        />

        <div class="content-row">
          <div class="content-col">
            <CustomInput
              label="Endereço"
              placeholder="Rua, Número e Bairro"
              v-model="formItems[3].model"
              :validation="formItems[3].validator"
              :errors="formItems[3].errors"
              @validation-error="updateErrorMessage($event, 3)"
            />
          </div>
          <div class="content-col">
            <CustomSelect
              label="Estado"
              placeholder="Selecione o estado"
              v-model="formItems[4].model"
              :validation="formItems[4].validator"
              :errors="formItems[4].errors"
              @validation-error="updateErrorMessage($event, 4)"
              :options="estados"
            />
          </div>
        </div>

        <div class="content-row">
          <div class="content-col">
            <CustomInput
              label="CEP"
              placeholder="22.222-000"
              v-model="formItems[5].model"
              :validation="formItems[5].validator"
              :errors="formItems[5].errors"
              @validation-error="updateErrorMessage($event, 5)"
            />
          </div>
          <div class="content-col">
            <CustomSelect
              label="Cidade"
              placeholder="Selecione a cidade"
              v-model="formItems[6].model"
              :validation="formItems[6].validator"
              :errors="formItems[6].errors"
              :options="cidades"
              @validation-error="updateErrorMessage($event, 6)"
            />
          </div>
        </div>

        <CustomLabel title="Forma de Pagamento" />

        <CustomRadioGroup
          label="Cartão de Crédito"
          :radios="[
            {
              label: 'Cartão de crédito',
              value: 'Cartão',
            },
            {
              label: 'Boleto Bancário',
              value: 'Boleto',
            },
          ]"
          defaultValue="Boleto"
          :cols="2"
          name="pagamento"
          @input="changePayment"
          v-model="formItems[7].model"
        />

        <!-- <div style="font-size: 16px; color: red">
          value {{ formItems[7].model }} ;
        </div> -->

        <div class="content-row">
          <div class="content-col">
            <CustomInput
              label="Nome no Cartão"
              placeholder="Nome impresso no cartão"
              v-model="formItems[8].model"
              :validation="formItems[8].validator"
              :errors="formItems[8].errors"
              @validation-error="updateErrorMessage($event, 8)"
              :disabled="formItems[7].model !== 'Cartão'"
            />
          </div>
          <div class="content-col">
            <CustomCalendar
              label="Data de Expiração"
              placeholder="Escolha o Mês e o Ano"
              v-model="formItems[9].model"
              :validation="formItems[9].validator"
              :errors="formItems[9].errors"
              @validation-error="updateErrorMessage($event, 9)"
              :disabled="formItems[7].model !== 'Cartão'"
            />
          </div>
        </div>

        <div class="content-row">
          <div class="content-col">
            <CustomInput
              label="Número do Cartão"
              placeholder="5555 5555 5555 5555"
              v-model="formItems[10].model"
              :validation="formItems[10].validator"
              :errors="formItems[10].errors"
              @validation-error="updateErrorMessage($event, 10)"
              :disabled="formItems[7].model !== 'Cartão'"
            />
          </div>
          <div class="content-col">
            <CustomInput
              label="Código de Segurança"
              placeholder="XXX"
              v-model="formItems[11].model"
              :validation="formItems[11].validator"
              :errors="formItems[11].errors"
              @validation-error="updateErrorMessage($event, 11)"
              :disabled="formItems[7].model !== 'Cartão'"
            />
          </div>
        </div>

        <div class="submit-footer">
          <div class="big-message">
            {{ paymentMessage }}
          </div>

          <div class="submit-button" @click="submit">REALIZAR MATRÍCULA</div>

          <div class="small-message">Informações seguras e criptografadas</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CustomInput from "../components/form-objects/Input";
import CustomLabel from "../components/form-objects/Label";
import CustomSelect from "../components/form-objects/Select";
import CustomRadioGroup from "../components/form-objects/Radio";
import CustomCalendar from "../components/form-objects/Calendar";
import { FormGroup, FormItem } from "../components/utils/forms.module";
import Locations from "../components/data/locations.data";
import { FakeProcess } from "../components/utils/fake-process";
import System from "../services/system.service";

export default {
  name: "CustomForm",
  data() {
    return {
      formItems: [
        new FormItem("name", "", { required: true, min: 3, max: 50 }),
        new FormItem("email", "", { required: true, custom: "email" }),
        new FormItem("cpf", "", { required: true, custom: "cpf" }),
        new FormItem("address", "", { required: true, min: 8, max: 50 }),
        new FormItem("state", "", { required: true }),
        new FormItem("zipCode", "", { required: true, custom: "cep" }),
        new FormItem("city", "", { required: true, min: 3, max: 30 }),
        new FormItem("payment", "", { required: true }),
        new FormItem("cardName", "", { required: true, min: 3, max: 25 }),
        new FormItem(
          "cardExpiration",
          { month: "", year: "" },
          { required: true, custom: "no-past-date" }
        ),
        new FormItem("cardNumber", "", {
          required: true,
          size: 19,
          custom: "cc",
        }),
        new FormItem("securityCode", "", { required: true, size: 3 }),
      ],
      form: undefined,
      paymentMessage: `Seu cartão será debitado em R$49,00`,
      cidades: Locations.Cities,
      estados: Locations.States,
    };
  },
  components: {
    CustomInput,
    CustomSelect,
    CustomLabel,
    CustomRadioGroup,
    CustomCalendar,
  },
  mounted() {
    this.form = new FormGroup(this.formItems);
    this.form.validationRules = [
      {
        name: "payment",
        value: "Boleto",
        validate: ["cardName", "cardExpiration", "cardNumber", "securityCode"],
      },
    ];
    this.form.scripts = [
      { name: "cardNumber", script: "no-white-spaces", type: "update" },
    ];
  },
  methods: {
    changePayment: function () {
      switch (this.formItems[7].model) {
        case "Cartão":
          this.paymentMessage = `Seu cartão será debitado em R$49,00`;
          break;

        case "Boleto":
          this.paymentMessage = `Será gerado um boleto bancário no valor de R$49,00`;
          break;
      }
    },
    submit: function () {
      // this.formItems[0].model = "Juão Nogueira";
      // this.formItems[1].model = "juao@nobblecrafts.com";
      // this.formItems[2].model = "111.111.111-11";
      // this.formItems[3].model = "Rua Algum Lugar, 411, Bairro Sete";
      // this.formItems[4].model = "MG";
      // this.formItems[5].model = "22.222-000";
      // this.formItems[6].model = "Cidade 3";
      // this.formItems[7].model = "Cartão";
      // this.formItems[8].model = "Juão João";
      // this.formItems[9].model = { month: 1, year: 2023 };
      // this.formItems[10].model = "5425 2334 3010 9903";
      // // this.formItems[10].model = "1111 1111 1111 1111";
      // this.formItems[11].model = "541";

      if (this.form.isValid()) {
        let service = new FakeProcess(
          "Processando as informações...",
          "default000.gif"
        );
        service.process();

        System.save(this.form.toModel())
          .then(service.onSuccess("Cadastrado com sucesso"))
          .catch((e) => {
            console.error(e.response);
            service.onSuccess(e.response.data.error);
          });
      }
    },
    updateErrorMessage: function (e, i) {
      this.formItems[i].errors = e;
    },
  },
};
</script>


<style scoped>
.form-container {
  width: 100%;
  font-family: "Nunito", sans-serif;
  position: relative;
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

.content-row {
  display: flex;
  flex-flow: wrap;
}

.content-col {
  flex-grow: 1;
  flex-basis: 0;
  min-width: 200px;
}

.submit-footer {
  display: flex;
  flex-direction: column;
}

.submit-button {
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 13px;
  background: #0e72c7;
  color: #fff;
  opacity: 0.75;
  font-weight: 600;
  font-size: 22px;
  cursor: pointer;
  height: 50px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin: 5px;
}

.submit-button:hover {
  opacity: 1;
}

.small-message {
  font-size: 13px;
  padding: 0 5px;
}

.big-message {
  font-size: 25px;
  padding: 0 5px;
}
</style>

