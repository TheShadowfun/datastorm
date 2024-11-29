<script lang="ts">
    import { Autocomplete } from '@skeletonlabs/skeleton';
    import { InputChip } from '@skeletonlabs/skeleton';
    import type { AutocompleteOption } from '@skeletonlabs/skeleton';

    let inputChip = '';
    let inputChipPara = '';

    let inputChipList: string[] = [];
    let inputChipListPara: string[] = [];

    const ilmaJaamad: AutocompleteOption<string>[] = [
        { "label": "Heltermaa", "value": "AJHELT01" },
        { "label": "Jõgeva", "value": "AJJOGE01" },
        { "label": "Jõhvi", "value": "AJJOHV01" },
        { "label": "Kihnu", "value": "AJKIHN01" },
        { "label": "Kunda", "value": "AJKUND01" },
        { "label": "Kuressaare", "value": "AJKURE_L" },
        { "label": "Kuusiku", "value": "AJKUUS01" },
        { "label": "Lääne-Nigula", "value": "AJNIGU01" },
        { "label": "Narva", "value": "AJNARV01" },
        { "label": "Pakri", "value": "AJPAKR01" },
        { "label": "Pärnu", "value": "AJPARN01" },
        { "label": "Ristna", "value": "AJRIST01" },
        { "label": "Roomassaare", "value": "AJROOM01" },
        { "label": "Ruhnu", "value": "AJRUHN01" },
        { "label": "Sõrve", "value": "AJSORV01" },
        { "label": "Tallinn-Harku", "value": "AJHARK01" },
        { "label": "Tartu-Tõravere", "value": "AJTART01" },
        { "label": "Tiirikoja", "value": "AJTIIR01" },
        { "label": "Tooma", "value": "AJTOOM01" },
        { "label": "Türi", "value": "AJTURI01" },
        { "label": "Valga", "value": "AJVALG01" },
        { "label": "Viljandi", "value": "AJVILJ01" },
        { "label": "Vilsandi", "value": "AJVILS01" },
        { "label": "Virtsu", "value": "AJVIRT01" },
        { "label": "Võru", "value": "AJVORU01" },
        { "label": "Väike-Maarja", "value": "AJV-MA01" }
    ];

    const ilmaParameetrid: AutocompleteOption<string>[] = [
        { "label": "Keskmine tuulekiirus (viimased 10 min)", "value": "WS10M" },              // Last 10-minute average wind speed (m/s)
        { "label": "Tuule suund (viimased 10 min)", "value": "WD10M" },                      // Last 10-minute prevailing wind direction (°)
        { "label": "Keskmine tuulekiirus (10 min)", "value": "WS10MA" },                     // 10-minute average wind speed (m/s)
        { "label": "Maksimaalne tuulekiirus (10 min)", "value": "WS10MX" },                  // 10-minute maximum wind speed (m/s)
        { "label": "Tuule suund (10 min)", "value": "WD10MA" },                              // 10-minute prevailing wind direction (°)
        { "label": "Sademed (10 min)", "value": "PR10M" },                                   // 10-minute precipitation total (mm)
        { "label": "Maksimaalne tuulekiirus (1 tund)", "value": "WSX1H" },                   // 1-hour maximum wind speed (m/s)
        { "label": "Maksimaalne temperatuur (1 tund)", "value": "TAX1H" },                   // 1-hour maximum air temperature (°C)
        { "label": "Minimaalne temperatuur (1 tund)", "value": "TAN1H" },                    // 1-hour minimum air temperature (°C)
        { "label": "Temperatuur (praegune)", "value": "TA" },                                // Air temperature at the hour (°C)
        { "label": "Päikesepaiste kestus (1 tund)", "value": "SDUR1H" },                     // 1-hour total sunshine duration (min)
        { "label": "Õhuniiskus (praegune)", "value": "RH" },                                 // Relative humidity at the hour (%)
        { "label": "Sademed (1 tund)", "value": "PR1H" },                                    // 1-hour precipitation total (mm)
        { "label": "Õhurõhk (praegune)", "value": "PA0" }                                    // Air pressure at sea level at the hour (hPa)
        ]

    function onInputChipSelect(event: CustomEvent<AutocompleteOption<string>>): void {
        const selectedLabel = event.detail.label;
        if (!inputChipList.includes(selectedLabel)) {
            inputChipList = [...inputChipList, selectedLabel];
            inputChip = ''; 
        }
    }

    function onInputChipSelectPara(event: CustomEvent<AutocompleteOption<string>>): void {
        const selectedLabel = event.detail.label;
        if (!inputChipListPara.includes(selectedLabel)) {
            inputChipListPara = [...inputChipListPara, selectedLabel];
            inputChipPara = ''; 
        }
    }

    import { onMount } from 'svelte';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css'; // Import Flatpickr CSS

    // State to hold the selected date range
    let dateRange: string | null = null;

    // Initialize Flatpickr
    onMount(() => {
        flatpickr('#date-range-input', {
            mode: 'range', // Enable range selection
            dateFormat: 'd.m.Y', // Customize the date format (dd.mm.yyyy)
            onChange: (selectedDates) => {
                if (selectedDates.length === 2) {
                    dateRange = `${formatDate(selectedDates[0])} to ${formatDate(selectedDates[1])}`;
                }
            }
        });
    });

    // Helper function to format dates
    function formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
</script>

<div class="m-8">

<InputChip 
    class="w-96" 
    placeholder="Sisesta ilmajaamad..." 
    bind:input={inputChip} 
    bind:value={inputChipList} 
    name="chips"
/>

<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
    <Autocomplete
        bind:input={inputChip}
        options={ilmaJaamad}
        denylist={inputChipList}
        on:selection={onInputChipSelect}
    />
</div>

<InputChip 
    class="w-96 mt-8" 
    placeholder="Sisesta ilma parameetrid..." 
    bind:input={inputChipPara} 
    bind:value={inputChipListPara} 
    name="chips"
/>

<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
    <Autocomplete
        bind:input={inputChipPara}
        options={ilmaParameetrid}
        denylist={inputChipListPara}
        on:selection={onInputChipSelectPara}
    />
</div>

<div class="flex flex-col gap-4 mt-8">
    <label for="date-range-input" class="text-lg font-medium text-gray-700">
        Select Date Range
    </label>
    <input
        id="date-range-input"
        type="text"
        placeholder="Choose a date range"
        class="w-96 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900"
    />
    <p class="text-gray-600">
        Selected Range: <span class="font-medium text-gray-800">{dateRange || 'None'}</span>
    </p>
</div>

</div>