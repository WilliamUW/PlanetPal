<script lang="ts">
    export let title: string = "";
    export let subtitle: string = "";
</script>

<div>
    <div class="font-bold text-2xl md:text-3xl text-center underline">
        {title}
    </div>
    <div class="text-base text-center font-light">{subtitle}</div>
    <slot />
</div>
