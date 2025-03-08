<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { Booking } from '$lib/domain/Booking';
	import { showAlert } from '$lib/state/dashboardState.svelte';
	import { goto } from '$app/navigation';

	let { documentNumber }: Pick<Booking, 'documentNumber'> = $props();

	const handleCopy = () => {
		navigator.clipboard.writeText(documentNumber);
		showAlert();
	};

	const handleNavigation = () => {
		goto(`/anomalyzer?documentNumber=${documentNumber}`);
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
			<DropdownMenu.Item onclick={handleCopy}>Copy document number</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={handleNavigation}>View suspicion analysis</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
