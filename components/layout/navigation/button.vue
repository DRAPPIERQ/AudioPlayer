<script lang="ts" setup>
  const props = defineProps({
    item: {
      type: Object as PropType<NavigationItem>,
      required: true,
    },
  });
  const { item } = toRefs<{
    item: NavigationItem;
  }>(props);

  const emits = defineEmits<{
    (e: 'click', item: NavigationItem): void;
    (e: Enum_NAVIGATION): void;
  }>();

  // get route
  const route = useRoute();

  const isActive: ComputedRef<boolean> = computed(
    () =>
      item.value.is_active ||
      (item.value.path !== '/' &&
        item.value.path != undefined &&
        route.path.startsWith(item.value.path))
  );

  const emit = () => {
    emits('click', item.value);
    if (!item.value.path) {
      emits(item.value.slug);
    }
  };
</script>

<template>
  <nuxt-link
    id="navigation-item"
    :key="item.slug"
    :to="item.path"
    @click="emit"
    :class="{
      'router-link-active': isActive,
    }"
  >
    <layout-navigation-icon :slug="item.slug" />
    <span>{{ item.name }}</span>
  </nuxt-link>
</template>

<style lang="css" scoped>
  #sidebar.close #navigation-item span {
    @apply hidden;
  }

  #header-menu #navigation-item,
  #sidebar #navigation-item {
    @apply w-full px-2 py-1.5 rounded-md;
    @apply bg-gradient-to-l from-transparent from-50% to-gray-100 to-50%;
    @apply bg-200% bg-right;
    @apply transition-[background-position] duration-300 ease-in-out;
    @apply cursor-pointer;
    @apply flex flex-row items-center justify-start space-x-3;
  }

  #sidebar #navigation-item {
    @apply delay-150;
  }

  #sidebar.close #navigation-item {
    @apply flex flex-row items-center justify-start space-x-3;
  }

  #header-menu #navigation-item:hover,
  #sidebar #navigation-item:hover {
    @apply bg-left;
  }
  #header-menu #navigation-item.router-link-active,
  #sidebar #navigation-item.router-link-active {
    @apply bg-left text-primary-700;
  }
</style>
