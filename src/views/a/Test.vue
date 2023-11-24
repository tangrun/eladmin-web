<template>
  <el-row>
    <el-row>
      <el-upload
        ref="upload"
        v-model="list"
        :file-list.sync="list"
        :action="action"
        :before-upload="beforeUpload"
        :auto-upload="true"
        :headers="headers"
        :on-success="handleSuccess"
        :on-error="handleError"
        :show-file-list="true"
        list-type="text"
        :on-change="onChange"
        :accept="mimetypeAllDoc()"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-row>
      <el-button size="small" type="primary" @click="submit">提交</el-button>
    </el-row>
  </el-row>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { mimetypeAllDoc } from '@/utils'

export default {
  name: 'Test',
  mounted: {
    ...mapGetters([
      'baseApi'
    ])
  },
  data() {
    return {
      list: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        id: 662841
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        id: 662841444
      }],
      action: this.$store.getters.baseApi + '/api/projectPlan/upload',
      headers: { 'Authorization': getToken() }
    }
  },
  methods: {
    mimetypeAllDoc,
    submit() {
      console.log('submit', this.list, this.$refs.upload.uploadFiles)
      this.$refs.upload.submit()
    },
    beforeUpload(file) {
      console.log('beforeUpload', file)
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      return isLt2M
    },
    onChange(file, fileList) {
      console.log('onchange', file, fileList, this.list)
    },
    resetBindData(file, fileList) {
      console.log('resetBindData', fileList)
      this.$emit('input', fileList)
      this.$emit('update:raws', fileList.map(value => value.raw))
    },
    handleSuccess(response, file, fileList) {
      console.log('handleSuccess', response, file, fileList)
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      console.log('handleError', e, file, fileList)
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
    }
  }
}
</script>

<style scoped>

</style>
