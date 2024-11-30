<script>
    import { onMount } from 'svelte';

    // State to track the current view
    let isSubmitted = false;

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        isSubmitted = true;

        // Redirect to "/" after 5 seconds
        setTimeout(() => {
            window.location.href = "/";
        }, 5000);
    }
</script>

<div class="bg-gray-100 min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-blue-900 text-white">
        <div class="container mx-auto flex justify-between items-center py-4 px-6">
            <h1 class="text-sm font-semibold">
                Turvaline autentimine asutuste e-teenustes
            </h1>
            <nav class="flex space-x-6">
                <a href="#" class="hover:underline">LIGIPÄÄSETAVUS</a>
                <a href="#" class="hover:underline">ENGLISH</a>
                <a href="#" class="hover:underline">РУССКИЙ</a>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto py-10 px-6">
        {#if !isSubmitted}
            <!-- Initial Form -->
            <div class="bg-white shadow-md rounded-lg max-w-md mx-auto p-8">
                <div class="flex space-x-4 mb-6">
                    <button class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100">
                        ID-kaart
                    </button>
                    <button class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100">
                        Mobiil-ID
                    </button>
                    <button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md">
                        Smart-ID
                    </button>
                </div>
                <div>
                    <h2 class="text-lg font-semibold mb-2">Smart-ID</h2>
                    <p class="text-gray-700 mb-4">
                        Teenusesse <span class="font-semibold">KESKKONNAPORTAAL</span> ja autentimise teenus sisselogimiseks vajate kehtivat Smart-ID kontot.
                        Sisestage oma isikukood ning vajutage "Jätka". Seejärel saadetakse Teie Smart-ID rakendusse kontrollkood.
                    </p>
                    <form on:submit={handleSubmit} class="space-y-4">
                        <div class="flex items-center">
                            <label for="idCode" class="sr-only">Isikukood</label>
                            <input id="idCode" type="text" placeholder="EE" 
                                class="border border-gray-300 rounded-md flex-1 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600">
                        </div>
                        <button type="submit" class="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                            Jätka
                        </button>
                    </form>
                </div>
            </div>
        {:else}
            <!-- Submitted View -->
            <div class="bg-white shadow-md rounded-lg max-w-md mx-auto p-8 text-center">
                <h2 class="text-lg font-semibold mb-4 text-blue-800">Smart-ID</h2>
                <p class="text-gray-700 mb-2">
                    Teie Smart-ID rakendusse saadeti kontrollkood.
                </p>
                <p class="text-gray-700 mb-6">Teie kontrollkood on:</p>
                <p class="text-3xl font-bold text-blue-800">8833</p>
                <button class="mt-6 px-6 py-2 border border-blue-800 text-blue-800 rounded-md hover:bg-blue-100">
                    Tühista
                </button>
            </div>
        {/if}
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 py-6 border-t border-gray-200">
        <div class="container mx-auto flex justify-between items-center">
            <img src="/static/el_regionaalarengu_fond_horisontaalne.jpg" alt="Euroopa Liit logo" class="w-40">
            <a href="#" class="text-blue-600 hover:underline">Riigi autentimisteenusest lähemalt</a>
        </div>
    </footer>
</div>
