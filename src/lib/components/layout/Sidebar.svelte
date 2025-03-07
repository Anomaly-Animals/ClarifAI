<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { ChartPie, House, Columns3, Settings2, type Icon as IconType } from 'lucide-svelte';
	import { page } from '$app/state';
	import DarkLogo from '$lib/assets/LogoWhite.png';
	import LightLogo from '$lib/assets/LogoBlack.png';
	import { mode } from 'mode-watcher';

	type MenuItem = {
		title: string;
		url: string;
		icon: typeof IconType;
	};

	// Menu items.
	const mainItems: MenuItem[] = [
		{
			title: 'Home',
			url: '/',
			icon: House
		},
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: Columns3
		},
		{
			title: 'Anomalyzer',
			url: '/anomalyzer',
			icon: ChartPie
		}
	];

	const bottomItems: MenuItem[] = [
		{
			title: 'Settings',
			url: '/settings',
			icon: Settings2
		}
	];
</script>

{#snippet groupContent(items: MenuItem[])}
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton size="default" isActive={page.url.pathname === item.url}>
						{#snippet child({ props })}
							<a href={item.url} {...props}>
								<item.icon />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
{/snippet}

<Sidebar.Root collapsible="offcanvas" variant="inset">
	<Sidebar.Header class="p-3">
		<h1
			class="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text font-mono text-3xl font-light text-transparent"
		>
			ClarifAI
		</h1>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
			{@render groupContent(mainItems)}
		</Sidebar.Group>
		<Sidebar.Group class="mt-auto">
			{@render groupContent(bottomItems)}
		</Sidebar.Group>
	</Sidebar.Content>
	<Separator class="mt-2" />
	<Sidebar.Footer>
		{#if $mode === 'light'}
			<img alt="University of Mannheim Logo" src={LightLogo} />
		{:else}
			<img alt="University of Mannheim Logo" src={DarkLogo} />
		{/if}
	</Sidebar.Footer>
</Sidebar.Root>
