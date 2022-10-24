<script>
  import "$lib/css/main.css";
  import "$lib/css/fonts/fonts.css";
</script>

<svelte:head>
  <title>Projects</title>
</svelte:head>
<ul class="menuMain">
  <li><a href="/">Home</a></li>
  <li><a href="/about" data-sveltekit-prefetch>About</a></li>
  <li><a href="/projects" data-sveltekit-prefetch>Projects</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>

<slot />

<style>
  ul li {
    display: inline-block;
  }
</style>
