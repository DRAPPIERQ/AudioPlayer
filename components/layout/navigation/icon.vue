<script lang="ts" setup>
const props = defineProps({
  slug: {
    type: String as PropType<Enum_NAVIGATION>,
    required: false,
    default: null,
  },
});
const { slug } = toRefs<{
  slug: Enum_NAVIGATION | null;
}>(props);
</script>

<template>
  <icon-outline-square-2x2
    v-if="slug === NAVIGATION.DASHBOARD"
    class="w-6 h-6 shrink-0"
  />
  <icon-outline-lifebuoy
    v-else-if="slug === NAVIGATION.HELP"
    class="w-6 h-6 shrink-0"
  />
  <icon-outline-adjustments-vertical
    v-else-if="slug === NAVIGATION.SETTINGS"
    class="w-6 h-6 shrink-0"
  />
  <icon-outline-tools
    v-else-if="slug === NAVIGATION.LOGS"
    class="w-6 h-6 shrink-0"
  />
  <icon-outline-document-text
    v-else-if="slug === NAVIGATION.NOTICES"
    class="w-6 h-6 shrink-0"
  />
  <icon-outline-arrow-left-on-rectangle
    v-else-if="slug === NAVIGATION.LOGOUT"
    class="w-6 h-6 shrink-0"
  />
  <icon-outline-user-group
    v-else-if="slug === NAVIGATION.USERS"
    class="w-6 h-6 shrink-0"
  />
  <icon-outline-bike
    v-else-if="slug === NAVIGATION.BIKES"
    class="h-6 w-6 shrink-0"
  />
  <icon-outline-building-storefront
    v-else-if="slug === NAVIGATION.SHOPS"
    class="w-6 h-6 shrink-0"
  />
</template>
