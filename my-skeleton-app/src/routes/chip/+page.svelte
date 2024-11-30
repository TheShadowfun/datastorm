<script>
    let dateObject = {
        paevLogic: '',
        paevInclude: false,
        paev: '',
        kuuLogic: '',
        kuuInclude: false,
        kuu: '',
        aastaLogic: '',
        aastaInclude: false,
        aasta: ''}
</script>

<h1>soovin<select bind:value={dateObject.aastaLogic} class="bg-transparent border-none text-blue-400">
    <option value="eq">ainult</option>
    <option value="lt">varasema kui</option>
    <option value="gt">hilisema kui kui</option>
</select>
<input type="number" 
    bind:value={dateObject.aasta} 
    min="1980" 
    max="2024" 
    class="bg-transparent border-none text-green-400"/>.aasta 
(kaasaarvatud<input type="checkbox" bind:checked={dateObject.aastaInclude} class="opacity-50 rounded-md"/>) , [iga(juhul kui kuu valikus on valitud esimese või viimase)] 
<select bind:value={dateObject.kuuLogic} class="bg-transparent border-none text-blue-400">
<option value="eq">ainult</option>
<option value="lt">esimese</option>
<option value="gt">viimase</option>
</select> <input type="number" bind:value={dateObject.kuu} min="1" max="12" class="bg-transparent border-none text-green-400"/> kuu
(kaasaarvatud<input type="checkbox" bind:checked={dateObject.kuuInclude} class="opacity-50 rounded-md"/>), [iga(juhul kui päeva valikus on valitud esimene või viimane)]
<select bind:value={dateObject.paevLogic} class="bg-transparent border-none text-blue-400">
    <option value="eq">ainult</option>
    <option value="lt">esimese</option>
    <option value="gt">viimase</option>
</select>
<input type="number" bind:value={dateObject.paev} min="1" max="31" class="bg-transparent border-none text-green-400"/> päeva
(kaasaarvatud<input type="checkbox" bind:checked={dateObject.paevInclude} class="opacity-50 rounded-md"/>) andmeid</h1>

<br>
<p>aasta:{dateObject.aastaLogic}{dateObject.aastaInclude && dateObject.aastaLogic != 'eq' ? 'e' : ''}{dateObject.aasta}</p>
<p>kuu:{dateObject.kuuLogic}{dateObject.kuuInclude && dateObject.kuuLogic != 'eq' ? 'e' : ''}{dateObject.kuu}</p>
<p> paev:{dateObject.paevLogic}{dateObject.paevInclude && dateObject.paevLogic != 'eq' ? 'e' : ''}{dateObject.paev}</p>
