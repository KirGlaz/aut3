<template lang="pug">
  section.about
    .container.about__container                   
      form.form-skill(@submit.prevent="addNewCategory")
        .about__title-block
          h1.about-title Блок "Обо мне" 
          button.about-btn(type="submit") Добавить          
        .category-add
          input.category-name(type="text" v-model="title" placeholder="Имя категории")         
    .about-page__content
      .container.container--mobile-wide
        ul.skill-list
          li.skill-list__item(v-for="category in categories" :key="category.id")
            skills-group(
              :category="category"
            )

</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {
    skillsGroup: () => import("./skills-group")
  },
  data: () => ({
    title: ""
  }),
  created() {
    this.fetchCategories();
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.categories
    })
  },
  methods: {
    ...mapActions("categories", ["addCategory", "fetchCategories"]),
    async addNewCategory() {
      try {
        await this.addCategory(this.title);
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>

<style lang="postcss">
.about {
  height: 100%;
  min-height: 1366px;
  background: url("../../images/content/autumnbg.png") center center / cover
    no-repeat;
  color: #ff7708;
}
.form-skill {
  margin-bottom: 20px;
}

.skill-container {  
  padding: 10px;
}

.about__title-block {
  display: flex;
  align-items: center;
  padding-top: 61px;
  margin-bottom: 61px;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: initial;
    font-size: 14px;
  }
}

.about-title {
  font-weight: 600;
  font-size: 21px;
  margin-right: 60px;
  color: #ff7708;
  @media screen and (max-width: 320px) {
    margin-right: 0px;
    margin-bottom: 30px;
  }
}

.about-btn {
  color: #d7861f;
  background: transparent;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 0px;
  &::before {
    content: "+";
    color: white;
    background-image: linear-gradient(57deg, #dc9322, #ff7708);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 15px;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.category-add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;;
  height: 50px;
  background: #222427;
}

.category-name {
  background: none;
  border: transparent;
  border-bottom: 1px solid white;
  padding: 20px 8px;
  width: 218px; 
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

.about-page__add-new {
  color: #ff7708;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;

  &:before {
    content: "+";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-image: linear-gradient(to right, #006aed, #3f35cb);
    line-height: 20px;
    color: #fff;
    margin-right: 13px;
    flex-shrink: 0;
    flex-basis: 20px;
  }
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -30px;
  @media screen and (max-width: 480px) {
    margin-left: 0;
  }
}

.skill-list__item {
  width: 340px;
  margin-left: 30px;
  margin-bottom: 30px;
  background-color: #222427;
  color: white;
  border: none;
  &.loading {
    opacity: 0.5;
    pointer-events: none;
    filter: grayscale(100%);
  }

  @media screen and (max-width: 480px) {    
    margin-left: 0;
    margin-bottom: 12px;
  }
}
</style>


