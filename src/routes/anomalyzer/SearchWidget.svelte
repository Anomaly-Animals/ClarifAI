<script lang="ts">
	import { anomalyzerState, showApiError } from '$lib/state/anomalyzerState.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { fly } from 'svelte/transition';

	const handleKeyPress = (event: KeyboardEvent) => {
		// Check if the event has either Control (Cmd/Ctrl) key or Command key (Mac-specific)
		const isControlOrCommand = event.ctrlKey || event.metaKey; // Ctrl for Windows/Linux, Meta for Mac

		// Allow only numbers, backspace, delete, arrow keys, and control keys
		const allowedKeys = [
			'Backspace',
			'Delete',
			'ArrowLeft',
			'ArrowRight',
			'Tab',
			'Enter',
			'ArrowUp',
			'ArrowDown'
		];

		// Allow common command actions like Ctrl+C, Ctrl+V, Ctrl+A, etc.
		if (isControlOrCommand || allowedKeys.includes(event.key)) {
			anomalyzerState.faultyState = false;
			return; // Allow if Control/Command or allowed special keys
		}

		// Allow only numerical input (0-9)
		if (!/[0-9]/.test(event.key)) {
			event.preventDefault(); // Block the key input if it's not a number
			return;
		}

		anomalyzerState.faultyState = false;
	};

	// Handle paste events to ensure the pasted content is numeric
	const handlePaste = (event: ClipboardEvent) => {
		const pastedText = event.clipboardData?.getData('text') || '';

		// Check if the pasted content is numeric
		if (!/^\d+$/.test(pastedText)) {
			anomalyzerState.faultyState = true;
			event.preventDefault(); // Prevent paste if the content isn't numeric
		}

		anomalyzerState.faultyState = false;
	};

	const handleSearchClick = async (event: MouseEvent) => {
		anomalyzerState.pageLoading = true;

		const response = await fetch(
			`/api/reasoning?documentNumber=${anomalyzerState.documentNumber}`,
			{
				method: 'GET'
			}
		);

		setTimeout(
			async () => {
				anomalyzerState.pageLoading = false;
				anomalyzerState.mountedOnBottom = true;

				if (!response.ok) {
					anomalyzerState.searchSuccessful = false;
					showApiError();
					return;
				}

				anomalyzerState.reasonings = await response.json();
				anomalyzerState.searchSuccessful = true;
			},
			anomalyzerState.mountedOnBottom ? 0 : 500
		); // Delay for 500ms to allow the transition to complete
	};

	const {
		shouldShowTransition,
		shouldShowOnBottom
	}: { shouldShowTransition?: boolean; shouldShowOnBottom?: boolean } = $props();

	const showTransition = $derived(shouldShowTransition && !anomalyzerState.mountedOnBottom);
</script>

<div
	class={`${shouldShowOnBottom ? `mt-auto` : ``} flex w-1/2 justify-center rounded-lg border bg-gradient-to-r from-purple-300/40 to-teal-200/40 p-4 shadow-sm`}
	in:fly={{ duration: showTransition ? 500 : 0, y: -500 }}
>
	<div class="flex flex-1 flex-col">
		<Input
			type="text"
			bind:value={anomalyzerState.documentNumber}
			onkeydown={handleKeyPress}
			onpaste={handlePaste}
			disabled={anomalyzerState.pageLoading}
			class={anomalyzerState.faultyState ? 'border-red-400' : ''}
			placeholder="Document number ..."
		/>
		{#if anomalyzerState.faultyState}
			<p class="mt-1 pl-2 text-sm text-muted-foreground">Only numerical values are allowed.</p>
		{/if}
	</div>
	<Button
		type="submit"
		disabled={anomalyzerState.pageLoading || anomalyzerState.documentNumber.length == 0}
		class="ml-4"
		onclick={handleSearchClick}>Anomalyze</Button
	>
</div>
