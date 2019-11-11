<template lang="pug">
    section.comment  
      .container.comment__container          
        h2.title.comment-title Блок "Отзывы"
        commentForm(
              v-if="show" 
              :mode="mode" 
              @closeForm="show = false")
        .comments
          .add.comment-add
            button(@click="change").add__btn +
            h3.add__title Добавить работу
          .container.comment-container
                      ul.comment-list
                          li.comment-item(v-for="comment in comments" :key="comment.id")
                              commentGroup(:comment="comment" @updateComment="updateComment")           
</template>


<script>
import Vue from "vue";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  props: {    
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {    
    commentGroup: () => import("./comment-group"),
    commentForm: () => import("./comment-form")
  },
  data: function() {
    return {
      show: false,
      mode: "add"
    };
  },
  created() {
    this.fetchComments();
  },
  computed: {
    ...mapState("comments", {
      comments: state => state.comments
    })
  },
  methods: {   
    change() {
      this.show = true;
      mode: "add";
    },
    updateComment() {
      this.mode = "edit";
      this.show = true;
    },
     ...mapActions("comments", ["fetchComments"]),
  }
};
</script>

<style lang="postcss">
.comment {
  height: 100%;
  min-height: 1366px;
  background: url("../../images/content/autumnbg.png") center center / cover
    no-repeat;
  color: #ff7708;
}

.comment__container {
  padding-top: 61px;
  display: flex;
  flex-direction: column;
}

.comment-title {
  font-weight: 600;
  font-size: 21px;
  margin-bottom: 61px;
}

.comment-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -30px;
  @media screen and (max-width: 480px) {
    margin-left: 0;
  }
}

.comment-item {
  width: 340px;
  height: 380px;
  display: flex;
  flex-direction: column;
  background-color: #222427;
  box-shadow: 0 10px 5px rgba(110, 110, 110, 0.3);
  margin-bottom: 20px;
  margin-left: 10px;

  @media screen and (max-width: 748px) {
    width: 100%;
    flex-direction: column;
    margin-bottom: 10px;
    height: 285px;
    justify-content: center;
    align-items: center;
  }
}

.comment-add {
  width: 340px;
  height: 380px;
  margin-right: 40px;
}

.comments {
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>