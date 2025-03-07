<script lang="ts">
	import { page } from '$app/state';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { determineBreadcrumbs } from '$lib/utils/determineBreadcrumb';

	const currentBreadcrumbs = $derived(determineBreadcrumbs(page.url.pathname));
	const isLast = (idx: number) => idx === currentBreadcrumbs.length - 1;
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		{#each currentBreadcrumbs as { breadcrumb, url }, index}
			<Breadcrumb.Item class="hidden md:block">
				<Breadcrumb.Link href={url}>{breadcrumb}</Breadcrumb.Link>
			</Breadcrumb.Item>

			{#if !isLast(index)}
				<Breadcrumb.Separator class="hidden md:block" />
			{/if}
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
