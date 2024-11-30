<script>
    let dateObject2 = {
        paevLogic: 'lt',
        paevInclude: false,
        paev: '23',
        kuuLogic: 'eq',
        kuuInclude: false,
        kuu: '7',
        aastaLogic: 'lt',
        aastaInclude: false,
        aasta: '2024'}
</script>

<h1>soovin<select bind:value={dateObject2.aastaLogic} class="bg-transparent border-none text-blue-400 w-38 p-3">
    <option value="eq">ainult</option>
    <option value="lt">varasema kui</option>
    <option value="gt">hilisema kui</option>
</select>
<input type="number" 
    bind:value={dateObject2.aasta} 
    min="1980" 
    max="2024" 
    class="bg-transparent border-none text-green-400 p-1"/>aasta 
<span class="opacity-50 {dateObject2.aastaLogic != 'eq' ? '' : 'hidden'}">(kaasaarvatud<input type="checkbox" bind:checked={dateObject2.aastaInclude} class="opacity-50 rounded-md w-3 h-3"/>)</span> , {dateObject2.kuuLogic != 'eq' && dateObject2.aastaLogic != 'eq' ? 'iga' : ''} 
<select bind:value={dateObject2.kuuLogic} class="bg-transparent border-none text-blue-400  w-38 p-3">
<option value="eq">ainult</option>
<option value="lt">esimese</option>
<option value="gt">viimase</option>
</select> <input type="number" bind:value={dateObject2.kuu} min="1" max="12" class="bg-transparent border-none text-green-400 p-1"/> kuu
<span class="opacity-50 {dateObject2.kuuLogic != 'eq' ? '' : 'hidden'}">(kaasaarvatud<input type="checkbox" bind:checked={dateObject2.kuuInclude} class="opacity-50 rounded-md w-3 h-3"/>)</span>, {dateObject2.paevLogic != 'eq' && dateObject2.kuuLogic != 'eq' ? 'iga' : ''} 
<select bind:value={dateObject2.paevLogic} class="bg-transparent border-none text-blue-400  w-38 p-3">
    <option value="eq">ainult</option>
    <option value="lt">esimese</option>
    <option value="gt">viimase</option>
</select>
<input type="number" bind:value={dateObject2.paev} min="1" max="31" class="bg-transparent border-none text-green-400 p-1"/> päeva
<span class="opacity-50 {dateObject2.paevLogic != 'eq' ? '' : 'hidden'}">(kaasaarvatud<input type="checkbox" bind:checked={dateObject2.paevInclude} class="opacity-50 rounded-md w-3 h-3"/>)</span> andmeid</h1>

<!-- <p>aasta:{dateObject2.aastaLogic}{dateObject2.aastaInclude && dateObject2.aastaLogic != 'eq' ? 'e' : ''}{dateObject2.aasta}</p> -->