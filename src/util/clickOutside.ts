// Credit for this code: https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7

/** Dispatch event on click outside of node */
export function clickOutside(node: any) {
  const handleClick = (event: any) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent("click_outside", node));
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}
