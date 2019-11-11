<template lang="pug">
  .skill-container
    .category-container(v-if="editMode === false")
      .category-title
        h2.categorytitle {{category.category}}
      .btn-category
        button.pencil-cat(type="button" @click="editMode = true")
        button.trash-cat(type="button" @click="removeExistedCategory")
    .category-container(v-else)
      .category-title
        input.categorytitle(type="text" v-model="editedCategory.title")
      .btn-category
        button.pencil-cat(type="button" @click="editExistedCategory")
        button.trash-cat(type="button" @click="editMode = false")
    hr
    table
      skills-item(
        v-for="skill in category.skills"
        :key="skill.id"
        :skill="skill"
      )
    hr
    form(
      @submit.prevent="addNewSkill"
      :class={blocked: formBlocked}
    ).add-skill-wrapper
      input.skill-title(type="text" placeholder="Новый навык" v-model="skill.title")
      input.skill-percent(type="text" placeholder="100%" v-model="skill.percent")
      button.plus(type="submit") +
</template>
<script>
import { mapActions } from "vuex";
export default {
  components: {
    skillsItem: () => import("./skills-item")
  },
  props: {
    category: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data() {
    return {
      formBlocked: false,
      editMode: false,
      editedSkill: { ...this.category },
      editedCategory: { ...this.category },
      skill: {
        title: "",
        percent: "",
        category: this.category.id
      }
    };
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    async addNewSkill() {
      this.formBlocked = true;
      try {
        await this.addSkill(this.skill);
        this.skill.title = "";
        this.skill.percent = "";
      } catch (error) {
        // errors
      } finally {
        this.formBlocked = false;
      }
    },
    ...mapActions("categories", ["removeCategories", "editCategory"]),
    async removeExistedCategory() {
      try {
        await this.removeCategories({
          id: this.category.id,
          category: this.category
        });
      } catch (error) {}
    },
    async editExistedCategory() {
      try {
        await this.editCategory(this.editedCategory);
        this.editMode = false;
      } catch (error) {}
    },
  }
};
</script>

<style lang="postcss">
.add-skill-wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.add-skill-wrapper.blocked {
  opacity: 0.5;
  filter: grayscale(100%);
  pointer-events: none;
  user-select: none;  
}

.category-container {
  display: flex;
}

.btn-category {   
  margin-left: 20px;
  display: flex;
  align-items: center
}

.pencil-cat {
  background: transparent;
  &::before {
    content: svg-load(
      "../../images/icons/pencil.svg" width=13px,
      height=13px,
      fill=#ff7708
    );
  }
}

.trash-cat {
  background: transparent;
  margin-left: 10px;
  &::before {
    content: svg-load(
      "../../images/icons/trash.svg" width=13px,
      height=13px,
      fill=white
    );
  }
}

.plus {
  background: transparent;  
  margin-left: 10px;  
  color: white;
  background-image: linear-gradient(57deg, #dc9322, #ff7708);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  font-weight: 500;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-image: linear-gradient(108deg, #dc8236, #ff8908);
  }  
}
</style>