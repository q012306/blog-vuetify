import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from './utils/moment-with-locales.min.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';

Vue.use(ElementUI);

VueMarkdownEditor.use(vuepressTheme);
VueMarkdownEditor.use(createEmojiPlugin());
Vue.use(VueMarkdownEditor);
Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.filter("dateformat", 
function(dataStr, pattern) {
  let lang = navigator.language;
  moment.locale(lang);
  if(pattern){
    return moment(dataStr).format(pattern);
  }else{
    return moment(dataStr).fromNow();
  }
});

//使用beforeEach钩子函数判断是否拦截,在访问每一个路由前调用
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next()
    }else{
      router.push('/error')
    }
  } else{
    next()
  }
}
)

//axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (store.state.token) {
    config.headers.common['Authorization'] = "Bearer " + store.state.token
  }
  return config
}, function (error) {
  router.push('/error')
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status == 401) {
    store.commit('clear_token')
    router.push('/error')
  }
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
