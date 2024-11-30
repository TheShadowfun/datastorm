<script lang="ts">
    /*
    soovin {varasema kui / hilisema kui / ainult} n. aasta [kaasaarvatud], [iga] {esimese / viimase / ainult} n. kuu [kaasaarvatud], [iga] {esimest / viimast / ainult} n.'dat päeva [kaasaarvatud]
     */


    import { Autocomplete } from '@skeletonlabs/skeleton';
    import { InputChip } from '@skeletonlabs/skeleton';
    import type { AutocompleteOption } from '@skeletonlabs/skeleton';

    import { onMount } from 'svelte';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';

    import axios from 'axios';

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
        { "label": "Temperatuur (tunnil)", "value": "TA" },                                // Air temperature at the hour (°C)
        { "label": "Päikesepaiste kestus (1 tund)", "value": "SDUR1H" },                     // 1-hour total sunshine duration (min)
        { "label": "Õhuniiskus (tunnil)", "value": "RH" },                                 // Relative humidity at the hour (%)
        { "label": "Sademed (1 tund)", "value": "PR1H" },                                    // 1-hour precipitation total (mm)
        { "label": "Õhurõhk (tunnil)", "value": "PA0" }                                    // Air pressure at sea level at the hour (hPa)
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

    let paramCollectionList: string[] = [];
    let placeCollectionList: string[] = [];

    $: placeCollectionList = inputChipList.map(chipLabel => {
        const match = ilmaJaamad.find(station => station.label === chipLabel);
        return match ? match.value : '';
    }).filter(value => value !== '');

    $: paramCollectionList = inputChipListPara.map(chipLabel => {
        const match = ilmaParameetrid.find(param => param.label === chipLabel);
        return match ? match.value : '';
    }).filter(value => value !== '');


    // Initialize Flatpickr on component mount
    onMount(() => {
        flatpickr('#date-range-input', {
            mode: 'range', // Enable range selection
            dateFormat: 'd.m.Y', // Display format for the user
            onChange: handleDateChange // Function to handle changes
        });
    });
    
    let dateObject = {
        startDay: '',
        startMonth: '',
        startYear: '',
        endDay: '',
        endMonth: '',
        endYear: ''
    };

    function handleDateChange(selectedDates: Date[]): void {
        if (selectedDates.length === 2) {
            const [startDate, endDate] = selectedDates;

            dateObject = {
                startDay: removeLeadingZero(startDate.getDate()),
                startMonth: removeLeadingZero(startDate.getMonth() + 1),
                startYear: startDate.getFullYear().toString(),
                endDay: removeLeadingZero(endDate.getDate()),
                endMonth: removeLeadingZero(endDate.getMonth() + 1),
                endYear: endDate.getFullYear().toString()
            };

            console.log(dateObject);
        } else {
            console.log("Incomplete date selection");
        }
    }

    // Helper function to remove leading zeros
    function removeLeadingZero(value: number): string {
        return parseInt(value.toString(), 10).toString(); // Converts number to string without leading zero
    }

    const url = "https://keskkonnaandmed.envir.ee/f_kliima_tund";

    const fetchWeatherData = async (): Promise<any[]> => {
    // Parameters
    const parameters: Record<string, string> = {
        aasta: `gte.${dateObject.startYear}`,
        element_kood: "eq.TAN1H",
        tund: "gte.0",
        jaam_kood: "eq.AJHARK01"
    };

    if (dateObject.startYear === dateObject.endYear) {
        parameters.kuu = `gte.${dateObject.startMonth}`;
    }

    if (
        dateObject.startYear === dateObject.endYear &&
        dateObject.startMonth === dateObject.endMonth
    ) {
        parameters.paev = `gte.${dateObject.startDay}`;
    }

    const headers = {
        "Accept-Profile": "apijahiala",
        "Accept": "application/json"
    };

    try {
        const response = await axios.get(url, { headers, params: parameters });

        if (response.status === 200) {
            return response.data; // Return the fetched data
        } else {
            console.error(`Error: ${response.status}, ${response.statusText}`);
            return []; // Return an empty array on error
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Axios error: ${error.response?.status}, ${error.response?.data}`);
        } else {
            console.error(`Unexpected error: ${error}`);
        }
        return []; // Return an empty array on error
    }
    };

    const handleFetchWeatherData = async () => {
    try {
        const fetchedData = await fetchWeatherData();
        console.log("Fetched Data:", fetchedData);
        // Further processing
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    };


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
</div>

<button id="submit-button" class="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" on:click={fetchWeatherData}>
        Submit
    </button>
<button id="handle-data" class="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" on:click={handleFetchWeatherData}>
    Handle Data
</button>

</div>