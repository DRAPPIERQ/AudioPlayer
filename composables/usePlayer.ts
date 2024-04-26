import WaveSurfer from 'wavesurfer.js';
import type { WaveSurferOptions } from 'wavesurfer.js';

const DEFAULT_WAVE_SURFER_OPTIONS: WaveSurferOptions = {
  container: '#',
  waveColor: '#f9fafb',
  progressColor: '#d53d3a',
  height: 'auto',
  barWidth: 4,
};

export default (playerElement?: Ref<HTMLElement | null>, _key?: string) => {
  const key = _key || Math.random().toString(36).substring(7);
  const WAVE_SURFER_ID = 'WaveSurfer-' + key;

  const waveSurfer = ref<WaveSurfer | null>(null);

  const isTrackPlaying = ref<boolean>(false);
  const trackBlob = ref<Blob | null>(null);

  const playerStore = usePlayerStore();
  const currentTrack = computed(() => playerStore.currentTrack);
  const previousTrack = computed(() => playerStore.previousTrack);

  const playTrack = async (track: TrackInterface, e?: MouseEvent) => {
    playerStore.playTrack(track);
  };

  const updateIsTrackPlaying = () => {
    isTrackPlaying.value = waveSurfer.value?.isPlaying() || false;
  };

  const initWaveSurferListeners = () => {
    if (waveSurfer.value instanceof WaveSurfer) {
      waveSurfer.value.on(WaveSurferEvents.PAUSE, () => {
        updateIsTrackPlaying();
      });
      waveSurfer.value.on(WaveSurferEvents.PLAY, () => {
        updateIsTrackPlaying();
      });
      waveSurfer.value.on(WaveSurferEvents.FINISH, () => {
        updateIsTrackPlaying();
      });
      waveSurfer.value.on(WaveSurferEvents.TIMEUPDATE, () => {
        updateIsTrackPlaying();
      });
    }
  };

  const killWaveSurfer = () => {
    if (waveSurfer.value instanceof WaveSurfer) {
      waveSurfer.value.destroy();
    }
    waveSurfer.value = null;
  };

  const initWaveSurfer = async () => {
    killWaveSurfer();
    try {
      if (
        !playerElement?.value ||
        !(playerElement?.value instanceof HTMLElement)
      )
        throw new Error('Invalid playerElement');
      waveSurfer.value = WaveSurfer.create({
        ...DEFAULT_WAVE_SURFER_OPTIONS,
        container: playerElement.value,
        autoplay: true,
        dragToSeek: true,
      });
      initWaveSurferListeners();
    } catch (error) {
      console.error(error);
      killWaveSurfer();
    }
  };

  const loadAudioTrack = async (track: TrackInterface) => {
    const blob = await fetch(track.url).then((res: Response) => res.blob());
    if (blob instanceof Blob && blob.type.includes('audio')) {
      if (waveSurfer.value instanceof WaveSurfer) {
        trackBlob.value = blob;
        waveSurfer.value.empty();
        await waveSurfer.value.loadBlob(blob);
      }
    } else {
      throw new Error('Incorrect Bob');
    }
  };

  const loadAudioTrackOrFallback = async (track: TrackInterface) => {
    try {
      await loadAudioTrack(track);
    } catch (error) {
      const previous_track = playerStore.rollbackHistory();
      if (previous_track) loadAudioTrackOrFallback(previous_track);
    }
  };

  const initPlayer = () => {
    if (key && playerElement?.value instanceof HTMLElement) {
      // On playing track
      playerStore.onPlayingTrackUpdate(key, async (track: TrackInterface) => {
        if (currentTrack.value?.id != track.id) {
          playerStore.pushtTrack(track);
          // Delay to avoid multiple play
          if (!(waveSurfer.value instanceof WaveSurfer)) await initWaveSurfer();
          await loadAudioTrackOrFallback(track);
        } else {
          waveSurfer.value?.playPause();
        }
      });
    }
  };

  onMounted(initPlayer);

  const trackPlayPause = () => {
    waveSurfer.value?.playPause();
  };

  return {
    playTrack,
    currentTrack,
    isTrackPlaying,
    trackPlayPause,
    WAVE_SURFER_ID,
  };
};
