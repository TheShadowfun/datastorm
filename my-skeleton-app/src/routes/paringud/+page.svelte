<script>
  import Sidebar from '../sidebar.svelte';

  let state = 'link'; // The current state: 'link', 'loading', or 'done'

  // Function to handle "Digitembelda" click
  function handleClick() {
    state = 'loading';
    setTimeout(() => {
      state = 'done';
    }, 2000); // 2 seconds delay
  }

  // Function to handle file download when clicking the SVG and circle
  function downloadFile() {
    const link = document.createElement('a');
    link.href = '/static/Dirhami-2011-juuni-2024.asice'; // Path to the file
    link.download = 'Dirhami-2011-juuni-2024.asice'; // Suggested filename
    link.click();
  }
</script>

<div class="flex bg-white min-h-screen font-aino">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content -->
  <div class="flex-1 px-24 pt-24 bg-gray-100">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-custom-blue font-aino-headline text-5xl">Päringud</h1>
      <p class="text-custom-blue pt-6">
        Siin näete oma esitatud päringuid ja nende staatust.
      </p>
    </div>

    <!-- Applications List -->
    <div class="bg-gray-50 p-6 rounded-lg shadow-md">
      <dl class="list-dl space-y-6">
        <!-- Application 1 -->
        <div class="flex items-center">
          <!-- Icon -->
          <span 
            class="bg-blue-100 text-blue-600 p-3 rounded-full mr-4 cursor-pointer hover:bg-blue-200 transition" 
            on:click={downloadFile}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </span>

          <!-- Content -->
          <span class="flex-auto">
            <dt class="text-lg font-semibold text-black">Meteoroloogiajaamade seireandmed</dt>
            <dd class="text-gray-600 flex items-center">
              {#if state === 'link'}
                <button 
                  on:click={handleClick} 
                  class="underline text-blue-600 hover:text-blue-800 transition">
                  Digitembelda
                </button>
              {/if}

              {#if state === 'loading'}
                <span class="text-gray-500 transition-opacity duration-500 ease-in-out">
                  Laadimine...
                </span>
              {/if}

              {#if state === 'done'}
                <div class="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>Digitembeldatud</span>
                </div>
              {/if}
            </dd>
          </span>

          <!-- Date Box -->
          <div class="bg-gray-100 text-sm font-medium text-gray-600 px-3 py-1 rounded-lg">
            01.12.2024
          </div>
        </div>
      </dl>
    </div>
  </div>
</div>
