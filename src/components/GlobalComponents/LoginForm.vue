<template>
  <div class="loginCard">
    <div class="card">
      <div class="decoration">
        <i class="flaticon-shop-1"></i>
        <h4 class="py-2">Welcome Back</h4>
      </div>
      <div class="loginForm">
        <form @submit.prevent="submitLogin">
          <!-- <h3 class="text-center my-2 color-secondary">Artzzo</h3> -->
          <img :src="require('@/assets/logo.png')" class="image" alt="Artzzo Logo">
          <div class="input-wrapper">
            <label>
              <b>Username:</b>
            </label>
            <input type="text" v-model="form.username" placeholder="Username" />
          </div>
          <div class="input-wrapper">
            <label>
              <b>Password:</b>
            </label>
            <input type="password" v-model="form.password" placeholder="********" />
          </div>
          <button type="submit" class="btn add w-100 mt-3">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login_form",
  props: {
    type: String
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async submitLogin() {
      const isCalling = this.$store.getters.getIsCallingApi;
      const pendingCall = this.$store.getters.getPendingCallApi;

      if (this.type == "static" || this.type == "modal") {
        try {
          const login = await this.$api.login.login(this.form);
          const callback = async () => {
            try {
              const req = await this.$api.profile.getProfileInfo();

              return req.id;
            } catch (error) {
              console.error(error);
            }
          };

          const setup = await this.$api.login.setToken(login.token, callback);

          if (setup) {
            if (this.$route.path == "/") {
              this.$router.push({ path: "/home" });
            } else {
              if (isCalling) {
                for (let x of pendingCall) {
                  x();
                }
              }

              this.$store.commit("setLoginModalState", false);
              this.form = {
                username: "",
                password: ""
              };
            }
          } else {
            console.error(setup);
          }
        } catch (error) {
          alert("Username or password error, please try again later.");
          console.error(error);
        }
      } else {
        console.error(
          'You must define the form of Login Form. (Example: :type="static / modal")'
        );
      }
    }
  }
};
</script>

<style lang="scss">
.loginCard {
  max-width: 140vh;
  padding: 0 16px;
  height: 80%;
  width: 100%;
  .card {
    @include flex(row, center, center);
    height: 100%;
    width: 100%;
    .decoration {
      @include flex(column, center, center);
      background: linear-gradient(
        40deg,
        lighten($color-secondary, 30),
        lighten($color-secondary, 10),
        lighten($color-secondary, 5),
        $color-secondary
      );
      max-width: calc(4 / 12 * 100%);
      flex: calc(4 / 12 * 100%);
      height: 100%;
      h4 {
        color: white;
      }
      i {
        font-size: 48px;
        color: white;
      }
    }
    .loginForm {
      flex: calc(8 / 12 * 100%);
      max-width: calc(8 / 12 * 100%);
      form {
        max-width: 532px;
        padding: 0 16px;
        margin: 0 auto;
        .image {
          margin: 0 auto 24px;
          max-width: 150px;
          width: 100%;
        }
        .input-wrapper {
          @include flex(row, flex-start, center);
          padding: 0;
          label {
            flex: calc(3 / 12 * 100%);
            max-width: calc(3 / 12 * 100%);
          }
          input {
            flex: calc(9 / 12 * 100%);
            max-width: calc(9 / 12 * 100%);
          }
        }
      }
    }
  }

  @media #{$breakpoint-down-md} {
    max-width: 100%;
    height: 100%;
    padding: 0;
    .card {
      flex-direction: column;
      .decoration {
        flex: calc(4 / 12 * 100%);
        max-width: 100%;
        width: 100%;
      }
      .loginForm {
        @include flex(row, center, center);
        flex: calc(8 / 12 * 100%);
        max-width: 100%;
        width: 100%;
        form {
          width: 100%;
          .input-wrapper {
            flex-direction: column;
            align-items: flex-start;
            input {
              flex: 100%;
              max-width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>