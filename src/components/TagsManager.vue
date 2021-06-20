<template>
  <div>
    <b-modal
      v-model="open"
      has-modal-card
      :can-cancel="false"
      class="custom-modal"
    >
      <div class="modal-card is-full" style="width: 700px">
        <header class="modal-card-head">
          <p class="modal-card-title">Manage Tags</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body p-6">
          <div class="is-flex is-justify-content-flex-end">
            <b-button type="is-primary" @click="onAdd">Add New</b-button>
          </div>

          <b-table :data="tags">
            <b-table-column field="label" label="Label" v-slot="props">
              <Tag :id="props.row.id"> </Tag>
            </b-table-column>

            <b-table-column field="color" label="Color" centered v-slot="props">
              <span :style="{ color: props.row.color }">
                {{ props.row.color }}
              </span>
            </b-table-column>

            <b-table-column
              field="actions"
              label="actions"
              centered
              v-slot="props"
            >
              <b-button type="is-ghost" @click="onEdit(props.row)">
                Edit
              </b-button>
              <b-button type="is-ghost" @click="onDelete(props.row)">
                Delete
              </b-button>
            </b-table-column>

            <template #empty>
              <div class="has-text-centered">No records</div>
            </template>
          </b-table>
        </section>
      </div>
    </b-modal>

    <b-modal v-model="tagForm.open" has-modal-card :can-cancel="false">
      <div class="modal-card is-full" style="width: 700px">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ labels.title }}</p>
        </header>
        <section class="modal-card-body p-6">
          <b-field label="Preview">
            <b-tag
              :tabstop="false"
              ellipsis
              :style="{ background: tagForm.color }"
            >
              {{ tagForm.label }}
            </b-tag>
          </b-field>
          <div class="columns">
            <div class="column">
              <b-field label="Tag">
                <b-input placeholder="Tag" icon="tag" v-model="tagForm.label">
                </b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Color">
                <b-input
                  placeholder="Color Code"
                  icon="palette"
                  v-model="tagForm.color"
                >
                </b-input>
                <p class="control">
                  <b-button
                    icon-left="refresh"
                    inverted
                    type="is-primary"
                    @click="assignNewColor"
                  />
                </p>
              </b-field>
            </div>
          </div>
        </section>
      </div>

      <footer class="modal-card-foot">
        <b-button
          label="Cancel"
          inverted
          outlined
          type="is-primary"
          @click="closeTagForm"
        />
        <b-button
          :disabled="disableSubmit"
          :label="labels.okButtonText"
          type="is-primary"
          @click="onSubmitTagForm"
        />
      </footer>
    </b-modal>
  </div>
</template>

<script>
import { generateRandomColor } from "../utils";
import Tag from "./Tag.vue";

export default {
  name: "TagsManager",
  props: {
    open: Boolean,
  },
  components: {
    Tag,
  },
  data() {
    return {
      tagForm: {
        open: false,
        label: "",
        color: "",
        id: null,
      },
    };
  },
  computed: {
    tags() {
      return this.$store.getters.tags;
    },
    disableSubmit() {
      return !this.tagForm.label || !this.tagForm.color;
    },
    labels() {
      return this.tagForm.id
        ? { title: "Update Tag", okButtonText: "Update" }
        : {
            title: "Create a New Tag",
            okButtonText: "Create",
          };
    },
  },
  methods: {
    onAdd() {
      this.tagForm = {
        open: true,
        label: "",
        color: generateRandomColor(),
        id: null,
      };
    },
    onEdit(tag) {
      this.tagForm = {
        open: true,
        label: tag.label,
        color: tag.color,
        id: tag.id,
      };
    },
    onDelete(tag) {
      this.$store.commit("deleteTag", tag.id);
    },
    closeTagForm() {
      this.tagForm.open = false;
    },
    onSubmitTagForm() {
      const { label, color, id } = this.tagForm;
      const todo = { label, color, id };
      if (todo.id) {
        this.$store.commit("updateTag", todo);
      } else {
        this.$store.commit("addTag", todo);
      }

      this.closeTagForm();
    },
    assignNewColor() {
      this.tagForm.color = generateRandomColor();
    },
  },
};
</script>
