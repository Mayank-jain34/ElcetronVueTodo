<template>
  <div class="columns is-flex is-justify-content-flex-start">
    <div class="column is-flex-grow-0">
      <b-tabs
        type="is-toggle"
        class="block"
        :value="statusFilter"
        @input="onStatusFilterChange"
      >
        <b-tab-item label="All" value="all"></b-tab-item>
        <b-tab-item label="Pending" value="pending"></b-tab-item>
        <b-tab-item label="Completed" value="completed"></b-tab-item>
      </b-tabs>
    </div>
    <div class="column is-flex-grow-0">
      <b-dropdown :value="prioritiesFilter" multiple aria-role="list" @input="onPrioritiesFilterChange">
        <template #trigger>
          <b-button type="is-primary" icon-right="menu-down">
            Selected Priorities ({{ prioritiesFilter.length }})
          </b-button>
        </template>

        <b-dropdown-item
          v-for="p in priorities"
          :key="p.value"
          :value="p.value"
        >
          <span>{{ p.label }}</span>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="column is-flex-grow-0">
      <b-dropdown :value="tagsFilter" @input="onTagsFilterChange" multiple aria-role="list">
        <template #trigger>
          <b-button type="is-primary" icon-right="menu-down">
            Selected Tags ({{ tagsFilter.length }})
          </b-button>
        </template>

        <b-dropdown-item v-for="t in tags" :key="t.id" :value="t.id">
          <span>{{ t.label }}</span>
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { priorities } from "../constants";

export default {
  name: "Filters",
  data() {
    return { priorities };
  },
  computed: {
    statusFilter() {
      return this.$store.state.filters.status;
    },
    prioritiesFilter() {
      return this.$store.state.filters.priorities;
    },
    tagsFilter() {
      return this.$store.state.filters.tags;
    },
    tags() {
      return this.$store.getters.tags;
    },
  },
  methods: {
    onStatusFilterChange(value) {
      this.$store.commit("updateStatusFilter", value);
    },
    onPrioritiesFilterChange(value) {
      this.$store.commit("updatePrioritiesFilter", value);
    },
    onTagsFilterChange(value) {
      this.$store.commit("updateTagsFilter", value);
    },
  },
};
</script>

<style scoped>
/* To remove default padding from b-tabs */
::v-deep .tab-content {
  padding: 0 !important;
}
</style>
