import Home from "./components/views/Home.svelte";
import Dashboard from "./components/views/Dashboard.svelte";
import About from "./components/views/About.svelte";

export default {
  "/": Home,
  "/dashboard": Dashboard,
  "/about": About,
  "*": Home, // TODO: 404 not found
};
