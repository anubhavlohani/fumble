<template>
  <div>
    <nav class="p-5 w-full md:flex md:flex-row md:items-center md:space-x-5 text-xl text-white bg-zinc-900 shadow-xl">
      <div class="flex justify-between items-center">
        <div>
          <NuxtLink to="/" class="text-3xl">Fumble</NuxtLink>
        </div>
        <div class="md:hidden" @click="toggleNavItems()">
          <i class="gg-menu"></i>
        </div>
      </div>
      <ul class="pt-4 md:pt-0 flex flex-col space-y-0.5 md:flex-row md:items-center md:space-y-0 md:space-x-5 md:opacity-100 md:static top-[-100%]" :class="{ 'opacity-0': hideNavItems, 'absolute': hideNavItems }">
        <li @click="hideNavItems=true"><NuxtLink to="/">Home</NuxtLink></li>
        <li @click="hideNavItems=true"><NuxtLink to="/profile">Profile</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const hideNavItems = ref(true)

function toggleNavItems () {
  hideNavItems.value = !hideNavItems.value
}
</script>

<style scoped>
.gg-menu {
    transform: scale(var(--ggs,1))
}
.gg-menu,
.gg-menu::after,
.gg-menu::before {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 3px;
    background: currentColor
}
.gg-menu::after,
.gg-menu::before {
    content: "";
    position: absolute;
    top: -6px
}
.gg-menu::after {
    top: 6px
}
</style>
