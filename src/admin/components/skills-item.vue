<template lang="pug">
  tr(v-if="editMode === false")
    td.skill-title {{skill.title}}
    td.skill-percent {{skill.percent}}
    td 
      button.pencil(type="button" @click="editMode = true")
      button.trash(type="button" @click="removeExistedSkill")     
  
  tr(v-else)
    td 
      input.skill-title(type="text" v-model="editedSkill.title")
    td 
      input.skill-percent(type="text" v-model="editedSkill.percent")
    td 
      button.tick(type="button" @click="editExistedSkill")
      button.remove(type="button" @click="editMode = false")

</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    skill: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data() {
    return {
      editMode: false,
      editedSkill: { ...this.skill }
    };
  },
  methods: {
    ...mapActions("skills", ["removeSkill", "editSkill"]),
    async editExistedSkill() {
      try {
        await this.editSkill(this.editedSkill);
        this.editMode = false;
      } catch (error) {}
    },
    async removeExistedSkill() {
      try {
        await this.removeSkill({
          id: this.skill.id,
          category: this.skill.category
        });
      } catch (error) {}
    }
  }
};
</script>

<style lang="postcss">
.tick {
  background: transparent;
  &::before {
    content: svg-load(
      "../../images/icons/tick.svg" width=13px,
      height=13px,
      fill=#ff7708
    );
  }
}

.remove {
  background: transparent;
  margin-left: 5px;
  &::before {
    content: svg-load(
      "../../images/icons/remove.svg" width=13px,
      height=13px,
      fill=white
    );
  }
}

.pencil {
  background: transparent;
  &::before {
    content: svg-load(
      "../../images/icons/pencil.svg" width=13px,
      height=13px,
      fill=#ff7708
    );
  }
}

.trash {
  background: transparent;
  margin-left: 5px;
  &::before {
    content: svg-load(
      "../../images/icons/trash.svg" width=13px,
      height=13px,
      fill=white
    );
  }
}

.skill-title {  
  background: none;
  border: transparent;
  border-bottom: 1px solid white;
  padding: 20px 8px;
  width: 60%; 
  height: 63px;
  color: #ff7708;
  outline: none;
  background-repeat: no-repeat;
  background-position: 7px 12px;

  &::placeholder {
    color: white;
  }

  &:focus {
    border-bottom: 1px solid white;
  }

  &--texteria {
    resize: none;
    height: 110px;
  }

  @media screen and (max-width: 768px) {
    width: 100px;
    margin-left: 0px;
  }
}

.skill-percent {
  width: 50px;      
  margin-left: 10px;
  background: none;
  border: transparent;
  border-bottom: 1px solid white;
  padding: 20px 8px;  
  height: 63px;
  color: #ff7708;
  outline: none;
  background-repeat: no-repeat;
  background-position: 7px 12px;

  &::placeholder {
    color: #adb0b8;
  }

  &:focus {
    border-bottom: 1px solid #ff7708;
  }

  &--texteria {
    resize: none;
    height: 110px;
  }
  @media screen and (max-width: 768px) {
    width: 50px;
  }  
}
</style>