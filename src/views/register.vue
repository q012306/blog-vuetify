<template>
  <body id="poster">
    <v-layout row wrap  align-center justify-center fill-height >
      <v-form v-model="valid" class="login-container">
        <h3 class="login_title">注册</h3>
        <v-text-field
          :rules="inputrules"
          clearable
          type="text"
          v-model="loginForm.username"
          :counter="20"
          label="账号">
        </v-text-field>
        <v-text-field
          clearable
          type="password"
          :rules="inputrules"
          v-model="loginForm.password"
          :counter="20"
          label="密码">
        </v-text-field>
        <v-text-field
          clearable
          type="password"
          :rules="inputrules"
          v-model="loginForm.confirmPassword"
          :counter="20"
          label="确认密码">
        </v-text-field>
        <v-text-field
          clearable
          type="text"
          :rules="emailRules"
          v-model="loginForm.email"
          :counter="50"
          label="邮箱">
        </v-text-field>
        <!-- <v-text-field
          clearable
          type="password"
          :rules="inputrules"
          v-model="loginForm.avatar"
          :counter="20"
          label="头像">
        </v-text-field> -->
        <div class="d-flex align-center">
        <v-text-field
          :counter="4"
          :rules="captcharules"
          v-model="captchaText"
          clearable
          label="验证码"
        ></v-text-field>
        <v-img v-ripple style="margin-left:18px;box-shadow: 3px 3px 3px #888888;cursor:pointer" :src="'data:image/jpg;base64,'+captcha" @click="loadCaptcha"></v-img>
        </div>
        <v-btn :disabled="!valid" block color="primary" style="margin-top:10px" v-on:click="register">注册</v-btn>
      </v-form>
    </v-layout>
  </body>
</template>

<script scoped>
  export default {
    name: 'Register',
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          confirmPassword:'',
          email: '',
          // avatar: ''
        },
        valid: false,
        inputrules: [
          v => !!v || '不能为空！',
          v => v.length <= 20 || '必须小于20个字符！',
        ],
        emailRules: [
          v => !!v || 'E-mail不能为空！',
          v => /.+@.+\..+/.test(v) || 'E-mail必须合法！',
          v => v.length <= 50 || '必须小于50个字符！',
        ],
        captcharules: [
          v => !!v || '不能为空！',
          v => v.length <= 4 || '必须小于4个字符！',
        ],
        captcha: '',
        captchaToken: '',
        captchaText: ''
      }
    },
    mounted(){
      this.loadCaptcha()
    },
    methods: {
      register() {
        if(this.loginForm.password != this.loginForm.confirmPassword){

          this.$message({
              message: '两次输入密码不一致！',
              type: 'warning'
          });
          return;
        }
        this.axios
          .post('/api/register', {
            user:{
              username: this.loginForm.username,
              password: this.loginForm.password,
              email : this.loginForm.email,
            },
            captchaText: this.captchaText,
            captchaToken: this.captchaToken
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$message({
                message: '注册成功，使用新注册的账号登陆吧！',
                type: 'success'
              });
              this.$router.replace({
                path: '/index'
              })
            } else if (successResponse.data.code === 400) {
              this.loadCaptcha()
              this.$message({
                message: successResponse.data.message,
                type: 'warning'
              });
            }
          })
          .catch(() => {
            this.loadCaptcha()
            this.$message({
              message: '服务器错误，请稍后再试',
              type: 'warning'
            });
          })
      },
      loadCaptcha(){
        this.axios.get('/api/getcaptcha').then(resp => {
            if (resp && resp.data.code === 200) {
              this.captchaToken = resp.data.result.captchaToken
              this.captcha = resp.data.result.imageString
            }
        })
      }
    }
  }
</script>

<style scoped>
  .login-container {
    border-radius: 10px;
    background-clip: padding-box;
    /* margin: 200px auto; */
    width: 350px;
    padding: 30px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 15px #cac6c6;
  }

  .login_title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }

  #poster {
    background: url("../assets/touhou_background.png") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
</style>