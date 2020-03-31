<template>
  <div class="owl-carousel-component">
    <div
      :id="id"
      :class="(defaultConfig.items > 1) ? 'owl-carousel owl-theme multiple' : 'owl-carousel owl-theme'"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import "owl.carousel/dist/owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.green.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

export default {
  name: "owl-carousel-component",
  props: {
    id: String,
    config: Object
  },
  data() {
    return {
      defaultConfig: {
        loop: true,
        margin: 10,
        nav: true,
        items: 1
      }
    };
  },
  mounted() {
    if (this.config != null) {
      this.defaultConfig = this.config;
    }

    $("#" + this.id).owlCarousel(this.defaultConfig);
  }
};
</script>

<style lang="scss">
.owl-carousel-component {
  .owl-carousel {
    position: relative;

    &.multiple {
      .owl-dots {
        bottom: -40px;
      }
    }

    .slide {
      .image-wrapper {
        position: relative;

        &:before {
          content: "";
          display: block;
          padding-top: calc(3 / 8 * 100%);
        }

        img {
          @include image(cover);
          position: absolute;
          bottom: 0;
          left: 0;
          top: 0;
        }
      }
    }

    .owl-nav {
      margin: 0;
      .owl-prev,
      .owl-next {
        @include flex(row, center, center);
        background-color: rgba(grey, 0.6);
        transform: translateY(-50%);
        position: absolute;
        border-radius: 50%;
        overflow: hidden;
        transition: 0.3s;
        height: 40px;
        width: 40px;
        top: 50%;
        &:hover {
          background-color: black;
        }
        span {
          position: absolute;
          font-size: 40px;
          color: white;
        }
      }
      .owl-prev {
        left: 8px;
      }
      .owl-next {
        right: 8px;
      }
    }

    .owl-dots {
      transform: translateX(-50%);
      position: absolute;
      bottom: 16px;
      left: 50%;
      .owl-dot {
        &.active {
          span {
            background-color: $color-main;
          }
        }
        span {
          background-color: white;
          box-shadow: 0 1px 5px rgba(black, 0.2);
        }
      }
    }
  }

  @media #{$breakpoint-down-xs} {
    .owl-carousel {
			.slide {
				.image-wrapper {
					&:before {
						padding-top: calc(9 / 16 * 100%);
					}
				}
			}

      .owl-nav {
        margin: 0;
        .owl-prev,
        .owl-next {
          border-radius: 0;
          width: 25px;
        }
        .owl-prev {
          left: -5px;
        }
        .owl-next {
          right: -5px;
        }
      }
    }
  }
}
</style>