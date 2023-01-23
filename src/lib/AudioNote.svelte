<script lang="ts">
  import { note } from "./stores/note";

  $: noteContent = $note;
</script>

<section class="mt-8 flex justify-center">
  <p
    class="text-center text-teal-300 text-2xl mt-2 p-2 word-wrap max-w-[50vw]"
    bind:textContent={noteContent}
    contenteditable
  />
</section>
