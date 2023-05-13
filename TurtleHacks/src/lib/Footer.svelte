<script lang="ts">
    export let title: string = "";
    export let icon: string | null = null;
</script>

<div class="flex flex-col items-center -mt-8 md:mt-0 text-base">
    <p class="block">{title}</p>

    {#if icon}
        <img id="icon" class="w-12 rounded-full" src={icon} alt="icon" />
    {/if}
</div>
