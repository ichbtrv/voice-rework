<script lang="ts">
  export let name: string;
</script>

<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="folder" width="28"height="28" viewBox="0 0 24 24">
    <path d="M6.083 4c1.38 1.612 2.578 3 4.917 3h11v13h-20v-16h4.083zm.917-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3z"/>
  </symbol>

  <symbol id="save" width="24" height="24" viewBox="0 0 24 24">
    <path d="M13 3h2.996v5h-2.996v-5zm11 1v20h-24v-24h20l4 4zm-17 5h10v-7h-10v7zm15-4.171l-2.828-2.829h-.172v9h-14v-9h-3v20h20v-17.171z"/>
  </symbol>

  <symbol id="play-button" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
  </symbol>
  <use href="#{name}"/>
</svg>