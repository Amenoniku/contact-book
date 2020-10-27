<template>
  <div class="contacts">
    <h4>Список контактов</h4>
    <ul class="contacts__list">
      <li
        class="contacts__item"
        v-for="item in list"
        :key="item.id"
        @click="$router.push({ name: 'Contact', params: { id: item.id } })"
      >
        <span class="contacts__name">{{ getValue(item, 0) }}</span>
        <span>
          <span class="contacts__phone">{{ getValue(item, 1) }}</span>
          <span
            class="contacts__remove"
            @click="
              e => {
                e.stopPropagation();
                removeContact(item.id);
              }
            "
            >⛌</span
          >
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
    getValue(item, index) {
      return item.fields[index]?.value;
    },
    ...mapActions("contacts", ["removeContact"])
  }
};
</script>

<style lang="scss" scoped>
.contacts {
  &__list {
    list-style: none;
    padding: 0;
  }
  &__item {
    cursor: pointer;
    margin: 0 20px;
    padding: 20px 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px whitesmoke solid;
  }
  &__remove {
    margin-left: 20px;
  }
}

h4 {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
