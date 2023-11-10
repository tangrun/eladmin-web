<template>
  <div>
    <div class="navbar-container">
      <router-link key="collapse" class="navbar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="navbar-logo">
        <h1 class="navbar-title">{{ title }} </h1>
      </router-link>
    </div>
    <div class="content_container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/images/logo.png'
import Config from '@/settings'

export default {
  name: 'RegistrationIndex',
  data() {
    return {
      title: Config.title,
      logo: Logo
    }
  }
}
</script>

<style lang="scss" scoped>

.navbar-container {
  padding: 0.7rem 1.5rem;
  width: 100%;
  height: 50px;
  top: 0;
  overflow: hidden;
  background: white;
  position: fixed;
  z-index: 999;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .06);

  & .navbar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    & .navbar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 6px;
    }

    & .navbar-title {
      display: inline-block;
      margin: 0;
      color: #004050;
      font-weight: 600;
      font-size: 1.3rem;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}

.content_container {
  margin-top: 50px;
  padding: 20px 20px 45px 20px;
  display: flex;
  justify-content: center;
}

</style>
