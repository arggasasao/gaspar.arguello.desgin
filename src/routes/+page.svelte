<script>
  export let data;
  const resume = data;
  // const userLang = navigator.language || navigator.userLanguage;
  // const userLang = navigator.language || navigator.userLanguage;
  const mainMenu = {
    es: [
      { item: "Holla", hover: "About" },
      { item: "Yo soy", hover: "Work" },
      { item: "Gaspar", hover: "contact" },
    ],
    en: [
      { item: "Hello", hover: "About", link:"about" },
      { item: "I am", hover: "Works", link: "projects"},
      { item: "Gaspar", hover: "Contact", link:"contact" },
    ],
    pt: [
      { item: "Olá", hover: "Sobre" },
      { item: "Eu sou", hover: "Jobs" },
      { item: "Gaspar", hover: "Contato" },
    ],
  };
  // console.log(navigator);
  console.log("resume:",resume);
  const goPage = (pageName) => {
    console.log("go page", pageName);
  };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div lang="en-EN" class="menuHome">
  {#each mainMenu.en as menuItem}
    <a class="menuItem" href={menuItem.link}>
      <span class="menuItemUp">{menuItem.item}</span>
      <span class="menuItemHover">{menuItem.hover}</span>
    </a>
  {/each}
</div>

<!-- <div lang="es-ES">
  {#each mainMenu.es as menuItem}
    <div>{menuItem.item}</div>
  {/each}
</div>
<div lang="pt-BR">
  {#each mainMenu.pt as menuItem}
    <div>{menuItem.item}</div>
  {/each}
</div> -->
<style>

</style>
