<script lang="ts">
	import { ListX, ListXIcon, ShieldAlert } from 'lucide-svelte';

	interface ViolationReasonCellProps {
		title: string;
		description: string;
		reasons: string[];
	}

	const { title, description, reasons }: ViolationReasonCellProps = $props();
</script>

<div class="flex w-1/2 flex-row rounded-lg bg-orange-200/10 shadow-lg">
	<div>
		<h3
			class="flex flex-row gap-4 rounded-lg border-b-2 bg-orange-200/40 p-4 text-xl font-semibold tracking-tight"
		>
			<ShieldAlert />
			{title}
		</h3>

		<p class="p-6 leading-7 tracking-tight [&:not(:first-child)]:mt-2">
			{description}
		</p>
		<ul class="ml-4 list-disc p-6">
			{#each reasons as reason}
				<li>{reason}</li>
			{/each}
		</ul>
	</div>
</div>
