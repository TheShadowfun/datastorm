<script>
  import Sidebar from '../../sidebar.svelte';
</script>


<div class="flex bg-white min-h-screen font-aino">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content -->
  <div class="flex-1 px-24 pt-24 bg-gray-100">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-custom-blue font-aino-headline text-5xl">Meteoroloogilise seire andmestik</h1>
      <p class="text-custom-blue pt-6">
        Valige andmebaas, et vaadata andmeid ning esitada päringuid.
      </p>
    </div>

    <!-- Andmebaaside Loetelu -->
    <div class="space-y-4 mt-11">
      <!-- Link 1 -->
      <a href="/eesti-vaatlusandmed-xml" class="flex items-center text-black text-lg font-medium hover:text-blue-600 transition">
        <span class="mr-4">Eesti vaatlusandmed XML formaadis</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>

      <!-- Link 2 -->
      <a href="/euroopa-linnade-hetkeilm-xml" class="flex items-center text-black text-lg font-medium hover:text-blue-600 transition">
        <span class="mr-4">Euroopa linnade hetkeilm XML formaadis</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>

      <!-- Link 3 -->
      <a href="/ilm-euroopas" class="flex items-center text-black text-lg font-medium hover:text-blue-600 transition">
        <span class="mr-4">Ilm Euroopas</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>

      <!-- Link 4 -->
      <a href="/avaandmed/seireandmed/sisu" class="flex items-center text-black text-lg font-medium hover:text-blue-600 transition">
        <span class="mr-4">Meteoroloogiajaamade seireandmed</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>

      <!-- Link 5 -->
      <a href="/sademed" class="flex items-center text-black text-lg font-medium hover:text-blue-600 transition">
        <span class="mr-4">Sademed</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>

      <!-- Link 6 -->
      <a href="/satelliidipildid" class="flex items-center text-black text-lg font-medium hover:text-blue-600 transition">
        <span class="mr-4">Satelliidipildid</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>

      <!-- Link 7 -->
      <a href="/uv-indeks" class="flex items-center text-black text-lg font-medium hover:text-blue-600 transition">
        <span class="mr-4">UV-indeks</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>

      <!-- Link 8 -->
      <a href="/vaatlusandmed" class="flex items-center text-black text-lg font-medium hover:text-blue-600 transition">
        <span class="mr-4">Vaatlusandmed</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>

      <!-- Link 9 -->
      <a href="/aikesedetektorite-andmed" class="flex items-center text-black text-lg font-medium hover:text-blue-600 transition">
        <span class="mr-4">Äikesedetektorite andmed</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>
    </div>
  </div>
</div>
