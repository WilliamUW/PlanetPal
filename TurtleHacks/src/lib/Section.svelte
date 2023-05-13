<script lang="ts">
    export let title: string = "";
    export let subtitle: string = "";
</script>

<div>
    <div class="font-bold text-2xl md:text-3xl text-center">{title}</div>
    <div class="text-xl md:text-2xl text-center font-light">{subtitle}</div>
    <slot />
</div>
