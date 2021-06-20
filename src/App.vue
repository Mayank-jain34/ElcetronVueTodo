<template>
  <div class="container p-6">
    <Header @addNew="onAddNew" @action="onToolbarAction"></Header>
    <Filters></Filters>
    <TodoForm
      v-if="todoFormState.open"
      :open="todoFormState.open"
      :id="todoFormState.id"
      @close="closeForm"
    ></TodoForm>
    <TodoList @edit="onEdit"></TodoList>
    <tags-manager v-if="openTagsManager" :open="openTagsManager" @close="openTagsManager = false"></tags-manager>
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import Filters from "./components/Filters.vue";
import TodoList from "./components/TodoList.vue";
import Header from "./components/Header.vue";
import TagsManager from "./components/TagsManager.vue";
import {defaultTags, fakeTodos} from './constants';

export default {
  name: "App",
  components: {
    TodoForm,
    Header,
    Filters,
    TodoList,
    TagsManager,
  },
  data() {
    return {
      todoFormState: {
        open: false,
        id: null,
      },
      openTagsManager: false,
    };
  },
  created() {
    if (!this.$store.state.isInitialized) {
      let todos = process.env.NODE_ENV === 'production' ? [] : fakeTodos;
      this.$store.commit('init', {todos, tags: defaultTags});
    }
  },
  methods: {
    onAddNew() {
      this.todoFormState = {
        open: true,
        id: null,
      };
    },
    onEdit(id) {
      console.log(id);
      this.todoFormState = {
        open: true,
        id,
      };
    },
    closeForm() {
      this.todoFormState = {
        open: false,
        id: null,
      };
    },
    onToolbarAction(action) {
      switch (action) {
        case 'open-tags-manager':
          this.openTagsManager = true;
          return;
      }
    }
  },
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";


// Set your colors
$primary:#48c78e;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);

$background: 	#242e42;
$secondary-background-color: #2f3b52;
$body-background-color: $background;

$text: #fafafa;
.box, .input, .modal-card-body, .input, .textarea, .taginput .taginput-container.is-focusable, .select select, .dropdown-content, .table {
  background-color: $secondary-background-color !important;
  color: $text !important;
}
.title, .modal-card-title, .label, .table thead td, .table thead th, .checkbox:hover, .radio:hover  {
  color: $text !important;
}

.table td, .table th {
  border-color: $background !important;
}

$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Lists and maps
$custom-colors: null !default;
$custom-shades: null !default;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
    (
        "white": (
            $white,
            $black,
        ),
        "black": (
            $black,
            $white,
        ),
        "light": (
            $light,
            $light-invert,
        ),
        "dark": (
            $dark,
            $dark-invert,
        ),
        "primary": (
            $primary,
            $primary-invert,
            $primary-light,
            $primary-dark,
        ),
        "link": (
            $link,
            $link-invert,
            $link-light,
            $link-dark,
        ),
        "info": (
            $info,
            $info-invert,
            $info-light,
            $info-dark,
        ),
        "success": (
            $success,
            $success-invert,
            $success-light,
            $success-dark,
        ),
        "warning": (
            $warning,
            $warning-invert,
            $warning-light,
            $warning-dark,
        ),
        "danger": (
            $danger,
            $danger-invert,
            $danger-light,
            $danger-dark,
        ),
    ),
    $custom-colors
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;


// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

html,
body {
  height: 100%;
  width: 100%;
  overflow: auto;
  // background: #1D2D50 !important;
  // color: white;
}

.container {
   height: 100%;
  width: 100%;
}

// Scroll bar
::-webkit-scrollbar-track
{
	background-color: $background;
}

::-webkit-scrollbar
{
	width: 10px;
	background-color: $background;
}

::-webkit-scrollbar-thumb
{
	background-color: $primary;
}

</style>
<style>
.custom-modal .animation-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
