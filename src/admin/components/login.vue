<template lang="pug">
  .login
    .login__content
      form(
        @submit.prevent="login"
      ).login__form
        .login__form-title Авторизация
        .login__row
          app-input(
            title="Логин"
            icon="user"
            v-model="user.name"
          )
        .login__row
          app-input(
            title="Пароль"
            icon="key"
            type="password"
            v-model="user.password"
          )
        .login__btn
          button(
            type="submit"
          ).login__send-data Отправить
</template>

<script>
import $axios from "../requests";
export default {
  components: {
    appInput: () => import("./input.vue")
  },
  data: () => ({
    user: {
      name: "",
      password: ""
    }
  }),
  methods: {
    async login() {
      try {
        const {
          data: { token }
        } = await $axios.post("/login", this.user);

        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        this.$router.replace("/");
      } catch (error) {
        //error handling
      }
    }
  }
};
</script>

<style lang="postcss">
.login {
  height: 100%;
  min-height: 800px;
  background: url("../../images/content/autumnbg.png") center center / cover
    no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
  }
}

.login__form {
  padding: 50px 77px 60px;
  background: #fff;
  width: 570px;
  background-color: #222427;
  color: white;  
}

.login__form-title {
  font-size: 36px;
  text-align: center;
  font-weight: 600;
}

.login__content {
  position: relative;
}

.login__row {
  margin-bottom: 35px;
}


.login__btn {
  display: flex;
  width: 100%;
  padding: 0 8%;
  justify-content: center;
}

.login__send-data {  
  background-image: linear-gradient(57deg, #dc9322, #ff7708);
  color: white;
  font-weight: 600;  
  text-transform: uppercase;  
  width: 100%;
  padding: 30px; 
  font-weight: bold;
  font-size: 18px;

  &:hover {
    background-image: linear-gradient(108deg, #dc8236, #ff8908);
  }

  &[disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }
}
</style>