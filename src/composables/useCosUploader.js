import COS from 'cos-js-sdk-v5';
import { createUploaderComponent } from 'quasar';
import { finishUpload, initUpload } from '../api/file.js';
import { ref } from 'vue';
import md5 from 'md5';
import { useStore } from 'vuex';

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
    const fileId = ref(null);

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
            fileId.value = res.fileId;
            callback({
              TmpSecretId: res.secretId,
              TmpSecretKey: res.secretKey,
              SecurityToken: res.sessionToken,
              StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: res.expiredTime,
              ScopeLimit: true // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
            });
          });
        }
      });
    };
    const cos = initCosClient();
    const store = useStore();
    const bucket = store.getters['setting/bucket'];
    const region = store.getters['setting/region'];

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
        Bucket: bucket,
        Region: region,
        Key: md5(file.__key),
        Body: file,
        SliceSize: 1024 * 1024 * 10,

        onTaskReady(id) {
          taskId.value = id;
        },
        onProgress: function (progressData) {
          isBusy.value = false;
          isUploading.value = true;
          helpers.updateFileStatus(file, 'uploading', progressData.loaded);
        },
        onFileFinish: () => {
          finishUpload(fileId.value).then(res => {
            helpers.updateFileStatus(file, 'uploaded', file.size);
            helpers.uploadedFiles.value += 1;
            helpers.uploadedSize.value += file.size;
            uploadedFiles.value.add(file);
            console.log(res);
          });
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
