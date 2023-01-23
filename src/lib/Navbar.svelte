<script lang="ts">
  import Icon from './Icon.svelte';

  let counter = 0;
  let duration = 0;
  let recording = false;
</script>

<section class="flex justify-between">
  <nav>
    <ul class="flex items-center justify-center">
      <li class=" hover:bg-teal-300 px-2 py-2 rounded-md w-10 h-10">
        <Icon name="play" />
      </li>
      <li class=" hover:bg-teal-300 px-2 py-2 rounded-md w-10 h-10">
        <Icon name="record" />
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
