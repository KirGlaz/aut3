<template lang="pug">
  header.header
        .container.header__container
          .header__left
            .user
              img.user__pic(src='../../images/content/kir.jpg')
              .user__name Кирилл Глазов
            .admin-name Панель администрирования
          .header__right
            button.exit(@click="logout") Выйти
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["exit"]),
    logout() {
      console.log(this.exit)
      this.exit()
    }
  },   
};
</script>

<style lang="postcss">
.header {
  height: 80px;
  background-image: linear-gradient(90deg, #222427 60%, #d7861f);
  display: flex;
}

.header__container {
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}

.header__left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.user__name {
  font-weight: 600;
  font-size: 18px;
}

.user__pic {
  border-radius: 50%;
  width: 45px;
  margin-right: 20px;
}

.admin-name {
  font-size: 14px;
  color: #afafb9;
  @media screen and (max-width: 480px) {
    display: none;
  }
}

.exit {
  background-color: transparent;
  color: #222427;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  &:hover {
    width: 100%;
    &:after {
      content: "";
      height: 3px;
      background: #d7861f;
      display: block;
      position: absolute;
      transition: width 0.3s ease-out;
    }
  }
}
</style>