<script lang="ts">
  import Icon from './Icon.svelte';
  import {play, record, voiceStore} from './stores/voice-store';

  let counter = 0;
  let duration = 0;
  $: recording = $voiceStore.recording;
  $: playing = $voiceStore.playing
</script>

<section class="flex justify-between">
  <nav>
    {recording}
    <ul class="flex items-center justify-center">
      <li class="hover:bg-teal-300 px-2 py-2 rounded-md w-10 h-10" on:click={play}>
        {#if playing}
          <Icon name="stop" />
        {:else}
          <Icon name="play" />
        {/if}
      </li>
      <li class=" {recording
        ? 'bg-red-500 bg-opacity-10'
        : 'hover:bg-teal-300'} px-2 py-2 rounded-md w-10 h-10" on:click={record}>
        <Icon name="record"  fill={recording ? "red" : "black"} />
      </li>
      <li class=" hover:bg-teal-300 px-2 py-2 rounded-md w-10 h-10">
        <Icon name="save" />
      </li>
      <li class="hover:bg-teal-300 px-2 py-1.5 rounded-md w-11 h-10">
        <Icon name="folder" />
      </li>
    </ul>
  </nav>
  <div class="text-black text-center px-2 py-2 mt-2 text-2xl">
    {counter} of
    <span class={recording ? 'text-red-400' : ''}>{duration} seconds</span>
  </div>
</section>
