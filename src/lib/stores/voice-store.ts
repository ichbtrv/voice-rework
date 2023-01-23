import { writable } from "svelte/store";
import type { Note } from "../../types/note";

export const voiceStore = writable<Note>({
  audio_src: '',
  playing: false,
  recording: false,
  stopped : true,
  counter : 0,
  interval: null,
  duration : 0,
  modalVisible : false,
  notesVisible : false
})

export const play = () => {
  voiceStore.update(vs => {return {...vs, playing: !vs.playing, stopped: !vs.stopped}})
}

export const record = () => {
  voiceStore.update(vs => {return {...vs, recording: !vs.recording}});
}