<script lang="ts" setup>
defineProps<{ hide?: boolean }>();
</script>

<template>
  <div id="player-wrap">
    <div id="player-wrap-slot">
      <slot />
    </div>
    <template v-if="!hide">
      <layout-player />
    </template>
  </div>
</template>

<style>
* {
  --player-height: 4rem;
}

div#player-wrap:has(#player) > div#player-wrap-slot {
  margin-bottom: var(--sidebar-height, 0px);
  height: calc(100% - var(--sidebar-height, 0px));
}
</style>
