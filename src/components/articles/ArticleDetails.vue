<template>
<div>
  <v-navigation-drawer
    style="z-index:2;padding-top: 120px;position: fixed;"
    absolute
    expand-on-hover
    hide-overlay
    permanent
    right>
    <v-list dense nav>
      <v-list-item
        v-for="anchor in titles"
        :key="anchor.title"
        @click="handleAnchorClick(anchor)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ anchor.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <div style="margin:16px auto;max-width:900px;">
    <v-card style="margin: 10px;">
      <v-img
        class="white--text align-end"
        :src="article.articleCover"
        height="200px"
        fit="cover">
        <v-card-title style="text-shadow: 2px 2px 2px #888888; font-weight: bold">{{article.articleTitle}}</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-0">{{article.articleDate | dateformat('lll')}} ——发布于 {{article.articleDate | dateformat}}</v-card-subtitle>
      <v-card-text class="text--primary">
        <v-md-editor v-model="article.articleContentMd" mode="preview" ref="editor"/>
      </v-card-text>
    <v-alert
      icon="mdi-shield-lock-outline"
      prominent
      text
      type="info"
    >
      本文采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> 协议进行许可，在您遵循此协议的情况下，可以自由共享与演绎本文章。<p/>本文链接：<a :href="theUrl">{{theUrl}}</a>
    </v-alert>
    </v-card>

    <v-card style="margin: 10px" v-if="comments!=null&&comments!=''">
      <v-card-text class="text--primary">
        <v-divider></v-divider>
        <div v-for="comment in comments" :key="comment.id">
          <div>
            <v-card-title>{{comment.commentUsername}}</v-card-title>
            <v-card-subtitle class="pb-0">{{comment.commentDate | dateformat('lll')}} ——评论于 {{comment.commentDate | dateformat}}</v-card-subtitle>
            <v-card-text style="margin: 10px" class="text--primary">
              {{comment.commentContent}}
            </v-card-text>
            <v-col v-if="$store.state.status>=2">
              <v-btn small @click="DeleteComment(comment)">删除评论</v-btn>
            </v-col>
            <v-divider></v-divider>
          </div> 
        </div>
      </v-card-text>
    </v-card>

    <v-card style="margin: 10px">
      <v-card-text class="text--primary">
        <v-text-field
          solo
          clearable
          prepend-inner-icon="mdi-account"
          label="昵称"
          v-model="newcomment.commentUsername"
          maxlength="20"
          counter="20"
          show-word-limit></v-text-field>
        <v-textarea
          solo
          clearable
          prepend-inner-icon="mdi-alphabetical-variant"
          maxlength="250"
          counter="250"
          label="请输入评论内容"
          v-model="newcomment.commentContent"></v-textarea>
        <v-scroll-x-transition>
        <v-btn transition="slide-x-transition" v-if="newcomment.commentUsername&&newcomment.commentContent" @click="dialog=true">
          发送评论
        </v-btn>
        </v-scroll-x-transition>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">确认要发送评论嘛?</v-card-title>
        <v-card-text>
          一旦进行此操作则无法撤销，请确认是否发送。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false;"
          >
            取消
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false;pushComment()"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
    >
      操作成功！
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

</div>
</template>

<script>
  export default {
    name: 'ArticleDetails',
    data () {
      return {
        article: [],
        comments:[],
        newcomment:{},
        dialog:false,
        snackbar:false,
        titles: [],
        theUrl: window.location.href
      }
    },
    mounted () {
      this.loadArticle();
    },
    methods: {
      loadArticle () {
        if(this.$store.state.article.id == this.$route.query.id){
          this.article = this.$store.state.article
          setTimeout(() =>{
            this.loadArticleAnchor()
          },200);
        }else{
          this.axios.get('/api/article/' + this.$route.query.id).then(resp => {
            if (resp && resp.data.code === 200) {
              this.article = resp.data.result;
              setTimeout(() =>{
                this.loadArticleAnchor()
              },200);
            }
          })
        }
        this.loadComment();
      },
      loadComment () {
        this.axios.post('/api/loadcomments', {id: this.$route.query.id}).then(resp => {
          if (resp && resp.data.code === 200) {
            this.comments = resp.data.result;
          }
        })
      },
      pushComment () {
        this.newcomment.commentArticleId = this.article.id;
        this.axios.post('/api/pushcomments', this.newcomment).then(resp => {
          if (resp && resp.data.code === 200) {
            this.loadComment();
            this.snackbar=true;
          }
        })
      },
      DeleteComment (comment) {
        this.axios.post('/api/admin/commentsdelete', comment).then(resp => {
          if (resp && resp.data.code === 200) {
            this.loadComment();
            this.snackbar=true;
          }
        })
      },
      handleAnchorClick(anchor) {
        const { editor } = this.$refs;
        const { lineIndex } = anchor;
        const heading = editor.$el.querySelector(
          `.v-md-editor-preview [data-v-md-line="${lineIndex}"]`
        );
        if (heading) {
          editor.previewScrollToTarget({
            target: heading,
            scrollContainer: window,
            top: 60,
          });
        }
      },
      loadArticleAnchor(){
        const anchors = this.$refs.editor.$el.querySelectorAll(
          '.v-md-editor-preview h1,h2,h3,h4,h5,h6'
        );
        const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
        if (!titles.length) {
          this.titles = [];
          return;
        }
        const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
        this.titles = titles.map((el) => ({
          title: el.innerText,
          lineIndex: el.getAttribute('data-v-md-line'),
          indent: hTags.indexOf(el.tagName),
        }));
      }
    }
  }
</script>

<style>
  .v-application code{
      font-weight: normal;
  }
</style>
