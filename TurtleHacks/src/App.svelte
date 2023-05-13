<script lang="ts">
    // @ts-nocheck
    import icon from "/icon.png";
    import Credits from "./lib/Credits.svelte";
    import Footer from "./lib/Footer.svelte";
    import Score from "./lib/Score.svelte";
    import Section from "./lib/Section.svelte";
    import ExtractedInfo from "./lib/ExtractedInfo.svelte";

    document.documentElement.classList.add("dark");
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
    class="flex flex-col items-center min-h-screen p-4 sm:p-8 md:px-32 lg:px-64"
>
    <Score />
    <Credits />

    <Section title="Product Analysis" subtitle="Generating Analysis!" />

    <Section title="Alternatives" subtitle="Generating Alternatives!" />

    <ExtractedInfo />

    <Section />

    <Footer title="Thank you for using SustainBuy!" {icon} />
</div>
