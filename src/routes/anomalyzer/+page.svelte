<script lang="ts">
	import LoadingSpinner from '$lib/components/layout/LoadingSpinner.svelte';
	import { anomalyzerState, clearAnomalyzerState } from '$lib/state/anomalyzerState.svelte';
	import { onMount } from 'svelte';
	import SearchWidget from './SearchWidget.svelte';
	import { fade } from 'svelte/transition';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Check, Cross, X } from 'lucide-svelte';

	onMount(() => {
		clearAnomalyzerState();
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	{#if anomalyzerState.pageLoading}
		<div class="flex flex-1 items-center">
			<LoadingSpinner />
		</div>
		<SearchWidget shouldShowTransition shouldShowOnBottom />
	{:else if !anomalyzerState.pageLoading && !anomalyzerState.searchSuccessful}
		<SearchWidget />
	{:else}
		<SearchWidget shouldShowOnBottom />
	{/if}
</div>

{#if anomalyzerState.showApiError}
	<div transition:fade>
		<Alert.Root
			class="justify-content center fixed bottom-5 left-1/2 -ml-48 w-96"
			variant="destructive"
		>
			<Alert.Description class="flex flex-row gap-4">
				<X />
				<p>Something went wrong!</p>
			</Alert.Description>
		</Alert.Root>
	</div>
{/if}
