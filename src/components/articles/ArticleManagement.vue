<template>
  <div style="margin:16px auto;max-width:1000px;">
    <v-card style="margin:10px;">
    <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">题目</th>
              <th class="text-left">发布日期</th>
              <th class="text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in articles" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.articleTitle }}</td>
              <td>{{ item.articleDate | dateformat('lll')}}</td>
              <td>
                  <v-btn
                    @click.native.prevent="viewArticle(item.id)"
                    style="margin:8px"
                    type="text">
                    查看
                  </v-btn>
                  <v-btn
                    @click.native.prevent="editArticle(item)"
                    style="margin:8px"
                    type="text">
                    编辑
                  </v-btn>
                  <v-btn
                    @click.native.prevent="deletearticle = item.id;dialog = true"
                    style="margin:8px"
                    type="text">
                    移除
                  </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-container v-if="articles==null||articles==''">
        <v-skeleton-loader
          v-for="n in 6" :key="n"
          height="94"
          type="list-item-two-line"
        >
        </v-skeleton-loader>
      </v-container>
    </v-card>

    <v-pagination
      @input="handleCurrentChange(page)"
      v-model="page"
      :length="total">
    </v-pagination>
    
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">确认删除?</v-card-title>
        <v-card-text>
          一旦进行此操作则无法撤销，请确认是否删除。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false;deletearticle = 0"
          >
            取消
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false;deleteArticle(deletearticle)"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
    >
      删除成功！
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
  export default {
    name: 'ArticleManagement',
    data () {
      return {
        articles: [],
        pageSize: 10,
        total: 0,
        dialog: false,
        deletearticle: 0,
        page:1,
        snackbar: false
      }
    },
    mounted () {
      this.loadArticles()
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
      viewArticle (id) {
        let articleUrl = this.$router.resolve(
          {
            path: '/article',
            query: {
              id: id
            }
          }
        )
        window.open(articleUrl.href, '_blank')
      },
      editArticle (article) {
        this.$router.push(
          {
            name: 'ArticleEditor',
            params: {
              article: article
            }
          }
        )
      },
      deleteArticle (id) {
        this.axios
          .delete('/api/admin/content/article/' + id).then(resp => {
          if (resp && resp.data.code === 200) {
            this.loadArticles()
            this.snackbar = true
          }
        })
      }
    }
  }
</script>

<style scoped>
  .add-link {
    margin: 18px 0 15px 10px;
    float: left;
  }
</style>
