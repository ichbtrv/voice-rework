<script lang="ts">
  import AudioPlayer from './lib/AudioPlayer.svelte';
  import AudioNote from './lib/AudioNote.svelte';
  import Navbar from './lib/Navbar.svelte';
  import Recorder from './lib/Recorder.svelte';
  import Modal from './lib/Modal.svelte';
  import Notes from './lib/Notes.svelte';

  let noteView = false;
  let modalVisible = false;
</script>

<main class="flex flex-col justify-center w-[100vw] p-4">
  {#if !noteView}
    <Navbar bind:noteView bind:modalVisible />
    <section class="flex flex-col flex-1 items-center w-[100vw]">
      <AudioPlayer />
      <Recorder />
    </section>
    <section>
      <AudioNote />
      <Modal bind:modalVisible />
    </section>
  {:else}
    <Notes bind:noteView />
  {/if}
</main>
