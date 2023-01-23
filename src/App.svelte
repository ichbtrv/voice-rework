<script lang="ts">
    import AudioPlayer from "./lib/AudioPlayer.svelte";
    import AudioNote from "./lib/AudioNote.svelte";
    import Navbar from "./lib/Navbar.svelte";
    import Recorder from "./lib/Recorder.svelte";
 let count = 1;
</script>

<main class="flex flex-col justify-center w-[100vw]">
  <Navbar/>
  <section class="flex flex-col flex-1 items-center w-[100vw]">
    <AudioPlayer on:stop />
    <Recorder />
  </section>
  <section>
    <AudioNote />
  </section>
</main>

