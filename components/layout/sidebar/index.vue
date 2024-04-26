<script lang="ts" setup>
const sidebarElement = ref<HTMLElement | null>(null);

// const { sidebar, headerMenu, closeAllNav } = useNavigation();

// onClickOutside(sidebarElement, sidebar.value.close);

const logout = async () => {
  // await useAuthApi().logout();
  // closeAllNav();
  navigateTo('/connexion');
};
</script>

<template>
  <!-- <div ref="sidebarElement" id="sidebar" :class="{ close: !sidebar.is_open }">
    <div
      id="sidebar-toggle"
      class="group"
      :class="{ 'sm-hide': headerMenu.is_open }"
      @click="sidebar.toggle"
    >
      <icon-outline-x-mark v-if="sidebar.is_open" class="w-6 h-6 shrink-0" />
      <icon-outline-chevron-right v-else class="w-6 h-6 shrink-0" />
    </div>
    <nav>
      <layout-navigation-button
        v-for="item in sidebar.navigation"
        :key="item.slug"
        :item="item"
        @click="closeAllNav"
      />
    </nav>
    <nav class="footer">
      <layout-navigation-button
        v-for="item in sidebar.footerNavigation"
        :key="item.slug"
        :item="item"
        @click="closeAllNav"
        @logout="logout"
      />
    </nav>
  </div> -->
</template>

<style lang="css" scoped>
#sidebar {
  @apply bg-white;
  @apply flex flex-col justify-self-auto items-start;
  @apply px-8 py-4 fixed top-0 left-0;
  @apply w-screen sm:w-1/2 md:w-1/4 xl:w-1/6 2xl:w-1/12;
  @apply transition-[width,transform] duration-100 ease-in-out;
  @apply shadow-md;
  margin-top: calc(var(--header-height, 0px) - 2px);
  height: calc(100% - var(--header-height, 0px) + 2px);
}

#sidebar.close {
  width: var(--sidebar-width, 0px);
  @apply p-0 sm:left-0 sm:p-4;
}

#sidebar-toggle {
  @apply bg-white;
  @apply hidden sm:flex flex-col justify-center items-center;
  @apply absolute top-4 -right-6;
  @apply w-8 p-1.5 aspect-square;
  @apply cursor-pointer rounded-md shadow-md;
}
#sidebar.close #sidebar-toggle {
  @apply flex;
}

#sidebar.close #sidebar-toggle.sm-hide {
  @apply hidden sm:flex;
}

#sidebar-toggle svg {
  @apply w-full aspect-square;
  @apply transition-transform duration-150 ease-in-out;
}

#sidebar.close nav {
  @apply hidden sm:flex;
}
nav {
  @apply flex flex-col gap-y-4 w-full;
}
nav.footer {
  @apply mt-auto;
}
</style>
