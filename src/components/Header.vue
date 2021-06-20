<template>
  <div class="columns is-flex">
    <div class="column">
      <h1 class="title">My TODOs</h1>
    </div>
    <div class="column is-flex-grow-0">
      <b-button
        label="Add New"
        type="is-primary"
        icon-left="plus"
        @click="$emit('addNew')"
      />
    </div>
    <div class="column is-flex-grow-0">
      <b-dropdown :value="selectedSetting"  role="menu">
        <template #trigger>
          <b-button icon-left="cog-outline" inverted outlined type="is-primary" />
        </template>
        <a class="dropdown-item" value="manage-tags" :focusable="false" @click="$emit('action', 'open-tags-manager')">
          <div class="media">
            <b-icon class="media-left" icon="tag-outline"></b-icon>
            <div class="media-content">
              <h3>Manage Tags</h3>
            </div>
          </div>
        </a>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { priorities } from "../constants";

export default {
  name: "Header",
  data() {
    return { priorities, selectedSetting: null};
  },
  computed: {
    filterValue() {
      return this.$store.state.filter;
    },
    tags() {
      return this.$store.state.tags;
    },
  },
  methods: {
    onInput(value) {
      this.$store.commit("updateFilter", value);
    },
  },
};
</script>

<style scoped>

</style>
