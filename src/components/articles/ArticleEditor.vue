<template>
  <div>
    <el-card style="margin: 10px">
    <el-row type="flex">
      <el-input
        style="margin:0px 10px 10px 0px"
        v-model="article.articleTitle"
        placeholder="请输入标题">
      </el-input>
      <el-date-picker
        style="margin:0px 10px 10px 0px"
        v-model="article.articleDate"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
      <el-button
        style="margin:0px 0px 10px 0px"
        @click="dialogVisible = true">
        摘要/封面
      </el-button>
    </el-row>
    <el-row style="height: calc(100vh - 140px);">
      <v-md-editor
        v-model="article.articleContentMd"
        :disabled-menus="[]"
        left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | emoji save"
        style="height: 100%"
        @upload-image="handleUploadImage"
        @save="saveArticles">
      </v-md-editor>

      <el-dialog
        :visible.sync="dialogVisible"
        width=420px>
        <el-divider content-position="left">摘要</el-divider>
        <el-input
          type="textarea"
          v-model="article.articleAbstract"
          rows="6"
          maxlength="255"
          show-word-limit></el-input>
        <el-divider content-position="left">封面</el-divider>
        <div style="margin-top: 20px">
          <el-input v-model="article.articleCover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin: 10px"></img-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
    </el-card>
  </div>
</template>

<script>
  import ImgUpload from './ImgUpload'
  export default {
    name: 'Editor',
    components: {ImgUpload},
    data () {
      return {
        article: {},
        dialogVisible: false,
      }
    },
    mounted () {
      if (this.$route.params.article) {
        this.article = this.$route.params.article
      }
    },
    methods: {
      saveArticles (value,html) {
        if (this.article.articleDate == null || this.article.articleAbstract == '') {
          this.article.articleDate = new Date();
        }
        if(this.article.articleAbstract == null || this.article.articleAbstract == '')
          this.article.articleAbstract = html.replace(/<[^>]*>|/g,"").substring(0,250)
        // value 是 md
        this.$confirm('是否保存并发布文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.axios
              .post('/api/admin/content/article', {
                id: this.article.id,
                articleTitle: this.article.articleTitle,
                articleContentMd: value,
                articleAbstract: this.article.articleAbstract,
                articleCover: this.article.articleCover,
                articleDate: this.article.articleDate
              }).then(resp => {
              if (resp && resp.data.code === 200) {
                this.$message({
                  type: 'info',
                  message: '已保存成功'
                })
              }
            })
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
      },
      async handleUploadImage(event, insertImage, files) {
        event.preventDefault();//取消默认行为
        //创建 formData 对象
        let formData = new FormData();
        // 向 formData 对象中添加文件
        formData.append('file',files[0]);
        var fileurl = ''
        await this.axios.post('/api/admin/content/upload',formData).then(resp => {
          if (resp && resp.data.code === 200) {
            fileurl = resp.data.result;
          }
        })
        insertImage({
          url:fileurl,
          desc: 'p',
        });
      },
      uploadImg () {
        this.article.articleCover = this.$refs.imgUpload.url
      }
    }
  }
</script>
