<script lang="ts">
  import AudioPlayer from './lib/AudioPlayer.svelte';
  import AudioNote from './lib/AudioNote.svelte';
  import Navbar from './lib/Navbar.svelte';
  import Modal from './lib/Modal.svelte';
  import Notes from './lib/Notes.svelte';
  import { recorder } from'./lib/utils/recorder';
  import { onMount } from 'svelte';
  import { voiceStore } from './lib/stores/voice-store';

  let noteView = false;
  let modalVisible = false;

  $: recording = $voiceStore.recording;
  $: recordingStarted = false;
  
  onMount(async() => {
    await recorder();
  })

  $: if(recording) {
    recordingStarted = true;
    document.dispatchEvent(new CustomEvent('recording:start'));
  }

  $: if(!recording && recordingStarted) {
    document.dispatchEvent(new CustomEvent('recording:stop'));
    recordingStarted = false;
  }
</script>

<main class="flex flex-col justify-center w-[100vw] p-4">
  {#if !noteView}
    <Navbar bind:noteView bind:modalVisible />
    <section class="flex flex-col flex-1 items-center w-[100vw]">
      <AudioPlayer />
    </section>
    <section>
      <AudioNote />
      <Modal bind:modalVisible />
    </section>
  {:else}
    <Notes bind:noteView />
  {/if}
</main>
