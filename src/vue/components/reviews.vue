<template lang="pug">
 .reviews#reviews
    .reviews__header
    .reviews__title
        .section-title Что обо мне говорят
    .reviews__controls
            .reviews__control
                button(class="button button_around button_deg" @click="previous()" ref="button-prev")
            .reviews__control
                button(class="button button_around" @click="next()" ref="button-next")
    .reviews__slider
        .reviews-slider
            flickity(ref="flickity" :options="flickityOptions").reviews-slider__list
                .reviews-slider__item(v-for="item in reviews")
                    blockquote.review
                        .review__content
                            .review__text {{item.text}}
                            .review__author
                                .user
                                    .user__photo
                                        img(:src="item.photo").user__img
                                    .user__info
                                        span.user__name {{item.author}}
                                        span.user__position {{item.occ}}
</template>

<script>
import Flickity from "vue-flickity";
export default {
  components: {
    Flickity
  },

  data() {
    return {
      reviews: [],
      flickityOptions: {
        groupCells: true,
        pageDots: false,
        prevNextButtons: false,
        resize: true
      }
    };
  },

  methods: {
    next() {
      this.$refs.flickity.next();
      console.log(this.$refs);
    },

    previous() {
      this.$refs.flickity.previous();
    },
    requirePhotos(data) {
      return data.map(review => {
        review.photo = `https://webdev-api.loftschool.com/${review.photo}`;

        return review;
      });
    }
  },
  created() {
    fetch("https://webdev-api.loftschool.com/reviews/192")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.reviews = this.requirePhotos(data);
        this.$nextTick(() => {
            this.$refs.flickity.rerender();
         });
      });
}
};
</script>

<style lang="postcss">
.reviews {
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 100px;
    color: white;
    @media screen and (max-width: 480px) {
      flex-direction: column;
      align-items: center;
      margin-bottom: 33px;
    }
  }
  &__title {
    @media screen and (max-width: 480px) {
      margin-bottom: 27px;
    }
  }
  &__controls {
    display: flex;
    margin-left: 100px;
    @media screen and (max-width: 480px) {
      margin-left: 0;
    }
  }
  &__control {
    margin-left: 30px;
    &:first-child {
      margin-left: 0;
    }
  }
  &__slider {
    width: 100%;
    max-width: 977px;
  }
}

.review {
  display: flex;
  &::before {
    content: "";
    display: flex;
    width: 75px;
    height: 63px;
    background: svg-load("../../images/icons/quote.svg", fill=white, width=100%, height=100%);
    background-repeat: no-repeat;
    opacity: 0.05;
    @media screen and (max-width: 480px) {
      display: none;
    }
  }
  &__content {
    max-width: 76%;
    margin-left: 30px;
    @media screen and (max-width: 480px) {
      max-width: initial;
      margin-left: 0;
    }
  }
  &__text {
    font-weight: 600;
    margin-bottom: 32px;
    line-height: 30px;
  }
}

.reviews-slider {
  &__item {
    width: 45%;
    margin-left: 5%;
    @media screen and (max-width: 480px) {
      width: 100%;
      margin-left: 0;
    }
  }
}

.user {
  display: flex;
  &__photo {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    overflow: hidden;
  }
  &__info {
    margin-left: 30px;
  }
  &__name,
  &__position {
    display: flex;
  }
  &__name {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 19px;
  }
  &__img {
    width: 4.6875rem;
    height: 4.6875rem;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }
}

.reviews__control {
  width: 52px;
  height: 52px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid white;
  margin-right: 30px;

  &:hover {
    border: 2px solid #d6841f;
  }
  &:hover .sbtn {
    fill: #d6841f;
  }
}

.button{
    &_around{
        width: 50px;
        height: 50px;
        border: 1px solid #2d3c4e;
        border-radius: 50%;
        background: svg-load('arrow-down.svg', fill=white, width=8px, height=10px);
        background-repeat: no-repeat;
        background-position: center;
    }
    &_deg{
        transform: rotate(180deg)
    }
}

.section-title{
    font-size: 36px;
    font-weight: 700;
    color: white;
    @media screen and (max-width: 480px) {
        font-size: 24px;
    }
}
</style>
