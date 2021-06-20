import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidV4} from 'uuid';
import { createPersistedState } from "vuex-electron";
import {intersection, sortBy, uniqBy} from "lodash";

// import Store from 'electron-store';
// const store = new Store({ name: 'vuex' });
// store.clear();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    filters: {
      status: 'all',
      priorities: [],
      tags: [],
    },
    tags: [],
    isInitialized: false,
  },
  mutations: {
    init(state, {todos, tags}) {
      state.todos = todos;
      state.tags = tags;
      state.isInitialized = true;
    },
    // TODOs
    addTodo(state, todo) {
      const newTodo = {
        id: uuidV4(),
        ...todo,
        isCompleted: false,
        createdAt: new Date(),
        modifiedAt: new Date(),
      };
      state.todos = [...state.todos, newTodo];
    },
    updateTodos(state, todos) {
      state.todos = uniqBy([...todos, ...state.todos], 'id');
    },
    updateTodo(state, todo) {
      state.todos = state.todos.map(t => {
        if (t.id === todo.id) {
          return {...todo, modifiedAt: new Date()};
        }

        return t;
      })
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter(t => t.id !== id);
    },
    toggleIsCompleted(state, id) {
      state.todos = state.todos.map(t => {
        if (t.id === id) {
          t.isCompleted = !t.isCompleted;
        }

        return t;
      })
    },

    // Filters
    updateStatusFilter(state, status) {
      state.filters.status = status;
    },
    updatePrioritiesFilter(state, priorities) {
      state.filters.priorities = priorities;
    },
    updateTagsFilter(state, tags) {
      state.filters.tags = tags;
    },

    // TAGS
    addTag(state, tag) {
      state.tags = [...state.tags, {...tag, id: uuidV4()}];
    },
    updateTag(state, tag) {
      state.tags = state.tags.map(t => t.id === tag.id ? tag : t);
    },
    deleteTag(state, id) {
      state.todos = state.todos.map(todo => {
        return {...todo, tags: todo.tags.filter(t => t !== id) };
      })
      state.tags = state.tags.filter(t => t.id !== id);
    }
  },
  getters: {
    statusFilteredTodos(state) {
      switch (state.filters.status) {
        case 'pending':
          return state.todos.filter(s => !s.isCompleted);
        case 'completed':
          return state.todos.filter(s => s.isCompleted);
        default:
          return state.todos;
      }
    },
    priorityFilteredTodos(state, getters) {
      if (state.filters.priorities.length) {
        return getters.statusFilteredTodos.filter(t => state.filters.priorities.includes(t.priority));
      }

      return getters.statusFilteredTodos;
    },
    tagFilteredTodos(state, getters) {
      if (state.filters.tags.length) {
        return getters.priorityFilteredTodos.filter(t => intersection(t.tags, state.filters.tags).length > 0 );
      }

      return getters.priorityFilteredTodos;
    },
    todos(state, getters) {
      return getters.tagFilteredTodos;
    },
    tags(state) {
      return sortBy(state.tags, 'label');
    },
    tagIdMap(state) {
      return state.tags.reduce((acc, t) => {
        acc[t.id] = t;
        return acc;
      }, {})
    },
  },
  plugins: [
    createPersistedState(),
  ]
});
