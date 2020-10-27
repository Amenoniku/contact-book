<template>
  <div class="contact">
    <span class="back" @click="$router.back()">⇦</span>
    <div>Пользователь {{ $route.params.id }}</div>
  </div>
</template>

<script>
export default {
  name: "ContactView",
  components: {}
};
</script>
