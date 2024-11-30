<script>
    export let rows = [
        { date: '2023-01-01', values: Array(6).fill('') },
        { date: '2023-01-02', values: Array(6).fill('') },
        { date: '2023-01-02', values: Array(6).fill('') },
    ];
    $: numColumns = Math.max(...rows.map(row => row.values.length)) + 1;
</script>

<div class="w-full overflow-x-auto rounded-lg shadow-lg bg-white p-4">
    <table class="w-screen border-collapse">
        <thead>
            <tr>
                <th colspan={numColumns} class="px-6 py-2"></th>
            </tr>
            <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 bg-gray-200 uppercase tracking-wider rounded-l-xl">Kuupäev</th>
                {#each Array(numColumns - 1) as _, i}
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 bg-gray-200 uppercase tracking-wider">Väärtus {i + 1}</th>
                {/each}
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {#each rows as row}
                <tr class="transition-colors hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(row.date).toLocaleDateString()}
                    </td>
                    {#each row.values as value}
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {value || '-123123'}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>