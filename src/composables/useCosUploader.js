import COS from 'cos-js-sdk-v5';
import { createUploaderComponent } from 'quasar';
import { initUpload } from '../api/file.js';
import { ref } from 'vue';
import md5 from 'md5';

const bucket = ref(null);
const region = ref(null);

export default createUploaderComponent({
  // defining the QUploader plugin here

  name: 'CosUploader', // your component's name

  props: {
    // ...your custom props
  },

  emits: [
    // ...your custom events name list
  ],

  injectPlugin({ props, emit, helpers }) {
    const initCosClient = () => {
      return new COS({
        getAuthorization: (options, callback) => {
          const file = helpers.queuedFiles.value[0];
          const uploadFile = {
            name: file.name.substring(0, file.name.lastIndexOf('.')),
            size: file.size,
            key: md5(file.__key),
            ext: file.name.substring(file.name.lastIndexOf('.'))
          };
          initUpload(uploadFile).then(res => {
            bucket.value = res.bucket;
            region.value = res.region;
            console.log(res.startTime / 1000);
            callback({
              TmpSecretId: res.secretId,
              TmpSecretKey: res.secretKey,
              SecurityToken: res.sessionToken,
              StartTime: parseInt(res.startTime / 1000), // 时间戳，单位秒，如：1580000000
              ExpiredTime: parseInt(res.expiredTime / 1000),
              ScopeLimit: true // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
            });
          });
        }
      });
    };
    const cos = initCosClient();

    // can call any other composables here
    // as this function will run in the component's setup()

    // [ REQUIRED! ]
    // We're working on uploading files
    const isUploading = ref(false);
    const isBusy = ref(false);
    const uploadedFiles = ref(new Set());
    const taskId = ref('');
    const abort = e => {
      console.log(e);
    };

    const upload = () => {
      // cos 上传
      uploadFiles();
      isUploading.value = false;
    };

    const uploadFiles = () => {
      let file = helpers.queuedFiles.value[0];
      cos.uploadFile({
        Bucket: bucket.value,
        Region: region.value,
        Key: file.key,
        Body: file,
        SliceSize: 1024 * 1024 * 10,

        onTaskReady(id) {
          /* 非必须 */
          taskId.value = id;
          console.log(taskId);
        },
        onProgress: function (progressData) {
          /* 非必须 */
          isBusy.value = false;
          isUploading.value = true;
          helpers.updateFileStatus(file, 'uploading', progressData.loaded);
        },
        onFileFinish: () => {
          helpers.updateFileStatus(file, 'uploaded', file.size);
          helpers.uploadedFiles.value += 1;
          helpers.uploadedSize.value += file.size;
          uploadedFiles.value.add(file);
        }
      });
    };

    return {
      isUploading,
      isBusy,

      abort,
      upload
    };
  }
});
