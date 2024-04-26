<script setup lang="ts">
const waveSurferRef = ref<HTMLElement | null>(null);
const { currentTrack, trackPlayPause, isTrackPlaying, WAVE_SURFER_ID } =
  usePlayer(waveSurferRef);
</script>

<template>
  <div id="player">
    <div :key="currentTrack?.id" class="flex flex-row gap-4 h-full max-w-96">
      <img
        v-if="currentTrack"
        :src="currentTrack.cover"
        class="aspect-square rounded-lg"
      />
      <div class="flex flex-col w-full py-2">
        <p
          v-if="currentTrack"
          class="text-lg line-clamp-1 text-ellipsis"
          :title="currentTrack.title"
        >
          {{ currentTrack.title }}
        </p>
        <p
          v-if="currentTrack"
          class="text-sm line-clamp-1 text-ellipsis"
          :title="currentTrack.artist_name || undefined"
        >
          {{ currentTrack.artist_name }}
        </p>
      </div>
    </div>
    <div class="flex flex-row justify-end items-center gap-4 h-full flex-1 p-2">
      <div
        class="text-primary-600 h-12 w-12 aspect-square cursor-pointer"
        @click="trackPlayPause"
      >
        <icon-outline-pause-circle
          v-if="isTrackPlaying"
          class="h-full w-full"
        />
        <icon-outline-play-circle v-else class="h-full w-full" />
      </div>
      <div
        ref="waveSurferRef"
        :id="WAVE_SURFER_ID"
        class="flex-1 h-full max-w-3xl cursor-pointer"
      />
    </div>
  </div>
</template>

<style>
#player {
  @apply fixed bottom-0 left-0 w-full;
  @apply flex flex-row items-center;
  @apply bg-secondary-950 text-white;
  @apply shadow-md;
  height: var(--player-height, 0.1px);
}
</style>
