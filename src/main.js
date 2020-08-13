import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import 'prismjs/components/prism-java';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/zh-cn'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.locale('zh-cn');

Vue.use(ElementUI);

VueMarkdownEditor.use(createHighlightLinesPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createTodoListPlugin());
VueMarkdownEditor.use(vuepressTheme);
VueMarkdownEditor.use(createEmojiPlugin());
Vue.use(VueMarkdownEditor);

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.filter("dateformat", 
function(dataStr, pattern) {
  //var lang = (navigator.language || navigator.browserLanguage).toLowerCase();
  if(pattern){
    return dayjs(dataStr).format(pattern);
  }else{
    return dayjs(dataStr).fromNow();
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
