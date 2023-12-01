import { getToken } from '@/utils/auth'
import MimeType from '@/utils/mimetype'

export function uploadHelper() {
  return {
    data() {
      return {
        uploadHeaders: { 'Authorization': getToken() },
        mimeTypeOfAllDoc: [
          MimeType.catalog['.doc'],
          MimeType.catalog['.docx'],
          MimeType.catalog['.xls'],
          MimeType.catalog['.xlsx'],
          MimeType.catalog['.ppt'],
          MimeType.catalog['.pptx'],
          MimeType.catalog['.pdf']
        ].join(',')
      }
    },
    methods: {
      getFileListFromLocalStoreList(value) {
        console.log('getFileListFromLocalStoreList', value)
        if (value && value instanceof Array) {
          const list = value.map(item => {
            return {
              id: item.id,
              name: item.name,
              url: `/${item.type}/${item.realName}`
            }
          })
          console.log('getFileListFromLocalStoreList -', list)
          return list
        }
        return null
      },
      getUploadIdObjectList(upload) {
        console.log('getUploadIdObjectList', upload.uploadFiles)
        const ids = []
        for (const uploadFile of upload.uploadFiles) {
          if (uploadFile.raw && uploadFile.raw instanceof File) {
            ids.push({ id: uploadFile.response.id })
          } else {
            ids.push({ id: uploadFile.id })
          }
        }
        return ids
      }
    }
  }
}
