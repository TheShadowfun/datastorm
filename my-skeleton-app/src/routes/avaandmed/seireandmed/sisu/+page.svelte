<script lang="ts">
  //import Seirekaart from './seirekaart.svelte';
  import Sidebar from '../../../sidebar.svelte';
  import { Autocomplete } from '@skeletonlabs/skeleton';
  import { InputChip } from '@skeletonlabs/skeleton';
  import type { AutocompleteOption } from '@skeletonlabs/skeleton';

  import { onMount } from 'svelte';
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.css';

  import { writable } from 'svelte/store';
  import axios from 'axios';

  let inputChip = '';
  let inputChipPara = '';

  let inputChipList: string[] = [];
  let inputChipListPara: string[] = [];

  const ilmaJaamad: AutocompleteOption<string>[] = [
    { label: "Heltermaa", value: "AJHELT01" },
    { label: "Jõgeva", value: "AJJOGE01" },
    { label: "Jõhvi", value: "AJJOHV01" },
    { label: "Kihnu", value: "AJKIHN01" },
    { label: "Kunda", value: "AJKUND01" },
    { label: "Kuressaare", value: "AJKURE_L" },
    { label: "Kuusiku", value: "AJKUUS01" },
    { label: "Lääne-Nigula", value: "AJNIGU01" },
    { label: "Narva", value: "AJNARV01" },
    { label: "Pakri", value: "AJPAKR01" },
    { label: "Pärnu", value: "AJPARN01" },
    { label: "Ristna", value: "AJRIST01" },
    { label: "Roomassaare", value: "AJROOM01" },
    { label: "Ruhnu", value: "AJRUHN01" },
    { label: "Sõrve", value: "AJSORV01" },
    { label: "Tallinn-Harku", value: "AJHARK01" },
    { label: "Tartu-Tõravere", value: "AJTART01" },
    { label: "Tiirikoja", value: "AJTIIR01" },
    { label: "Tooma", value: "AJTOOM01" },
    { label: "Türi", value: "AJTURI01" },
    { label: "Valga", value: "AJVALG01" },
    { label: "Viljandi", value: "AJVILJ01" },
    { label: "Vilsandi", value: "AJVILS01" },
    { label: "Virtsu", value: "AJVIRT01" },
    { label: "Võru", value: "AJVORU01" },
    { label: "Väike-Maarja", value: "AJV-MA01" }
  ];

  const ilmaParameetrid: AutocompleteOption<string>[] = [
    { label: "Keskmine tuulekiirus (viimased 10 min)", value: "WS10M" },
    { label: "Tuule suund (viimased 10 min)", value: "WD10M" },
    { label: "Keskmine tuulekiirus (10 min)", value: "WS10MA" },
    { label: "Maksimaalne tuulekiirus (10 min)", value: "WS10MX" },
    { label: "Tuule suund (10 min)", value: "WD10MA" },
    { label: "Sademed (10 min)", value: "PR10M" },
    { label: "Maksimaalne tuulekiirus (1 tund)", value: "WSX1H" },
    { label: "Maksimaalne temperatuur (1 tund)", value: "TAX1H" },
    { label: "Minimaalne temperatuur (1 tund)", value: "TAN1H" },
    { label: "Temperatuur (tunnil)", value: "TA" },
    { label: "Päikesepaiste kestus (1 tund)", value: "SDUR1H" },
    { label: "Õhuniiskus (tunnil)", value: "RH" },
    { label: "Sademed (1 tund)", value: "PR1H" },
    { label: "Õhurõhk (tunnil)", value: "PA0" }
  ];

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

  $: placeCollectionList = inputChipList
    .map((chipLabel) => {
      const match = ilmaJaamad.find((station) => station.label === chipLabel);
      return match ? match.value : '';
    })
    .filter((value) => value !== '');

  $: paramCollectionList = inputChipListPara
    .map((chipLabel) => {
      const match = ilmaParameetrid.find((param) => param.label === chipLabel);
      return match ? match.value : '';
    })
    .filter((value) => value !== '');

  onMount(() => {
    flatpickr('#date-range-input', {
      mode: 'range',
      dateFormat: 'd.m.Y',
      onChange: handleDateChange
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
    }
  }

  function removeLeadingZero(value: number): string {
    return parseInt(value.toString(), 10).toString();
  }

  const url = 'https://keskkonnaandmed.envir.ee/f_kliima_tund';

  const fetchWeatherData = async (): Promise<any[]> => {
    const parameters: Record<string, string> = {
        aasta: `gte.${dateObject.startYear}`,
        kuu: `gte.${dateObject.startMonth}`,
        paev: `gte.${dateObject.startDay}`,
        element_kood: `eq.${paramCollectionList}`,
        tund: "gte.0",
        jaam_kood: `eq.${placeCollectionList}`
    };

    const headers = {
      'Accept-Profile': 'apijahiala',
      Accept: 'application/json'
    };

    try {
      const response = await axios.get(url, { headers, params: parameters });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`Error: ${response.status}, ${response.statusText}`);
        return [];
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Axios error: ${error.response?.status}, ${error.response?.data}`);
      } else {
        console.error(`Unexpected error: ${error}`);
      }
      return [];
    }
  };
  
  let rows = [{date: '', values: ['']}] //{date: '2023-01-02', values: Array(6).fill('')}
  
  const handleFetchWeatherData = async () => {
    try {
      const fetchedData = await fetchWeatherData();
      console.log('Fetched Data:', fetchedData);
      const filteredData = filterDataByEndDate(fetchedData, dateObject);
      console.log(filteredData);
      rows = []
      filteredData.forEach(element => {
        rows = [...rows, {
        date: element.tund !== undefined 
    ? `${element.aasta}-${element.kuu}-${element.paev} kell ${element.tund <= 9 ? '0' : ''}${element.tund} `
    : `${element.aasta}-${element.kuu}-${element.paev}`,
  values: [`${element.vaartus}${element.element_yhik_eng}`]
}];
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterDataByEndDate = (
    data: any[],
    dateObject: { endYear: string; endMonth: string; endDay: string }
  ): any[] => {
    const endYear = parseInt(dateObject.endYear, 10);
    const endMonth = parseInt(dateObject.endMonth, 10);
    const endDay = parseInt(dateObject.endDay, 10);

    return data.filter((entry) => {
      const entryYear = entry.aasta;
      const entryMonth = entry.kuu;
      const entryDay = entry.paev;

      if (entryYear > endYear) {
        return false;
      }

      if (entryYear === endYear) {
        if (entryMonth > endMonth) {
          return false;
        }

        if (entryMonth === endMonth) {
          if (entryDay > endDay) {
            return false;
          }
        }
      }

      return true;
    });
  };

$: numColumns = Math.max(...rows.map(row => row.values.length)) + 1;

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

<div class="flex bg-white min-h-screen">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content -->
  <div class="flex-1 px-16 pt-16 bg-gray-100">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-custom-blue font-aino-headline text-5xl">Filtreerimine</h1>
      <p class="text-custom-blue pt-4 text-lg">
        Siin saad andmeid filtreerida ning päringu saata.
      </p>
    </div>

    <!-- Filters and Data -->
    <div class="bg-white p-8 rounded-lg shadow-md border border-gray-300">
      <div class="grid grid-cols-2 gap-8">
        <!-- Left Column: Parameetrid -->
        <div>
          <InputChip
            class="w-full"
            placeholder="Sisesta ilma parameetrid..."
            bind:input={inputChipPara}
            bind:value={inputChipListPara}
            name="chips"
          />
          <div class="card mt-4 p-4 border border-gray-200 rounded-lg max-h-48 overflow-y-auto bg-gray-50" tabindex="-1">
            <Autocomplete
              bind:input={inputChipPara}
              options={ilmaParameetrid}
              denylist={inputChipListPara}
              on:selection={onInputChipSelectPara}
            />
          </div>
        </div>

        <!-- Right Column: Ilmajaamad -->
        <div>
          <InputChip
            class="w-full"
            placeholder="Sisesta ilmajaamad..."
            bind:input={inputChip}
            bind:value={inputChipList}
            name="chips"
          />
          <div class="card mt-4 p-4 border border-gray-200 rounded-lg max-h-48 overflow-y-auto bg-gray-50" tabindex="-1">
            <Autocomplete
              bind:input={inputChip}
              options={ilmaJaamad}
              denylist={inputChipList}
              on:selection={onInputChipSelect}
            />
          </div>
          <!-- Link to view Ilmajaamad locations -->
          <p class="text-lg font-aino text-gray-800 mt-4">
            Ilmajaamade asukohti saad vaadata 
            <a 
              href="https://www.ilmateenistus.ee/meist/vaatlusvork/" 
              class="underline text-blue-600 hover:text-blue-800 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              siit
            </a>.
          </p>
        </div>
      </div>

      <!-- Date Range and Handle Data -->
      <div class="mt-8 grid grid-cols-2 items-end gap-8">
        <!-- Date Range Filter -->
        <div>
          <label for="date-range-input" class="block text-lg font-medium text-gray-700 mb-2">
            Vali soovitud ajavahemik
          </label>
          <input
            id="date-range-input"
            type="text"
            placeholder="Kliki siia ja vali!"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900"
          />
        </div>

        <!-- Handle Data Button -->
        <div class="flex justify-end">
          <button
            id="handle-data"
            class="bg-blue-500 text-white py-3 px-10 rounded hover:bg-blue-600 shadow-md"
            on:click={handleFetchWeatherData}
          >
            Filtreeri
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


