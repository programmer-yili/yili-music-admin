import notify from '../utils/notify.js';

export const useCreate = (createModel, createApi, hideDialog, emmit) => {
  const create = () => {
    createApi(createModel.value).then(() => {
      hideDialog();
      notify.success('创建成功！');
      emmit('create-success');
    });
  };
  return {
    create
  };
};
