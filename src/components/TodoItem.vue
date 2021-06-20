<template>
  <div class="box my-1 px-5 py-1" v-bind:style="computedStyles">
    <div class="columns is-flex is-align-items-center my-3">
      <div class="column p-0 m-0">
        <b-field :class="{ 'is-completed': todo.isCompleted }">
          <b-checkbox :value="todo.isCompleted" @input="toggleIsCompleted">{{
            todo.text
          }}</b-checkbox>
        </b-field>
      </div>
      <div class="column is-flex-grow-0 p-0 " v-on:click="edit">
        <b-icon icon="pencil"> </b-icon>
      </div>
      <div class="column is-flex-grow-0 p-0 " v-on:click="remove">
        <b-icon icon="delete"> </b-icon>
      </div>
    </div>
    <div class="columns is-flex is-align-items-center my-3">
      <div class="column p-0 m-0 is-10">
        <span class="is-size-7 has-text-grey-light" v-if="!todo.tags.length">
          <i> No tags </i>
        </span>
        <b-taglist v-else>
          <Tag class="tag" v-for="tag in todo.tags" :key="tag" :id="tag"> </Tag>
        </b-taglist>
      </div>
      <div class="column p-0 is-2 is-size-7 has-text-right has-text-grey-light">
        {{ todo.createdAt | formatDate }}
      </div>
    </div>
  </div>
</template>

<script>
import { priorities } from "../constants";
import { getColorByPriority } from "../utils";
import Tag from "./Tag.vue";

export default {
  name: "TodoItem",
  props: {
    todo: Object,
  },
  components: {
    Tag,
  },
  computed: {
    computedStyles() {
      const color = getColorByPriority(this.todo.priority, priorities);
      return { borderLeft: `10px solid ${color}` };
    },
  },
  methods: {
    toggleIsCompleted() {
      this.$store.commit("toggleIsCompleted", this.todo.id);
    },
    remove() {
      this.$store.commit("deleteTodo", this.todo.id);
    },
    edit() {
      this.$emit("edit", this.todo.id);
    },
  },
};
</script>

<style scoped>
.is-completed {
  text-decoration: line-through;
}
</style>
