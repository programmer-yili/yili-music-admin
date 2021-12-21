<template>
  <div class="page">
    <div class="error-code">404</div>
    <div class="tips">抱歉你访问的页面不存在！</div>
    <div class="action-area">
      <q-btn
        color="primary"
        label="返回"
        @click="
          () => {
            $router.back();
          }
        "
      />
      <q-btn
        color="primary"
        outline
        label="首页"
        @click="
          () => {
            $router.push('/');
          }
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: '404'
};
</script>

<style scoped lang="less">
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .error-code {
    font-size: 300px;
    line-height: 350px;
  }
  .tips {
    color: #999999;
    margin-bottom: 40px;
  }
  .action-area {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
