<template>
  <!-- ignore side panel -->
  <main class="page">
    <!-- update the header -->
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/data-usage">Data usage</RouterLink>
          <RouterLink to="/asset-management">Asset management</RouterLink>
          <RouterLink to="/activity-log">Activity log</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />

    <!-- add the footer from design -->
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'

// Remove this. It's just a demo of how to load the content from mock api. See /public dir
onMounted(async () => {
  const url = import.meta.env.BASE_URL

  const response = await fetch(url + 'api/activity-log.json')
  const itemsDemo = await response.json()
  console.log({ itemsDemo })
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
