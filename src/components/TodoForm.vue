<template>
  <b-modal v-model="open" has-modal-card full-screen :can-cancel="false" class="custom-modal">
    <div class="modal-card" style="width: 80%; height: 80%;">
      <header class="modal-card-head">
        <p class="modal-card-title">{{labels.title}}</p>
      </header>
      <section class="modal-card-body p-6">
        <b-field label="Task">
          <b-input placeholder="Add a new todo" icon="pencil" v-model="text">
          </b-input>
        </b-field>

        <b-field label="Tags">
          <b-taginput
            :value="selectedTags"
            :data="filteredTags"
            :allow-new="false"
            ellipsis
            icon="label"
            placeholder="Add some tags"
            autocomplete
            ref="taginput"
            @input="onTagSelect"
            @typing="getFilteredTags"
          >
            <template slot-scope="props">
              {{ props.option.label }}
            </template>
            <template #selected="props">
              <Tag
                v-for="(tag, index) in props.tags"
                :key="index"
                :id="tag"
                :tabstop="false"
                ellipsis
                :closable="true"
                @close="$refs.taginput.removeTag(index, $event)"
              >
              </Tag>
            </template>
          </b-taginput>
        </b-field>

        <b-field label="Priority">
          <b-slider
            :min="0"
            :max="5"
            aria-label="Priority"
            :tooltip="false"
            v-model="priority"
          >
            <b-slider-tick v-for="p in priorities" :key="p.value" :value="p.value">{{p.label}}</b-slider-tick>
          </b-slider>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Cancel" inverted outlined type="is-primary" @click="$emit('close')" />
        <b-button :label="labels.okButtonText" type="is-primary" @click="onSubmit" />
      </footer>
    </div>
  </b-modal>
</template>

<script>
import {priorities} from '../constants';
import Tag from './Tag.vue';

export default {
  name: "AddTodo",
  props: {
    open: Boolean,
    id: String,
  },
  components: {
    Tag,
  },
  data() {
    return {
      text: "",
      selectedTags: [],
      filteredTags: [],
      priority: 3,
      priorities,
    };
  },
  created() {
    this.filteredTags = this.tags;
    if (this.selectedTodo) {
      this.text = this.selectedTodo.text;
      this.selectedTags = [...this.selectedTodo.tags];
      this.priority = this.selectedTodo.priority;
    }
  },
  computed: {
    tags() {
      return this.$store.getters.tags;
    },
    selectedTodo() {
      if (!this.id) return null;

      return this.$store.state.todos.find(t => t.id === this.id);
    },
    labels() {
      if (this.id) {
        return {
        title: 'Update Todo',
        okButtonText: 'Update'
      }
      }
      return {
        title: 'Create New Todo',
        okButtonText: 'Create'
      }
    }
  },
  methods: {
    onTagSelect(tags) {
      this.selectedTags = tags.map(t => t.id ? t.id : t);
    },
    onSubmit() {
      if (!this.text) return;

      if (this.id) {
        this.$store.commit("updateTodo", {
          ...this.selectedTodo,
          text: this.text,
          tags: this.selectedTags,
          priority: this.priority,
        });
      } else {
        this.$store.commit("addTodo", {
          text: this.text,
          tags: this.selectedTags,
          priority: this.priority,
        });
      }
      this.$emit("close");
    },
    getFilteredTags(text) {
      this.filteredTags = this.tags.filter((option) => {
        return option.label.toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    },
  },
};
</script>
