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
        aasta: '2024'
    }
</script>

<div class="mt-8 max-w-2xl">
    <label class="block text-lg font-medium text-gray-700 mb-2">
        Vali soovitud ajavahemik
    </label>
    <div class="space-y-3">
        <!-- Year row -->
        <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-300">
            <select bind:value={dateObject2.aastaLogic} class="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-blue-500">
                <option value="eq">ainult</option>
                <option value="lt">varasema kui</option>
                <option value="gt">hilisema kui</option>
            </select>
            <input type="number" 
                bind:value={dateObject2.aasta} 
                min="1980" 
                max="2024" 
                class="w-24 border border-gray-300 rounded-md px-2 py-1"/>
            <span class="mr-2">aasta</span>
            <span class="text-gray-500 {dateObject2.aastaLogic != 'eq' ? '' : 'hidden'}">
                <label class="inline-flex items-center">
                    <input type="checkbox" bind:checked={dateObject2.aastaInclude} class="rounded-md w-4 h-4 mr-1"/>
                    kaasaarvatud
                </label>
            </span>
        </div>

        <!-- Month row -->
        <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-300">
            <select bind:value={dateObject2.kuuLogic} class="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-blue-500">
                <option value="eq">ainult</option>
                <option value="lt">esimese</option>
                <option value="gt">viimase</option>
            </select>
            <input type="number" 
                bind:value={dateObject2.kuu} 
                min="1" 
                max="12" 
                class="w-20 border border-gray-300 rounded-md px-2 py-1"/>
            <span class="mr-2">kuu</span>
            <span class="text-gray-500 {dateObject2.kuuLogic != 'eq' ? '' : 'hidden'}">
                <label class="inline-flex items-center">
                    <input type="checkbox" bind:checked={dateObject2.kuuInclude} class="rounded-md w-4 h-4 mr-1"/>
                    kaasaarvatud
                </label>
            </span>
        </div>

        <!-- Day row -->
        <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-300">
            <select bind:value={dateObject2.paevLogic} class="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-blue-500">
                <option value="eq">ainult</option>
                <option value="lt">esimese</option>
                <option value="gt">viimase</option>
            </select>
            <input type="number" 
                bind:value={dateObject2.paev} 
                min="1" 
                max="31" 
                class="w-20 border border-gray-300 rounded-md px-2 py-1"/>
            <span class="mr-2">päeva</span>
            <span class="text-gray-500 {dateObject2.paevLogic != 'eq' ? '' : 'hidden'}">
                <label class="inline-flex items-center">
                    <input type="checkbox" bind:checked={dateObject2.paevInclude} class="rounded-md w-4 h-4 mr-1"/>
                    kaasaarvatud
                </label>
            </span>
            </div>
        </div>
    </div>