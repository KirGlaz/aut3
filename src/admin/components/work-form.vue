<template lang="pug">
            form.work-form(@submit.prevent="sendData")                
                .add-content
                    .load
                      label.load__form-avatar-upload
                        input(
                          type="file"
                          ref="file-input"
                          @change="appendFileAndRenderPhoto"
                        ).load__form-file-input
                        .load__form-pic
                          .load__form-avatar-empty(
                            :class="{filled: renderedPhoto.length}"
                            :style="{'backgroundImage' : mode === 'edit' ? `url(https://webdev-api.loftschool.com/${renderedPhoto})` : `url(${renderedPhoto})`}"
                          )
                        button(type="button" @click="uploadFile").load__form-addphoto Добавить фото                    
                    .work__form                                      
                        .form__row
                            label.form__block
                                div.form__block-title Название
                                input.form__imput.nameuser(type='text' name='name' v-model="work.title" placeholder="Дизайн автомобильного сайта")
                                span.error {{this.validation.firstError('work.title')}}
                            label.form__block
                                div.form__block-title Ссылка
                                input.form__imput.posts(type='text' name='name' v-model="work.link" placeholder="ivan@mail.ru")
                                .error {{this.validation.firstError('work.link')}}
                        .form__row                        
                            label.form__block.form__descriptions
                                div.form__block-title Описание
                                textarea.form__imput.form__imput--texteria.descriptions(name='description' v-model="work.description" placeholder="Дизайн сайта и вёрстка были разработаны для автосалона Автотрейд АГ")
                                .error {{this.validation.firstError('work.description')}}
                        .form__row
                            label.form__block
                                div.form__block-title Добавление тега
                                input.form__imput.nameuser(type='text' name='name' v-model="work.techs" placeholder="HTML, CSS")
                                .error {{this.validation.firstError('work.techs')}}
                        .form__row.form__row-btn
                            .form__btn(v-if="mode")
                                button(type="button" @click="closeForms")#order.btn-cancel Отмена                          
                                button(type="submit")#order.btn-save Сохранить                            
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
      work: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: "",
        max: ""
      }
    };
  },
  validators: {
    "work.title": function(value) {
      return Validator.value(value).required("Заполните название");
    },
    "work.link": function(value) {
      return Validator.value(value).required("Укажите ссылку");
    },
    "work.description": function(value) {
      return Validator.value(value).required("Добавьте описание");
    },
    "work.techs": function(value) {
      return Validator.value(value).required("Добавьте тег");
    }
  },
  computed: {
    ...mapState("works", {
      correntWork: state => state.correntWork      
    }),    
    titleError() {
      return this.validation.firstError("work.title");
    },
    linkError() {
      return this.validation.firstError("work.link");
    },
    descriptionError() {
      return this.validation.firstError("work.description");
    },
    techsError() {
      return this.validation.firstError("work.techs");
    }
  },
  watch: {
    currentWork(value) {
      if (this.mode === "edit") {
        this.fillFormWithCurrentWorkData();
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
      this.fillFormWithCurrentWorkData();
    }
  },
  methods: {
    sendData () {      
      this.mode === "add" ? this.sendForm() : this.updateWork()
      this.$emit("closeForm")
    },
    ...mapActions("works", ["editWork"]),
    async updateWork() {
      console.log(this.editWork);
      try {
        const response = await this.editWork(this.work);
      } catch (error) {}
    },
    uploadFile() {
      this.$refs["file-input"].click();
    },
    appendFileAndRenderPhoto(e) {
      const file = e.target.files[0];
      this.work.photo = file;

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
    ...mapActions("works", ["addWork"]),
    ...mapActions("tooltip", ["showTooltip"]),
    async addNewWork() {
      try {
        await this.addWork(this.work);        
        this.showTooltip({
          type: 'success',
          text: "Успешно!"
      });
      } catch (error) {
        this.showTooltip({
          type: 'error',
          text: "Ошибка в добавлении работы!"
      });
    }
    },
    ...mapActions("tooltip", ["showTooltip"]),
    async sendForm() {
      const success = await this.$validate();      
      if (success) {
        this.addNewWork();
        this.showTooltip({
          type: 'success',
          text: "Работа добавлена!"
      }); 
      } else {
        this.showTooltip({
          type: 'error',
          text: "Ошибка в заполнении формы!"
        })           
          console.log ("Ошибка в заполнении формы!")          
      }
    },
    fillFormWithCurrentWorkData() {
      console.log(this.non);
      this.work = { ...this.correntWork };
      this.renderedPhoto = this.correntWork.photo;
    },
    clearFormFields() {
      this.work = {};
    },
    closeForms() {      
      this.$emit("closeForm")      
    }    
  }
};
</script>


<style lang='postcss'>
.add-content {
  display: flex;
  background-color: #222427;
  height: 100%;
  width: 100%;
  padding: 10px;
  @media screen and (max-width: 1150px) {
    flex-direction: column;    
  }
  @media screen and (max-width: 768px) {
    align-items: center;    
  }
}
.load__form-userpic {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
}

.load__form-avatar-empty {
  width: 500px;
  height: 250px;
  background: #fcd097;
  position: relative;

  &.filled {
    background: center center no-repeat / cover;
  }

  @media screen and (max-width: 450px) {
    width: 340px;
  }
}

.load__form-avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.error {
    .reviews__avatar-error {
      display: block;
    }
  }
}

.load__avatar-error {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: none;
}

.load__form-file-input {
  position: absolute;
  top: 0;
  left: -9999px;
}

.load__form-addphoto {
  background-image: linear-gradient(57deg, #dc9322, #ff7708);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  width: 200px;
  padding: 5px;
  font-weight: bold;
  font-size: 12px;

  &:hover {
    background-image: linear-gradient(108deg, #dc8236, #ff8908);
  }

  &[disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }
}
</style>

<style lang='postcss'>
.load {
  width: 500px;
  height: 280px;
  background-color: #fcd097;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 30px;
  border: 2px dotted #f59416;
  @media screen and (max-width: 748px) {
    width: 95%;
    margin-left: 0px;
  }
}

.load__text {
  width: 350px;
  text-align: center;
  margin-bottom: 30px;
  color: #f59416;
  @media screen and (max-width: 748px) {
    width: 228px;
  }
}

.load__btn {
  background-image: linear-gradient(57deg, #dc9322, #ff7708);
  width: 180px;
  height: 55px;
  border-radius: 40px;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  &:hover {
    background-image: linear-gradient(108deg, #dc8236, #ff8908);
  }
}
.work__form {
  min-width: 505px;
  margin-top: 50px;
  margin-left: 20px;
  @media screen and (max-width: 748px) {
    min-width: inherit;
    width: 95%;
    margin-left: 0px;
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