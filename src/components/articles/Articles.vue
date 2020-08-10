<template>
  <div style="margin:32px auto;max-width:800px;">
    <v-progress-linear
      v-if="articles==null||articles==''"
      indeterminate
      color="teal"
    ></v-progress-linear>
    <div v-for="article in articles" :key="article.id">
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 12 : 4" style="margin: 18px;" @click="GoToArticle(article)">
          <v-img
            class="white--text align-end"
            :src="article.articleCover"
            height="200px"
            fit="cover">
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out brown v-card--reveal display-2 white--text"
                style="height: 100%;"
              >
                {{article.articleTitle}}
              </div>
            </v-expand-transition>
            <v-card-title v-if="!hover">{{article.articleTitle}}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">{{article.articleDate | dateformat('lll')}}</v-card-subtitle>
          <v-card-text class="text--primary">{{article.articleAbstract}}</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="orange"
              text>
              阅读全文</v-btn>       
            <v-spacer></v-spacer>
            <v-chip style="padding:15px">
                <v-icon left>mdi-calendar-clock</v-icon>
              {{article.articleDate | dateformat}}
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-hover>
    </div>
    <v-container v-if="articles==null||articles==''">
      <v-skeleton-loader
        v-for="n in 2" :key="n"
        height="350"
        style="margin:18px"
        type="card-avatar, article"
      >
      </v-skeleton-loader>
    </v-container>
    <v-pagination
      @input="handleCurrentChange(page)"
      v-model="page"
      :length="total">
    </v-pagination>
    <v-snackbar
      :timeout="-1"
      :value="snackbar"
      color="blue-grey"
      rounded="pill"
      top
    >
      找不到文章
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false;loadArticles();$store.state.search=''"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'Articles',
    data () {
      return {
        articles: [],
        pageSize: 4,
        total: 0,
        page:1,
        snackbar: false
      }
    },
    mounted () {
      if(this.$store.state.search!=''||this.$store.state.search!=null){
        this.loadsearch()
      }else{
        this.loadArticles()
      }
    },
    watch: {
      '$store.state.search'() {
        this.loadsearch()
      }
    },
    methods: {
      loadArticles () {
        this.axios.get('/api/article/' + this.pageSize + '/1').then(resp => {
          if (resp && resp.data.code === 200) {
            this.articles = resp.data.result.content
            this.total = resp.data.result.totalPages
          }
        })
      },
      handleCurrentChange (page) {
        this.axios.get('/api/article/' + this.pageSize + '/' + page).then(resp => {
          if (resp && resp.data.code === 200) {
            this.articles = resp.data.result.content
            this.total = resp.data.result.totalPages
          }
        })
      },
      loadsearch () {
        this.articles = []
        if(this.$store.state.search != ""){
          this.axios.post('/api/findarticle',{keyword:this.$store.state.search}).then(resp => {
            if (resp && resp.data.code === 200) {
              if(resp.data.result==''||resp.data.result==null){
                this.snackbar=true
              }else{
                this.articles = resp.data.result
                this.total = 1
                this.snackbar=false
              }
            }
          })
        }else{
          this.loadArticles()
        }
      },
      GoToArticle (article) {
        this.$store.commit('set_article',article);
        this.$router.push({path:'article',query:{id: article.id}})
      }
    }
  }
</script>

<style scoped>

  .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

</style>
