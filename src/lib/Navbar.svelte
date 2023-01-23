<script lang="ts">
  import Icon from './Icon.svelte';
  import { clearNote, note } from './stores/note';
  import { clearAudio, play, record, voiceStore } from './stores/voice-store';
  export let modalVisible;
  export let noteView;

  $: counter = $voiceStore.counter;
  $: duration = $voiceStore.duration;
  $: recording = $voiceStore.recording;
  $: playing = $voiceStore.playing;

  const reset = () => {
    if(!$note) return;

    clearNote();
    clearAudio();
  };
</script>

<section class="flex justify-between">
  <nav>
    <ul class="flex items-center justify-center">
      <li
        class="hover:bg-teal-300 px-2 py-2 rounded-md w-10 h-10"
        on:click={play}
        on:keydown={play}
      >
        {#if playing}
          <Icon name="stop" />
        {:else}
          <Icon name="play" />
        {/if}
      </li>
      <li
        class="px-2 py-2 rounded-md w-10 h-10
        {recording ? 'bg-red-500 bg-opacity-10' : 'hover:bg-teal-300'}"
        on:click={record}
        on:keydown={record}
      >
        <Icon name="record" fill={recording ? 'red' : 'black'} />
      </li>
      <li
        class=" hover:bg-teal-300 px-2 py-2 rounded-md w-10 h-10"
        on:click={() => (modalVisible = true)}
        on:keydown={() => (modalVisible = true)}
      >
        <Icon name="save" />
      </li>
      <li
        class="hover:bg-teal-300 px-2 py-1.5 rounded-md w-11 h-10"
        on:click={() => (noteView = true)}
        on:keydown={() => (noteView = true)}
      >
        <Icon name="folder" />
      </li>
      <li
        class="hover:bg-teal-300 px-2 py-1.5 rounded-md w-11 h-10"
        on:click={reset}
        on:keydown={reset}
      >
        <Icon name="trash" />
      </li>
    </ul>
  </nav>
  <div class="text-black text-center px-2 py-2 mt-2 text-2xl">
    {counter} of
    <span class={recording ? 'text-red-400' : ''}>{duration} seconds</span>
  </div>
</section>
