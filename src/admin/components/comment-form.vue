<template lang="pug">    
        form.forms(@submit.prevent="sendData")             
          .forms__title
            h3.forms__text Новый отзыв
          .forms-info
            .userpic              
                .userpic__form-userpic
                  label.userpic__form-avatar-upload
                    input(
                      type="file"
                      ref="file-input"
                      @change="appendFileAndRenderPhoto"
                    ).userpic__form-file-input
                    .userpic__form-pic
                      .userpic__form-avatar-empty(
                        :class="{filled: renderedPhoto.length}"
                        :style="{'backgroundImage' : mode === 'edit' ? `url(https://webdev-api.loftschool.com/${renderedPhoto})` : `url(${renderedPhoto})`}"
                      )
                    button.userpic__form-addphoto(type="button" @click="uploadFile") Добавить фото
            .forms__form
                  .form                   
                      .form__row.form__row-rewiews
                          label.form__block.form__block-rewiewsup 
                              div.form__block-title Имя автора
                              input.form__imput.authoruser(type='text' author='author' v-model="comment.author" placeholder="Иван Иванов")
                              .error {{this.validation.firstError('comment.author')}}
                          label.form__block.form__block-rewiews 
                              div.form__block-title Титул автора
                              input.form__imput.posts(type='text' author='author' v-model="comment.occ" placeholder="Старший NPC")
                              .error {{this.validation.firstError('comment.occ')}}
                      .form__row.form__row-rewiew                    
                          label.form__block.form__comments
                              div.form__block-title Отзыв
                              textarea.form__imput.form__imput--texteria.comments(author='comment' v-model="comment.text" placeholder="Очень доволен вёрсткой сайта")
                              .error {{this.validation.firstError('comment.text')}}                    
                      .form__row.form__row-btn
                          .form__btn
                            button#order.btn-cancel(type="button") Отмена                          
                            button#order.btn-save(type="submit") Сохранить  
</template>


<script>
import Vue from "vue";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  props: {
    mode: {
      type: String,
      default: "add",
      validator: value => ["add", "edit"].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      diasbletForm: this.disablet,
      renderedPhoto: "",
      editMode: false,
      comment: {
        photo: "",
        author: "",
        occ: "",
        text: ""
      }
    };
  },

  validators: {
    "comment.author": function(value) {
      return Validator.value(value).required("Укажите имя");
    },
    "comment.occ": function(value) {
      return Validator.value(value).required("Укажите должность");
    },
    "comment.text": function(value) {
      return Validator.value(value).required("Добавьте описание");
    }
  },
  computed: {
    ...mapState("comments", {
      correntComment: state => state.correntComment
    }),
    titleError() {
      return this.validation.firstError("comment.author");
    },
    linkError() {
      return this.validation.firstError("comment.occ");
    },
    commentError() {
      return this.validation.firstError("comment.text");
    }
  },
  watch: {
    currentComment(value) {
      if (this.mode === "edit") {
        this.fillFormWithCurrentCommentkData();
      }
    },
    mode(value) {
      if (value === "add") {
        this.clearFormFields();
      }
    }
  },
  created() {
    if (this.mode === "edit") {
      this.fillFormWithCurrentCommentData();
    }
  },
  methods: {
    sendData () {      
      this.mode === "add" ? this.commentForm() : this.updateComment()
      this.$emit("closeForm")
    },
    ...mapActions("comments", ["editComment"]),
    async updateComment() {      
      try {
        const response = await this.editComment(this.comment);
      } catch (error) {}
    },
    uploadFile() {
      this.$refs["file-input"].click();
    },
    appendFileAndRenderPhoto(e) {
      const file = e.target.files[0];
      this.comment.photo = file;

      const reader = new FileReader();

      try {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.renderedPhoto = reader.result;
        };
      } catch (error) {
        console.log("Ошибка!");
      }
    },
    ...mapActions("comments", ["addComment"]),
    ...mapActions("tooltip", ["showTooltip"]),
    async addNewComment() {
      try {
        await this.addComment(this.comment);
        this.showTooltip({
          type: 'success',
          text: "Успешно!"
      });
      } catch (error) {
        this.showTooltip({
          type: 'error',
          text: "Ошибка в добавлении отзыва!"
      });
      }
    },
    ...mapActions("tooltip", ["showTooltip"]),
    async commentForm() {
      const success = await this.$validate();
      console.log("success", success);
      if (success) {
        this.addNewComment();
        this.showTooltip({
          type: 'success',
          text: "Успешно!"
      });
      } else {
        this.showTooltip({
          type: 'error',
          text: "Ошибка!"
      });
      }
    },
    fillFormWithCurrentCommentData() {      
      this.comment = { ...this.correntComment };
      this.renderedPhoto = this.correntComment.photo;
    },
    clearFormFields() {
      this.comment = {};
    }
  }
};
</script>

