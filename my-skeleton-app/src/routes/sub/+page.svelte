<script lang="ts">
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
        const headers = {
            'Accept-Profile': 'apijahiala',
            Accept: 'application/json'
        };

        const results: any[] = [];

        try {
            // Loop through each parameter in paramCollectionList
            for (const param of paramCollectionList) {
                const parameters: Record<string, string> = {
                    aasta: `gte.${dateObject.startYear}`,
                    kuu: `gte.${dateObject.startMonth}`,
                    paev: `gte.${dateObject.startDay}`,
                    element_kood: `eq.${param}`,
                    tund: "gte.0",
                    jaam_kood: `eq.${placeCollectionList}`
                };

                console.log(`Requesting data for parameter: ${param}`);

                // Make an individual request for each parameter
                const response = await axios.get(url, { headers, params: parameters });

                if (response.status === 200) {
                    results.push(response.data);
                } else {
                    console.error(`Error: ${response.status}, ${response.statusText}`);
                }
            }

            return results;
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

  // Advanced search

  let isAdvancedBeingUsed = false;
  
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

  const fetchWeatherData2 = async (): Promise<any[]> => {
      const headers = {
          'Accept-Profile': 'apijahiala',
          Accept: 'application/json'
      };

      try {
        const parameters: Record<string, string> = {
              aasta: `${dateObject2.aastaLogic}${dateObject2.aastaInclude ? 'e' : ''}.${dateObject2.aasta}`,
              kuu: `${dateObject2.kuuLogic}${dateObject2.kuuInclude ? 'e' : ''}.${dateObject2.kuu}`,
              paev: `${dateObject2.paevLogic}${dateObject2.paevInclude ? 'e' : ''}.${dateObject2.paev}`,
              element_kood: `eq.${paramCollectionList}`, // Combine elements into a comma-separated list
              tund: "gte.0",
              jaam_kood: `eq.${placeCollectionList}`
          };

          console.log(`Requesting data for elements: ${paramCollectionList.join(',')}`, parameters);

          // Make a single request with combined parameters
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

  const handleFetchWeatherData2 = async () => {
        try {
          const fetchedData = await fetchWeatherData2();
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
    
  </script>
  

  <div class="flex bg-white min-h-screen">
    <!-- Sidebar -->
  
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
  
            <div class="mt-8 max-w-2xl">
              <!-- <label class="block text-lg font-medium text-gray-700 mb-2">
                  Vali soovitud ajavahemik
              </label> -->
              <div class="space-y-3">
                  <!-- Year row -->
                  <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-300">
                      <select bind:value={dateObject2.aastaLogic} class="bg-transparent border border-gray-300 rounded-md pl-2 pr-10 py-1 text-blue-500">
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
                      <select bind:value={dateObject2.kuuLogic} class="bg-transparent border border-gray-300 rounded-md pl-2 pr-10 py-1 text-blue-500">
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
                      <select bind:value={dateObject2.paevLogic} class="bg-transparent border border-gray-300 rounded-md pl-2 pr-10 py-1 text-blue-500">
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
          </div>
  
          <!-- Handle Data Button -->
          <div class="flex justify-end">
            <button
              id="handle-data"
              class="bg-blue-500 text-white py-3 px-10 rounded hover:bg-blue-600 shadow-md"
              on:click={handleFetchWeatherData2}
            >
              Filtreeri
            </button>
          </div>
        </div>
      </div>
      <div class="w-full overflow-x-auto rounded-lg shadow-lg bg-white p-4 mt-6">
          <table class="w-full border-collapse">
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
                              {row.date}
                          </td>
                          {#each row.values as value}
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {value || ''}
                              </td>
                          {/each}
                      </tr>
                  {/each}
              </tbody>
          </table>
      </div>
    </div>
  </div>