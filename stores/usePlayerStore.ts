import type { TrackInterface } from '~/types/PlayerInterface';

const usePlayerStore = defineStore({
  id: 'player',
  state: (): PlayerStoreInterface => ({
    currentTrackIndex: null,
    trackHistoric: [],
    listnerPlayingTrackUpdate: new Map<
      string,
      ReturnType<typeof createEventHook<TrackInterface>>
    >(),
  }),
  getters: {
    previousTrack: (state: PlayerStoreInterface) =>
      state.trackHistoric[(state.currentTrackIndex || 0) - 1],
    currentTrack: (state: PlayerStoreInterface) =>
      state.trackHistoric[state.currentTrackIndex || 0],
    getTrackHistory: (state: PlayerStoreInterface) => state.trackHistoric,
  },
  actions: {
    rollbackHistory() {
      this.trackHistoric.pop();
      this.currentTrackIndex = this.trackHistoric.length - 1;
      return this.currentTrack;
    },
    pushtTrack(track: TrackInterface) {
      this.trackHistoric.push(track);
      this.currentTrackIndex = this.trackHistoric.length - 1;
    },
    playTrack(track: TrackInterface) {
      [...this.listnerPlayingTrackUpdate.values()].forEach(async (listner) => {
        await listner.trigger(track);
      });
    },
    onPlayingTrackUpdate(
      key: string,
      handler: (track: TrackInterface) => void
    ) {
      if (!this.listnerPlayingTrackUpdate.has(key))
        this.listnerPlayingTrackUpdate.set(
          key,
          createEventHook<TrackInterface>()
        );
      this.listnerPlayingTrackUpdate.get(key)?.on(handler);
    },
  },
  persist: true,
});

export default usePlayerStore;
