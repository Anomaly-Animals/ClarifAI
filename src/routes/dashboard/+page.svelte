<script lang="ts">
	import DataTable from './dataTable.svelte';
	import { columns } from './columns.js';
	import type { PageProps } from './$types';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';

	let { data }: PageProps = $props();
	const { bookings, error } = data;
</script>

<div>
	{#if bookings}
		<DataTable data={data.bookings} {columns} />
	{:else}
		<Alert.Root variant="destructive">
			<CircleAlert class="size-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>
				{error.message}
			</Alert.Description>
		</Alert.Root>
	{/if}
</div>
