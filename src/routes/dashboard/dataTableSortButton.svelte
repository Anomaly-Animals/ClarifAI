<script lang="ts">
	import { SortAsc, SortDesc, ArrowDownUp } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { SortDirection } from '@tanstack/table-core';

	let {
		buttonText,
		sortHandler,
		currentSortOption
	}: { buttonText: string; sortHandler: () => void; currentSortOption: SortDirection | false } =
		$props();
</script>

<Button class="h-18 text-wrap" variant="ghost" onclick={sortHandler}>
	<p class="text-left">{buttonText}</p>
	{#if !currentSortOption}
		<ArrowDownUp class="ml-2" />
	{:else if currentSortOption === 'asc'}
		<SortAsc class="ml-2" />
	{:else}
		<SortDesc class="ml-2" />
	{/if}
</Button>
