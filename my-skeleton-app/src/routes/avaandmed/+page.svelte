<script>
  import Sidebar from '../sidebar.svelte';
</script>

<div class="flex bg-white min-h-screen">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content -->
  <div class="flex-1 px-24 pt-24 bg-gray-100">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-custom-blue font-aino-headline text-5xl">Avaandmed</h1>
      <p class="text-custom-blue pt-6">
        Siin saate leida ning allkirjastada kõik vajalikud meteoroloogilised ja hüdroloogilised andmed mugavalt ühest kohast.
      </p>
    </div>

    <!-- 3x3 Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Card 1: Meteoroloogilise seire andmestik -->
      <a href="/meteoroloogilise-seire-andmestik" class="relative group bg-white rounded-lg overflow-hidden shadow-lg block">
        <img src="avaandmed-pildid/meteo_seire_andmeallikad.png" alt="Meteoroloogilise seire andmestik" class="w-full h-48 object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <h2 class="text-white text-lg font-semibold">Meteoroloogilise seire andmestik</h2>
        </div>
      </a>

      <!-- Card 2: Meteoroloogiliste radarite andmestik -->
      <a href="/some-link-2" class="relative group bg-white rounded-lg overflow-hidden shadow-lg block">
        <img src="/avaandmed-pildid/radar_andemallikad.png" alt="Meteoroloogiliste radarite andmestik" class="w-full h-48 object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition"></div>
        <div class="absolute inset-0 flex items-center justify-center text-center px-4">
          <h2 class="text-white text-lg font-semibold">Meteoroloogiliste radarite andmestik</h2>
        </div>
      </a>


      <!-- Card 3: Ilmaprognoosid -->
      <a href="/some-link-3" class="relative group bg-white rounded-lg overflow-hidden shadow-lg block">
        <img src="/avaandmed-pildid/ilmaprognoos_andemallikad.png" alt="Ilmaprognoosid" class="w-full h-48 object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <h2 class="text-white text-lg font-semibold">Ilmaprognoosid</h2>
        </div>
      </a>

      <!-- Card 4: Ilma mudelprognoosid -->
      <a href="/some-link-4" class="relative group bg-white rounded-lg overflow-hidden shadow-lg block">
        <img src="/avaandmed-pildid/ilm_mudel_andmeallikad.png" alt="Ilma mudelprognoosid" class="w-full h-48 object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <h2 class="text-white text-lg font-semibold">Ilma mudelprognoosid</h2>
        </div>
      </a>

      <!-- Card 5: Hüdroloogiline mudelprognoos -->
      <a href="/some-link-5" class="relative group bg-white rounded-lg overflow-hidden shadow-lg block">
        <img src="/avaandmed-pildid/hydroprognoos_andmeallikad.png" alt="Hüdroloogiline mudelprognoos" class="w-full h-48 object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <h2 class="text-white text-lg font-semibold">Hüdroloogiline mudelprognoos</h2>
        </div>
      </a>

      <!-- Card 6: Kliimaandmestik -->
      <a href="static/some-link-6" class="relative group bg-white rounded-lg overflow-hidden shadow-lg block">
        <img src="/avaandmed-pildid/Kliima_visuaal.png" alt="Kliimaandmestik" class="w-full h-48 object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <h2 class="text-white text-lg font-semibold">Kliimaandmestik</h2>
        </div>
      </a>

      <!-- Card 7: Hüdroloogilise seire andmestik -->
      <a href="static/some-link-7" class="relative group bg-white rounded-lg overflow-hidden shadow-lg block">
        <img src="/avaandmed-pildid/hydroseire visuaal.png" alt="Hüdroloogilise seire andmestik" class="w-full h-48 object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <h2 class="text-white text-lg font-semibold">Hüdroloogilise seire andmestik</h2>
        </div>
      </a>
    </div>
  </div>
</div>
