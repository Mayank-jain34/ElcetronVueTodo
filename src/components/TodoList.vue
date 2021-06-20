<template>
  <div>
    <div class="is-italic has-text-centered" v-if="!todos.length">
      Nothing to display :(
    </div>

    <draggable v-model="todos">
      <transition-group>
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @edit="$emit('edit', $event)"
        ></TodoItem>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TodoItem from "./TodoItem.vue";
export default {
  name: "TodoList",
  components: {
    draggable,
    TodoItem,
  },
  computed: {
    todos: {
      get() {
           return this.$store.getters.todos;

        },
        set(value) {
            this.$store.commit('updateTodos', value)
        }
    },
  },
};
</script>
