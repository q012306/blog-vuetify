<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      width="300"
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
      <v-list
        dense
        nav
        class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://s1.ax1x.com/2020/08/08/aoZZOf.th.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>GoodGuy</v-list-item-title>
            <v-list-item-subtitle>Blog</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in activeItems"
          :key="item.title"
          link
          :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="item in additems"
          :key="item.title"
          link
          :href="item.linkUrl">
          <v-list-item-icon>
            <v-icon>{{ item.linkIcon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.linkName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="primary" block v-if="!$store.state.token" :to="'/login'">登陆</v-btn>
        </div>
        <div class="pa-2">
          <v-btn color="blue-grey" class="white--text" block v-if="!$store.state.token" :to="'/register'">注册</v-btn>
        </div>
        <div class="pa-2">
          <v-btn color="error" block v-if="$store.state.token" @click="$store.commit('clear_token')">注销</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      shrink-on-scroll
      scroll-threshold="800"
      fade-img-on-scroll
      prominent
      dark
      src="https://s1.ax1x.com/2020/08/09/aoec2n.jpg"
      elevate-on-scroll
      color="#6A76AB"
      app
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to right,rgba(25,32,72,.7),rgba(100,115,201,.33)"
        ></v-img>
      </template>
      <v-bottom-sheet v-model="sheet">

        <v-sheet class="text-center">
          <v-btn
            class="mt-6"
            color="error"
            @click="sheet = !sheet"
          >close</v-btn>
          <v-container>
            <v-row justify="space-around">
            <v-col cols="12">
              <header>Scheme</header>
            </v-col>
            <v-switch
              v-model="$vuetify.theme.dark"
              primary
              label="Dark"
            ></v-switch>
            <v-col cols="12">
              <header>Drawer</header>
            </v-col>
            <v-radio-group
              v-model="primaryDrawer.type"
              column
            >
              <v-radio
                v-for="drawer in drawers"
                :key="drawer"
                :label="drawer"
                :value="drawer.toLowerCase()"
                primary
              ></v-radio>
            </v-radio-group>
            <v-switch
              v-model="primaryDrawer.clipped"
              label="Clipped"
              primary
            ></v-switch>
            <v-switch
              v-model="primaryDrawer.floating"
              label="Floating"
              primary
            ></v-switch>
            <v-switch
              v-model="primaryDrawer.mini"
              label="Mini"
              primary
            ></v-switch>
            <v-col cols="12">
              <header>Footer</header>
            </v-col>
            <v-switch
              v-model="footer.inset"
              label="Inset"
              primary
            ></v-switch>
            </v-row>
          </v-container>
        </v-sheet>
      </v-bottom-sheet>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>GoodGuy' Blog</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        :label="label"
        clearable
        flat
        prepend-inner-icon="mdi-magnify"
        rounded
        solo-inverted
        @keydown.enter="onEnter"
      />
      <v-btn @click="onEnter" icon>
        <v-icon>mdi-send</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="sheet=!sheet"
      >
      <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="background-color: rgba(0, 0, 0, 0.01);">
      <v-container fluid>
      <v-scroll-x-transition mode="out-in"><router-view/></v-scroll-x-transition>
      </v-container>
    </v-main>
    
    <v-footer
      :inset="footer.inset"
      app>
      <Fab/>
      <span class="px-4">&copy; {{ new Date().getFullYear() }} - Powered by Vue.js and Springboot </span>
    </v-footer>
  </v-app>
</template>


<script>
import Fab from '../components/Fab'
export default {
  name: 'App',
  components: {Fab},
  data: () => ({
    sheet: false,
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false,
    },
    footer: {
      inset: false,
    },
    drawer: true,
    items: [
      { title: '文章列表', icon: 'mdi-book-open', route: '/' ,withoutAuth:true},
      { title: '小伙伴们', icon: 'mdi-account-group', route: '/friends',withoutAuth:true },
      { title: '关于本站', icon: 'mdi-card-account-details', route: '/about',withoutAuth:true },
      { title: '文章管理', icon: 'mdi-book-open-page-variant', route: '/admin/article-management',withoutAuth:false },
      { title: '添加文章', icon: 'mdi-book-plus', route: '/admin/article-editor',withoutAuth:false },
      { title: '外链管理', icon: 'mdi-webpack', route: '/admin/linkpagemanagement',withoutAuth:false },
      { title: '文件管理', icon: 'mdi-file', route: '/admin/file-management',withoutAuth:false },
    ],
    additems: [],
    color: 'primary',
    colors: [
      'primary',
      'blue',
      'success',
      'red',
      'teal',
    ],
    right: false,
    permanent: true,
    miniVariant: false,
    expandOnHover: false,
    background: false,
    label: '搜索 Search （按回车开始）',
    search:'',
  }),
  mounted(){
    this.axios.get('/api/loadpagelinks').then(resp => {
      if (resp && resp.data.code === 200) {
        this.additems = resp.data.result;
      }
    })
  },
  computed: {
    activeItems: function () {
      return this.items.filter((items) => {
        if(this.$store.state.status>=2){
          return items
        }
        else{
          return items.withoutAuth
        }
      })
    }
  },
  methods:{
    onEnter(){
      this.$router.push('/index')
      this.$store.commit('updateSearchMessage', this.search)
    }
  }
};
</script>
