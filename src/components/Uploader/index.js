import { getToken } from '@/utils/auth'

export function uploader(upload) {
  return {
    created() {
      console.log('uploader created', upload, this.$refs[upload])
    },
    data() {
      return {
        uploadHeaders: { 'Authorization': getToken() }
      }
    },
    methods: {
      getUploadIds(upload) {
        const ids = []
        for (const uploadFile of upload.uploadFiles) {
          if (uploadFile.raw && uploadFile.raw instanceof File) {
            ids.push(uploadFile.response.id)
          } else {
            ids.push(uploadFile.id)
          }
        }
        return ids
      }
    }
  }
}
