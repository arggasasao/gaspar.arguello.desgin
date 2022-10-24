<script>
  export let data;
  const { products } = data
  console.log(data)
</script>

<div>
  <h2>title </h2>
  <p>guide body</p>
  {#each products as product}
    <p>{product.title}</p>
  {/each}
  <p>{products}</p>
</div>
