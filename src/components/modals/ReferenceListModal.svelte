<script lang="ts">
  import {
    Icon,
    ComposedModal,
    ModalHeader,
    ModalBody,
    Link,
    ModalFooter,
    Button,
    Tag,
  } from "carbon-components-svelte";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
  import type { Spacecraft } from "../../data/Models";

  // Inputs
  export let targetDetails: Spacecraft[] = [];
  export let open = false;
  export let closeFn = null;
</script>

<ComposedModal selectorPrimaryFocus={null} {open} on:close={() => closeFn()}>
  <ModalHeader title="References" />
  <ModalBody>
    {#each targetDetails as target (target["id"])}
      <div class="target-heading">
        <h3>{target["longName"]}</h3>
        <Tag type="cool-gray">{target["shortName"]}</Tag>
      </div>
      {#each target["sources"] as source, idx (idx)}
        <div class="source-row">
          <Link href={source.url}
            >{source.title}
            <Launch16 style="margin: 0 0 0 5px" /></Link
          >
        </div>
        {#if target["sources"].length === 0}
          <p>No sources available</p>
        {/if}
      {/each}
    {/each}
  </ModalBody>
  <ModalFooter>
    <Button kind="tertiary" on:click={() => closeFn()}>Close</Button>
  </ModalFooter>
</ComposedModal>

<style>
  .target-heading {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-wrap: wrap;
  }
  h3 {
    margin: 15px 8px 0 0;
    font-size: 1.75em;
  }
  .source-row {
    margin: 10px 5px;
  }

  /* .ref-row :global(a) {
    display: flex;
    align-items: center;
  } */
</style>
