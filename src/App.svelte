<script lang="ts">
    // @ts-nocheck
    import icon from "/icon.png";
    import Credits from "./lib/Credits.svelte";
    import Footer from "./lib/Footer.svelte";
    import Score from "./lib/Score.svelte";
    import Section from "./lib/Section.svelte";
    import ExtractedInfo from "./lib/ExtractedInfo.svelte";

    document.documentElement.classList.add("dark");

    let loading = ".";

    // Function to update loading text
    const updateLoading = () => {
        if (loading === "...") {
            loading = ".";
        } else {
            loading += ".";
        }
    };

    // Start interval to update loading text every second
    const loadingInterval = setInterval(updateLoading, 500);

    let metas: (string | null)[] = [];
    let score: number | "?" = "?";
    let credits: number = 0;
    let product_explanation: string | null = null;
    let alternatives: string | null = null;

    async function getMetas() {
        chrome.tabs.executeScript(
            null,
            {
                file: "/getPageMetas.js",
            },
            () => {
                // If you try it into an extensions page or the webstore/NTP you'll get an error
                if (chrome.runtime.lastError) {
                    alert(
                        `There was an error injecting script : \n${chrome.runtime.lastError.message}`
                    );
                }
            }
        );
    }

    type RequestResult = {
        method: string;
        metas: string[];
        score: string;
        product_explanation: string;
        alternatives: string;
    };

    // React to message from background script
    const handleMessage = (request: RequestResult) => {
        if (request.method == "getMetas") {
            metas = request.metas;
        }

        const regex = /\d+/g; // matches any sequence of digits
        const scores = request.score.match(regex);

        score = parseInt(scores[0]);
        const Price = parseFloat(request.price);
        const multiplier = parseInt((0.25)*score*(1-(Price/1000)));
        const points = parseInt(multiplier * (score * (Price/1000)));
        credits = points;

        product_explanation = request.product_explanation;
        alternatives = request.alternatives;
    };

    if (chrome && chrome.runtime) {
        // Attach the message listener
        chrome.runtime.onMessage.addListener(handleMessage);
        // Call getMetas on component load
        getMetas();
    } else {
        console.error("Chrome runtime not found");
    }
</script>

<svelte:head>
    <style>
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }

        /* For IE, Edge and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }

        body {
            @apply bg-slate-900 text-sky-100 scrollbar-hide;
        }

        html {
            width: 470px;
            height: 800px;
        }
    </style>
</svelte:head>

<div
    class="flex flex-col items-center min-h-screen p-4 sm:p-8 md:px-32 lg:px-64 gap-6"
>
    <Score {score} />
    <Credits {credits} />

    {#if product_explanation}
        <Section title="Product Analysis" subtitle={product_explanation} />
    {:else}
        <Section
            title="Product Analysis"
            subtitle="Generating Analysis! {loading}"
        />
    {/if}

    {#if alternatives}
        <Section title="Alternatives" subtitle={alternatives} />
    {:else}
        <Section
            title="Alternatives"
            subtitle="Generating Alternatives! {loading}"
        />
    {/if}

    <ExtractedInfo rows={metas} />

    <Footer title="Thank you for using PlanetPal!" {icon} />
</div>
