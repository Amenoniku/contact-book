<template>
  <div class="contact">
    <span class="contact__back" @click="$router.back()">⇦</span>
    <span class="contact__back action-back" @click="$router.back()">↬</span>
    <p>
      Контакт: <span class="contact__name">{{ contact.id }}</span>
    </p>
    <form class="contact__form">
      <label v-for="(field, index) in form" :key="field.id">
        <span class="contact__form-label">{{ field.label }}</span>
        <input type="text" v-model="field.value" />
        <span class="contact__form-remove" @click="setOldValue(field, index)">
          🖉
        </span>
        <span class="contact__form-remove" @click="removeField(index)">
          ⛌
        </span>
      </label>
    </form>
    <div class="contact__buttons">
      <Button label="Сохранить контакт" @click="updateContactHandler" />
      <Button label="Добавить поле" @click="addField" />
    </div>
  </div>
</template>

<script>
import idgen from "idgen";
import { mapState, mapActions } from "vuex";

import Button from "@/components/Button";

export default {
  name: "ContactView",
  components: { Button },
  data() {
    return {
      form: [] // { label: <str>, value: <str> }
    };
  },
  computed: {
    contact() {
      return this.$store.getters["contacts/contactById"](this.$route.params.id);
    },
    ...mapState("contacts", ["list"])
  },
  methods: {
    comeBack() {},
    addField() {
      let label = prompt("Название поля:");
      this.form.push({ label, value: "", id: idgen(7) });
    },
    removeField(index) {
      this.form.splice(index, 1);
    },
    setOldValue(field, index) {
      this.form[index].value = this.contact.fields.find(
        findField => field.id === findField.id
      )?.value;
    },
    async updateContactHandler() {
      await this.updateContact({
        id: this.$route.params.id,
        fields: this.form
      });
      this.$router.push("/contacts");
    },
    ...mapActions("contacts", ["updateContact"])
  },
  watch: {
    contact: {
      immediate: true,
      handler(v) {
        if (v.fields) this.form = JSON.parse(JSON.stringify(v.fields));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.contact {
  position: relative;
  &__back {
    cursor: pointer;
    position: absolute;
    top: -14px;
    left: 0;
    font-size: 30px;
  }
  .action-back {
    left: 93%;
  }
  &__name {
    font-weight: bold;
  }
  &__form {
    margin: 20px 0;
    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 60px;
    }
    input {
      padding: 10px;
      width: 270px;
      border: none;
      border-bottom: 2px whitesmoke solid;
      text-align: center;
    }
    &-remove {
      cursor: pointer;
    }
  }
}
</style>
