<template lang="pug">
    section.work
        .container.work__container
            h2.title.work-title Блок "Работы"            
            workForm(
              v-if="show" 
              :mode="mode" 
              @closeForm="show = false")
            .works
                .add
                  button(@click="change").add__btn +
                  h3.add__title Добавить работу              
                .container.works-container
                    ul.works-list                      
                        li.works-item(v-for="work in works" :key="work.id")                          
                            mywork(:work="work" @updateWork="updateWork")                 
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
    mywork: () => import("./mywork"),
    workForm: () => import("./work-form")
  },
  data: function() {
    return {
      show: false,
      mode: "add"
    };
  },
  created() {
    this.fetchWorks();
  },
  computed: {
    ...mapState("works", {
      works: state => state.works
    })
  },
  methods: {   
    change() {
      this.show = true;
      mode: "add";
    },
    updateWork() {
      this.mode = "edit";
      this.show = true;
    },
     ...mapActions("works", ["fetchWorks"]),        
  }
};
</script>

<style lang='postcss'>
.work {
  height: 100%;
  min-height: 1366px;
  background: url("../../images/content/autumnbg.png") center center / cover
    no-repeat;
  color: #ff7708;
}

.work__container {
  padding-top: 61px;
  display: flex;
  flex-direction: column;
}

.work-title {
  font-weight: 600;
  font-size: 21px;
  margin-bottom: 61px;
}

.work-form {
  display: flex;
  padding-bottom: 20px;
}

.add {
  width: 340px;
  height: 550px;
  background-image: linear-gradient(57deg, #dc9322, #ff7708);
  color: white;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 5px rgba(110, 110, 110, 0.3);
  margin-right: 30px;
  margin-bottom: 20px;

  &:hover {
    background-image: linear-gradient(108deg, #dc8236, #ff8908);
  }

  @media screen and (max-width: 1064px) {
    width: 100%;
    height: 110px;
    flex-direction: initial;
    margin-right: 0px;
    margin-bottom: 10px;
  }
}

.add-content {
  display: flex;
  background-color: #222427;
  width: 1100px;
  height: 700px;
}

.add__btn {
  width: 150px;
  height: 150px;
  border: 2px solid white;
  border-radius: 50%;
  background: transparent;
  color: white;
  font-size: 50px;
  margin-bottom: 30px;

  @media screen and (max-width: 1064px) {
    width: 52px;
    height: 52px;
    font-size: 20px;
    margin-bottom: 0px;
    margin-right: 20px;
  }
}

.add__title {
  width: 100px;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  @media screen and (max-width: 1064px) {
    width: 168px;
  }
}

.works {
  display: flex;
  @media screen and (max-width: 1064px) {
    flex-direction: column;
  }
}

.works-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -30px;
  @media screen and (max-width: 480px) {
    margin-left: 0;
  }
}

.works-item {
  width: 340px;
  height: 550px;
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
    width: 100%;
    margin-left: 0;
    margin-bottom: 12px;
  }
}
</style>