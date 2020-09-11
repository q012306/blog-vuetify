<template>
<div style="margin:32px auto;max-width:1000px;">
    <v-card style="margin:32px;padding:32px;">
        <div class="v-md-editor-preview vuepress-markdown-body"><div><div class="v-md-plugin-tip tip"><p class="v-md-plugin-tip-title">提示</p>
        <p data-v-md-line="2">本项目还在不断完善中😄</p>
        </div>
        <h2 data-v-md-heading="简介" data-v-md-line="4">简介</h2>
        <hr data-v-md-line="5">
        <p data-v-md-line="6">这是一个主要采用 <strong>Vue.js + SpringBoot</strong> 技术栈开发的前后端分离项目。</p>
        <p data-v-md-line="8">相比之前咱写的项目，权限认证系统从服务器存储 session 信息，改为基于 JWT 的 token，认证信息在客户端存储的方式。</p>
        <p data-v-md-line="10">鉴权基于 JWT 实现的 token，认证信息在客户端存储的方式；在前端路由和 axios 配置拦截器，使用 vuex 进行统一的状态管理；</p>
        <p data-v-md-line="12">后端 HandlerInterceptor 全局配置拦截器，进行非法和未授权访问的跳转；</p>
        <p data-v-md-line="14">UI 库使用国际流行的 Vuetify，符合 Material Design 设计风格，布局符合多终端适应性；</p>
        <p data-v-md-line="16">页面组件使用 router 路由进行跳转实现无刷新化；</p>
        <p data-v-md-line="18">Axios 请求后端的文章和评论数据在在初次请求时，在后端交由 Redis做简单的分页和分篇的缓存处理，调用 RESTful api 接口时数据优先在缓存中取出显示；</p>
        <p data-v-md-line="20">文章内容采用富文本编辑器处理，文章内容在数据库中仅保存 markdown 语法的文本，在需要使用时解析为 html，并在前台渲染，节省传输的数据量与数据库空间。</p>
        <p data-v-md-line="22">网站由 Nginx + tomcat 部署，并配置 CloudFlare 的 CDN 和 SSL 证书。</p>
        <h2 data-v-md-heading="使用技术栈" data-v-md-line="24">使用技术栈</h2>
        <hr data-v-md-line="25">
        <p data-v-md-line="26"><strong>后端：</strong></p>
        <ul class="v-md-editor__todo-list" data-v-md-line="27">
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> Spring Boot 全家桶</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> JWT（基于JJWT实现库）</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> Mysql 5.7</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> Redis 6.0</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> Spring Data JPA</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> IDE : IntelliJ IDEA 2020</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> Maven<br>
        <strong>前端：</strong></li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> Vue.js</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> Vuetify</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> Element UI（小部分使用）</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> axios</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> Day.js</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> vue-router</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> vuex</li>
        <li class="v-md-editor__todo-list-item"><span class="v-md-editor__todo-list-checkbox v-md-editor__todo-list-checkbox--checked" style="border-color: #3eaf7c;background-color: #3eaf7c"></span> kangc/v-md-editor</li>
        </ul>
        <h2 data-v-md-heading="演示站点" data-v-md-line="44">演示站点</h2>
        <hr data-v-md-line="45">
        <p data-v-md-line="46"><a href="https://goodguy.cc/" target="_blank" one-link-mark="yes">本站：https://goodguy.cc/<i class="v-md-icon-open-in-new"></i></a><br>
        <img src="/api/file/26b0eb48e1eb4c77ddf62f503fbbcd1c.png" alt="p"></p>
        <h2 data-v-md-heading="文章管理" data-v-md-line="49">文章管理</h2>
        <hr data-v-md-line="50">
        <p data-v-md-line="51"><img src="/api/file/70c67dfc4d64f2d9b9e586fae42dab6d.png" alt="p"></p>
        <h2 data-v-md-heading="添加更多的小伙伴" data-v-md-line="52">添加更多的小伙伴</h2>
        <hr data-v-md-line="53">
        <p data-v-md-line="54"><img src="/api/file/92015aa97773108f6bad85f9e66d5188.png" alt="p"></p>
        <h2 data-v-md-heading="外链管理" data-v-md-line="55">外链管理</h2>
        <hr data-v-md-line="56">
        <p data-v-md-line="57"><img src="/api/file/c37d9ae82607834188573b7ab0d23cb5.png" alt="p"></p>
        </div><!----></div>
    </v-card>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>