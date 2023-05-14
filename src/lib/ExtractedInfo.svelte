<script lang="ts">
    import Section from "./Section.svelte";
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";

    export let rows: string[][] = [];
</script>

<Section title="Extracted Information">
    <div class="max-w-sm" />
    <Table hoverable shadow divClass="scale-75">
        <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Property</TableHeadCell>
            <TableHeadCell>Http-Equivalent</TableHeadCell>
            <TableHeadCell>Value</TableHeadCell>
            <TableHeadCell>Charset</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each rows as row}
                <TableBodyRow tdClass="max-w-sm">
                    {#each row as cell}
                        <TableBodyCell tdClass="max-w-sm">{cell}</TableBodyCell>
                    {/each}
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</Section>
