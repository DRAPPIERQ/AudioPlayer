<script setup lang="ts">
const { currentTrack, playTrack } = usePlayer();

const items = ref<any>([]);

onMounted(async () => {
  items.value = await useDeezerApi().search('luis amstrong');
  // random item to play
  const index = Math.floor(Math.random() * items.value.length);
  if (!currentTrack.value) {
    const item = items.value[index];
    if (item)
      playTrack({
        id: item.id,
        title: item.title,
        album_title: item.album?.title,
        artist_name: item.artist?.name,
        cover: item.album?.cover_xl,
        url: item.preview,
      });
  }
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold">Explorer</h1>
      <NuxtLink to="/">Go to Home</NuxtLink>
      {{ currentTrack }}
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      <div
        v-for="item in items"
        class="relative bg-white rounded-lg shadow-lg aspect-square group overflow-scroll cursor-pointer"
        :style="{
          backgroundImage: `url(${item.album.cover_xl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
        @click="
          (e) =>
            playTrack(
              {
                id: item.id,
                title: item.title,
                album_title: item.album?.title,
                artist_name: item.artist?.name,
                cover: item.album?.cover_xl,
                url: item.preview,
              },
              e
            )
        "
      >
        <div
          class="text-white bg-black bg-opacity-50 p-2 absolute bottom-0 w-full hidden group-hover:block"
        >
          <p class="text-lg">{{ item.title }}</p>
          <p class="text-sm" v-if="item.album">{{ item.album?.title }}</p>
          <p class="text-sm" v-if="item.artist">
            {{ item.artist?.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
