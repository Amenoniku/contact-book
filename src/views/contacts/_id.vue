<template>
  <div class="contact">
    <span class="contact__back" @click="$router.back()">⇦</span>
    <span class="contact__back action-back" @click="comeBack">↬</span>
    <p>
      Контакт:
      <span class="contact__name">{{
        isNewContact ? "Новый" : contact.id
      }}</span>
    </p>
    <form v-if="form.length" class="contact__form">
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
    <p v-else class="empty-form">Добавте поле</p>
    <div class="contact__buttons">
      <Button label="Сохранить контакт" @click="updateContactHandler" />
      <Button label="Добавить поле" @click="addField" />
    </div>
  </div>
</template>

<script>
import idgen from "idgen";
import { mapActions } from "vuex";

import Button from "@/components/Button";

export default {
  name: "ContactView",
  components: { Button },
  data() {
    return {
      form: [], // { label: <str>, value: <str> }
      actionStack: [] // { type: <str>, item: <str>}
    };
  },
  computed: {
    isNewContact() {
      return this.$route.params.id === "new";
    },
    contact() {
      return this.$store.getters["contacts/contactById"](this.$route.params.id);
    }
  },
  methods: {
    addAction(type, item) {
      this.actionStack.push({ type, item });
    },
    comeBack() {
      let lastAction = this.actionStack[this.actionStack.length - 1] || {};
      switch (lastAction.type) {
        case "addField":
          this.removeField(
            this.form.findIndex(
              findField => lastAction.item.id === findField.id
            )
          );
          break;
        case "removeField":
          this.form.splice(lastAction.item.index, 0, lastAction.item);
          break;
        case "setOldValue":
          this.form[lastAction.item.index].value = lastAction.item.actualValue;
          break;
      }
      this.actionStack.pop();
    },
    addField() {
      let label = prompt("Название поля:");
      let field = { label, value: "", id: idgen(7) };
      this.form.push(field);
      this.addAction("addField", field);
    },
    removeField(index) {
      let removedItem = this.form.splice(index, 1)[0];
      removedItem.index = index;
      this.addAction("removeField", removedItem);
    },
    setOldValue(field, index) {
      let oldValue = this.contact.fields.find(
        findField => field.id === findField.id
      )?.value;
      let actualValue = this.form[index].value;
      if (oldValue === actualValue) return;
      this.addAction("setOldValue", { actualValue, index });
      this.form[index].value = this.contact.fields.find(
        findField => field.id === findField.id
      )?.value;
    },
    async updateContactHandler() {
      if (this.isNewContact)
        this.addContact({
          id: idgen(10),
          fields: this.form
        });
      else
        await this.updateContact({
          id: this.$route.params.id,
          fields: this.form
        });
      this.$router.push("/contacts");
    },
    ...mapActions("contacts", ["addContact", "updateContact"])
  },
  watch: {
    contact: {
      immediate: true,
      handler(v) {
        if (v.fields) this.form = JSON.parse(JSON.stringify(v.fields));
      }
    }
  },
  created() {
    if (!this.contact.id && !this.isNewContact) this.$router.push("/contacts");
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
