<template>
  <b-tag
    :tabstop="false"
    ellipsis
    :closable="closable || false"
    @close="$emit('close')"
    :style="{ background: tag.color }"
  >
    {{ tag.label }}
  </b-tag>
</template>

<script>
export default {
  name: "Tag",
  props: {
    id: String,
    closable: Boolean,
  },
  computed: {
      tag() {
        return this.$store.getters.tagIdMap[this.id] || {};
      }
      
  },
  methods: {

  },
};
</script>

<style scoped></style>
