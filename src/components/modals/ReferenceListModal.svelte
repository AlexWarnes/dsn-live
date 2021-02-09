<script lang="ts">
  import {
    Icon,
    ComposedModal,
    ModalHeader,
    ModalBody,
    Link,
    ModalFooter,
    Button,
  } from "carbon-components-svelte";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
  import type { Source } from "../../data/Models";

  // Inputs
  export let references: Source[] = [];
  export let open = false;
  export let closeFn = null;
</script>

<ComposedModal selectorPrimaryFocus={null} {open} on:close={() => closeFn()}>
  <ModalHeader title="References" />
  <ModalBody>
    {#each references as ref}
      <div class="ref-row">
        <Link href={ref.url}
          >{ref.title}
          <Icon style="margin: 0 0 0 5px" render={Launch16} /></Link
        >
      </div>
    {/each}
  </ModalBody>
  <ModalFooter>
    <Button kind="tertiary" on:click={() => closeFn()}>Close</Button>
  </ModalFooter>
</ComposedModal>

<style>
  .ref-row {
    margin: 10px 5px;
  }

  /* .ref-row :global(a) {
    display: flex;
    align-items: center;
  } */
</style>
