<template>
  <div id="app">
    <keep-alive :exclude="['ArticleDetail', 'Login', 'Search', 'SearchResult','User']">
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
