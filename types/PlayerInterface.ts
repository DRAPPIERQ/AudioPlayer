export interface PlayerStoreInterface {
  currentTrackIndex: number | null;
  trackHistoric: TrackInterface[];
  listnerPlayingTrackUpdate: Map<
    string,
    ReturnType<typeof createEventHook<TrackInterface>>
  >;
  listnerPlayingTrackEnded: Map<
    string,
    ReturnType<typeof createEventHook<TrackInterface>>
  >;
}

export interface TrackInterface {
  id: number;
  title: string;
  album_title?: string | null;
  artist_name?: string | null;
  cover?: string;
  url: string;
}

export enum WaveSurferEvents {
  AUDIOPROCESS = 'audioprocess', // [currentTime: number];
  CLICK = 'click', // [relativeX: number, relativeY: number];
  DBLCLICK = 'dblclick', // [relativeX: number, relativeY: number];
  DECODE = 'decode', // [duration: number];
  DESTROY = 'destroy', // [];
  DRAG = 'drag', // [relativeX: number];
  DRAGEND = 'dragend', // [relativeX: number];
  DRAGSTART = 'dragstart', // [relativeX: number];
  ERROR = 'error', // [error: Error];
  FINISH = 'finish', // [];
  INIT = 'init', // [];
  INTERACTION = 'interaction', // [newTime: number];
  LOAD = 'load', // [url: string];
  LOADING = 'loading', // [percent: number];
  PAUSE = 'pause', // [];
  PLAY = 'play', // [];
  READY = 'ready', // [duration: number];
  REDRAW = 'redraw', // [];
  REDRAWCOMPLETE = 'redrawcomplete', // [];
  SCROLL = 'scroll', // [visibleStartTime: number, visibleEndTime: number];
  SEEKING = 'seeking', // [currentTime: number];
  TIMEUPDATE = 'timeupdate', // [currentTime: number];
  ZOOM = 'zoom', //  [minPxPerSec: number];
}

export type Enum_WaveSurferEvents = WaveSurferEvents;
