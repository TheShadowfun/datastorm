<script>
    import '$lib/styles.css';
    let goo = {thing: "stuff", other: "things"}
    let asi = $state([1,2,3]);
</script>

{#each Object.entries(goo) as [key, value]}
    <p>{key} : {value}</p>
{/each}

{#each asi as a}
    <p>number {a}</p>
{/each}

<h1>Welcome to </h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
