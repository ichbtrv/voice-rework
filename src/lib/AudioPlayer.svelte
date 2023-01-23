<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { play, voiceStore } from './stores/voice-store';
  import AudioAnalyzer from './utils/AudioAnalyzer';
  import AudioVisualizer from './AudioVisualizer.svelte';

  $: audio_src = $voiceStore.audio_src;
  $: playing = $voiceStore.playing;

  let audio: HTMLAudioElement;
  let analyser;
  let spectrum = [];
  let instructionsShown = false;

  const handlePlay = () => {
    play();
    instructionsShown = true;
    analyser.stop;
  };

  $: {
    if (audio && playing) {
      if (!analyser) {
        analyser = new AudioAnalyzer(audio);
      }
      audio.play();
      analyser.connect();
      analyser.process();
    }
  }

  $: {
    if (analyser) {
      analyser.store.subscribe((volume) => {
        spectrum = volume;
      });
    }
  }
</script>

<section class="flex flex-col justify-center">
  {#if audio_src}
    <AudioVisualizer {spectrum} />
    <div class="mx-auto">
      <audio
        on:play={analyser.process}
        on:pause={handlePlay}
        bind:this={audio}
        src={audio_src}
      />
    </div>
    <section class ="flex flex-col justify-center items-center" hidden={playing || instructionsShown}>
      <div
        class="text-4xl mx-4  
        {!playing ? 'mt-48' : ''}"
      >
        Press the Play Icon to hear the recording.
      </div>
      <div class="text-2xl mx-4">
        Click the Floppy Disk Icon to save
      </div>
      <div class="text-2xl mx-4">
        Click the Trash Can to delete
      </div>
    </section>
  {:else}
    <div class="text-4xl mx-4 mt-48">
      Press the Microphone Icon to Start Recording.
    </div>
  {/if}
</section>
