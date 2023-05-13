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
</script>

<Section title="Extracted Information">
    <Table hoverable shadow divClass="scale-75">
        <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Property</TableHeadCell>
            <TableHeadCell>Http-Equivalent</TableHeadCell>
            <TableHeadCell>Value</TableHeadCell>
            <TableHeadCell>Charset</TableHeadCell>
        </TableHead>
        <TableBody>
            <TableBodyRow>
                <TableBodyCell>Lorem</TableBodyCell>
                <TableBodyCell>Ipsum</TableBodyCell>
                <TableBodyCell>Dolor</TableBodyCell>
                <TableBodyCell>Sit</TableBodyCell>
                <TableBodyCell>Amet</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell>Consectetur</TableBodyCell>
                <TableBodyCell>Adipiscing</TableBodyCell>
                <TableBodyCell>Elit</TableBodyCell>
                <TableBodyCell>Donec</TableBodyCell>
                <TableBodyCell>Euismod</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell>Nullam</TableBodyCell>
                <TableBodyCell>Tristique</TableBodyCell>
                <TableBodyCell>Ultricies</TableBodyCell>
                <TableBodyCell>Maecenas</TableBodyCell>
                <TableBodyCell>Velit</TableBodyCell>
            </TableBodyRow>
        </TableBody>
    </Table>
</Section>