<style lang="postcss">
.userpic__form-addphoto {
  text-align: center;  
  color: #e65f20;
  font-weight: 600;
  cursor: pointer;
}
.userpic__form-pic {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 27px;
}
.userpic__form-userpic {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
}
.userpic__form-avatar-empty {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #d7861f;;
  position: relative;
  &:before {
    content: "";
    height: 115px;
    width: 85px;
    background: svg-load("../../images/icons/avatar.svg", fill=#fff) center center no-repeat;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.filled {
    background: center center no-repeat / cover;
    &:before {
      display: none;
    }
  }
}
.userpic__form-avatar-upload {  
  position: relative;  
  &.error {
    .userpic__avatar-error {
      display: block;
    }
  }
}
.userpic__avatar-error {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: none;
}
.userpic__form-file-input {
  position: absolute;
  top: 0;
  left: -9999px;
}
.edit-form__buttons {
  display: flex;
  justify-content: flex-end;
}
.edit-form__buttons-item {
  margin-right: 20px;
  &:last-child {
    margin-right: 0px;
  }
}

.forms-info {
  display: flex;
  margin-bottom: 20px;
  @media screen and (max-width: 748px) {
    flex-direction: column;
    align-items: center;
  }
}

.forms {
  width: 1080px;
  min-height: 510px;
  background-color: #222427;
  box-shadow: 0 10px 5px rgba(110, 110, 110, 0.3);
  @media screen and (max-width: 1143px) {
    width: 708px;
  }

  @media screen and (max-width: 748px) {
    width: 100%;
  }
}

.forms__title {
  width: 1040px;
  margin-left: 20px;
  display: flex;
  height: 73px;
  border-bottom: 1px solid #adb0b8;
  @media screen and (max-width: 1143px) {
    width: 678px;
  }

  @media screen and (max-width: 748px) {
    width: 88%;
  }
}

.forms__text {
  font-weight: 600;
  font-size: 18px;
  padding-top: 30px;
}

.userpic {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 33px;
  @media screen and (max-width: 748px) {
    margin-left: 0px;
    justify-content: center;
    align-items: center;
  }
}

.userpic__photo-container {
  width: 185px;
  height: 185px;
  border-radius: 50%;
  background-color: #e7782d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
.userpic__avatar {
  content: svg-load(
    "../../images/icons/avatar.svg" width=113px,
    height=113px,
    fill=#fff
  );
}

.userpic__btn {
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  background-color: transparent;
  color: #d7861f;
  text-align: center;
}

.forms__form {
  width: 615px;
  margin-left: 30px;
  margin-top: 50px;
  @media screen and (max-width: 1143px) {
    margin-right: 20px;
  }
  @media screen and (max-width: 748px) {
    margin-left: 0px;
    margin-right: 0px;
    width: 95%;
  }
}

.form__row-rewiews {
  flex-direction: inherit;
  @media screen and (max-width: 1143px) {
    flex-direction: column;
  }
}

.form__row-rewiew {
  margin-bottom: 0px;
}

.form__block-rewiews {
  margin-left: 30px;
  margin-top: 0px;
  @media screen and (max-width: 1143px) {
    margin-left: 0px;
  }
}

.form__block-rewiewsup {
  @media screen and (max-width: 1143px) {
    margin-bottom: 10px;
  }
}

.form__row {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0px;
  }
  &-btn {
    @media screen and (max-width: 1143px) {
      align-items: center;
    }
  }
}

.form__block {
  flex: 1;
  margin-top: 15px;
  &:first-child {
    margin-top: 0px;
  }
  display: block;

  &-title {
    color: black;
    font-weight: 600;
    font-size: 16px;
  }
}

.form__descriptions {
  margin-bottom: 20px;
  margin-right: 0px;
}

.form__imput {
  background: none;
  border: transparent;
  border-bottom: 1px solid black;
  padding: 20px 0px;
  width: 100%;
  height: 63px;
  color: black;
  outline: none;
  background-repeat: no-repeat;
  background-position: 7px 12px;
  font-weight: 600;
  font-size: 16px;

  &:placeholder {
    color: #babdc4;
    font-weight: 600;
    font-size: 16px;
  }

  &:focus {
    border-bottom: 1px solid #3e3e59;
  }

  &--texteria {
    resize: none;
    height: 150px;
    padding: 20px 8px;
    border: 1px solid rgb(168, 165, 165);
    color: #414c63;
    font-weight: 600;
    font-size: 16px;
  }
}

.form__btn {
  display: flex;
  justify-content: flex-end;
}

.btn-save {
  background-image: linear-gradient(57deg, #dc9322, #ff7708);
  width: 180px;
  height: 55px;
  border-radius: 40px;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  margin-left: 60px;
  &:hover {
    background-image: linear-gradient(108deg, #dc8236, #ff8908);
  }
  @media screen and (max-width: 748px) {
    margin-left: 10px;
  }
}

.btn-cancel {
  background: transparent;
  color: #d7861f;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
}
</style>