<template lang="pug">    
.mywork
    .mywork__img
         img(:src="`https://webdev-api.loftschool.com/${work.photo}`")
    .mywork-content
        .mywork__title
            h2.mywork-title {{work.title}}
        .mywork__text 
          span {{work.description}}
        a.mywork__link {{work.link}}
        .buttons
            button(type="button" @click="updateWork").btn.correct Править
            button(type="button" @click="removeExistedWork(work.id)").btn.del Удалить                   
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  props: {
    work: {
      type: Object,
      default: () => ({}),
      required: true
    },    
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      renderedPhoto: "",
      editMode: false,
      editedWork: { ...this.work }
    };
  },
  methods: {
    ...mapActions("works", ["removeWorks"]),
    ...mapMutations("works", ["NON"]),    
    updateWork() {     
      console.log("works") 
        this.NON(this.work.id);
        this.$emit("updateWork");
    },
    async removeExistedWork(payload) {
      console.log(payload);
      try {
        await this.removeWorks(payload);
      } catch (error) {}
    }    
  }
};
</script>


<style lang='postcss'>
.mywork {
  background-color: #222427;
}

.buttons {
  display: flex;
  padding-left: 30px;
  margin-top: 45px;
  @media screen and (max-width: 748px) {
    margin-top: 50px;
    padding-bottom: 10px;
  }
}

.btn {
  background-color: transparent;
  color: #babdc4;
  font-weight: 600;
  font-size: 14px;
}

.correct {
  margin-right: 90px;
  &::after {
    margin-left: 10px;
    content: svg-load(
      "../../images/icons/pencil.svg" width=15px,
      height=15px,
      fill=#383bcf
    );
  }
  @media screen and (max-width: 748px) {
    margin-right: 20px;
  }
}

.del {
  &::after {
    margin-left: 10px;
    content: svg-load(
      "../../images/icons/remove.svg" width=13px,
      height=13px,
      fill=red
    );
  }
}

.mywork__img {
  margin-bottom: 35px;
}

.mywork-content {
  padding-left: 30px;
  padding-right: 30px;
  min-height: 215px;
}

.mywork-title {
  font-weight: 600;
  font-size: 16px;
  color: #414c63;
  margin-bottom: 30px;
}

.mywork__text {
  font-weight: 600;
  font-size: 14px;
  color: #babdc4;
  margin-bottom: 20px;
}

.mywork__link {
  color: #3056e8;
  font-weight: 600;
  font-size: 14px;
}

.buttons {
  display: flex;
  padding-left: 30px;
  margin-top: 45px;
  @media screen and (max-width: 748px) {
    margin-top: 50px;
    padding-bottom: 10px;
  }
}
</style>