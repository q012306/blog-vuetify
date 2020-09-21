<template>
  <el-upload
    ref="upload"
    action="/api/admin/content/upload"
    with-credentials
    :accept="accept"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    drag
    :headers="myHeaders"
    :limit="limit"
    :on-exceed="handleExceed"
    :file-list="fileList">
  <i class="el-icon-upload"></i>
  <div>将文件拖到此处，或<em>点击上传</em></div>
  <div slot="tip">只能上传 {{accept}} 文件</div>
  </el-upload>
</template>

<script>
  var token = "Bearer " + localStorage.getItem('token')
  export default {
    name: 'ImgUpload',
    props: {
      accept: {
        type: String,
        default: "image/*"
      },
      limit: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        url: '',
        fileList: [],
        fileListMap : {},
        myHeaders: {Authorization: token}
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
        this.axios.post('/api/admin/content/filedelete',{fileName: this.fileListMap[file.name]}).then(resp => {
            if (resp && resp.data.code === 200) {
              this.$confirm(`移除 ${file.name} 成功`)
            }
        })
      },
      handlePreview (file) {
        console.log(file)
        // 此处的 file 是整个文件
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      // eslint-disable-next-line no-unused-vars
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess (response,file) {
        // console.log(file)
        this.url = response.result
        this.fileListMap[file.name] = response.result.substring(response.result.lastIndexOf("/")+1)
        //console.log(this.fileListMap)
        this.$emit('onUpload')
        this.$message.warning('上传成功')
      },
      clear () {
        this.$refs.upload.clearFiles()
      }
    }
  }
</script>

<style scoped>

</style>
