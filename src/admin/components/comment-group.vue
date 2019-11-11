<template lang="pug">    
      .mycomment
        .mycomment__head
          .mycomment__img
            img.mycomment__img-pic(:src="`https://webdev-api.loftschool.com/${comment.photo}`")
          .mycomment__user
            .mycomment-name {{comment.author}}
            .mycomment-position {{comment.occ}}
        .mycomment__text {{comment.text}}
        .buttons
            button(type="button" @click="updateComment").btn.correct Править
            button(type="button" @click="removeExistedComment(comment.id)").btn.del Удалить         
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  props: {
    comment: {
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
      editedComment: { ...this.comment }
    };
  },
  methods: {
    ...mapActions("comments", ["removeComments"]),
    ...mapMutations("comments", ["NONS"]),    
    updateComment() {      
        this.NONS(this.comment.id);
        this.$emit("updateComment");
    },
    async removeExistedComment(payload) {
      console.log(payload);
      try {
        await this.removeComments(payload);
      } catch (error) {}
    }    
  }
};
</script>

<style lang="postcss">

.mycomment {
  padding: 10px;
}

.mycomment__head {
  display: flex;
  margin-bottom: 20px;
}

.mycomment__img {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  object-fit: cover;
  margin-right: 20px;
}

.mycomment__img-pic {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  object-fit: cover;
  margin-right: 20px;
}

.mycomment__user {
  display: flex;
  flex-direction: column;
}

.mycomment-name {
  font-weight: 600;
  font-size: 16px;
  color: white;
}

.mycomment-position {
  font-weight: 600;
  font-size: 14px;
  color: #babdc4;
}

.mycomment__text {
  padding-left: 30px;
  padding-right: 30px;
  min-height: 187px;
  font-weight: 600;
  font-size: 14px;
  color: #babdc4;
  margin-bottom: 20px;
  @media screen and (max-width: 748px) {
    min-height: 122px;
  }
}

.adds-comment__user {
  padding-top: 10px;
  width: 300px;
  margin-left: 20px;
  display: flex;
  height: 73px;
  border-bottom: 2px solid #e6e9f1;
  margin-bottom: 30px;
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

</style>
