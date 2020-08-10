<template>
  <el-upload
    ref="upload"
    action="/api/admin/content/upload"
    with-credentials
    accept="image/*"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    drag
    :headers="myHeaders"
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList">
  <i class="el-icon-upload"></i>
  <div>将文件拖到此处，或<em>点击上传</em></div>
  <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
  var token = "Bearer " + localStorage.getItem('token')
  export default {
    name: 'ImgUpload',
    data () {
      return {
        fileList: [],
        url: '',
        myHeaders: {Authorization: token}
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
        // 此处的 file 是整个文件
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      // eslint-disable-next-line no-unused-vars
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess (response) {
        this.url = response.result
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
