import { get, writable } from "svelte/store";
import type { Note } from "../../types/note";

let timer; //Timer for total duration
let counter; //Timer for play counter

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

function durationStart() {
  timer = setInterval(() => voiceStore.update(v =>  {return {...v, duration: ++v.duration}}), 1000);
}

function clearTimers(timerToClear) {
  clearInterval(timerToClear);
}

const playStart = () => {
  counter = setInterval(() => voiceStore.update(v =>  {return {...v, counter: ++v.counter}}), 1000);
}


export const play = () => {
  const v = get(voiceStore);

  if(v.playing) {
    document.dispatchEvent(new CustomEvent('pause'));
    clearTimers(counter);
    voiceStore.update(vs => {return {...vs, counter: 0}})

  }
  else playStart(); 
  voiceStore.update(vs => {return {...vs, playing: !vs.playing, stopped: !vs.stopped}})
}

export const record = () => {
  if(!get(voiceStore).recording) durationStart();
  else clearTimers(timer);
  voiceStore.update(vs => {return {...vs, recording: !vs.recording}});
}