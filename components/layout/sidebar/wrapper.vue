<script lang="ts" setup>
defineProps<{ hide?: boolean }>();
</script>

<template>
  <div id="sidebar-wrap">
    <template v-if="!hide">
      <layout-sidebar />
    </template>
    <div id="sidebar-wrap-slot">
      <slot />
    </div>
  </div>
</template>

<style>
* {
  --sidebar-width: 0px;
}

@media (min-width: 640px) {
  * {
    --sidebar-width: 5rem;
  }
}

div#sidebar-wrap:has(#sidebar) > div#sidebar-wrap-slot {
  margin-left: var(--sidebar-width, 0px);
  width: calc(100% - var(--sidebar-width, 0px));
}
</style>
