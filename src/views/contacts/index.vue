<template>
  <div class="contacts">
    <h4>Список контактов</h4>
    <ul class="contact-list">
      <li
        class="contact-list__item"
        v-for="item in list"
        :key="item.id"
        @click="$router.push({ name: 'Contact', params: { id: item.id } })"
      >
        <span class="name">{{ item.name }}</span>
        <span>
          <span class="phone">{{ item.phone }}</span>
          <span class="remove" @click="removeContact(item.id)">⛌</span>
        </span>
      </li>
    </ul>
    <Button label="Добавить Контакт" @click="$router.push('/contacts/new')" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Button from "@/components/Button";

export default {
  name: "ContactsView",
  components: { Button },
  computed: {
    ...mapState("contacts", ["list"])
  },
  methods: {
    ...mapActions("contacts", ["removeContact"])
  }
};
</script>

<style lang="scss" scoped>
.contact-list {
  list-style: none;
  padding: 0;
  &__item {
    cursor: pointer;
    margin: 0 20px;
    padding: 20px 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px whitesmoke solid;
    .remove {
      margin-left: 20px;
    }
  }
}

h4 {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
