<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { default as AppSidebar } from '$lib/components/layout/Sidebar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeSwitcher from '$lib/components/layout/ThemeSwitcher.svelte';
	import BreadcrumbSection from '$lib/components/layout/BreadcrumbSection.svelte';

	let { children } = $props();
</script>

<!-- Background listener for theme changes -->
<ModeWatcher />

<!-- Fixed theme switcher icon -->
<ThemeSwitcher />

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2">
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<BreadcrumbSection />
			</div>
		</header>
		<Separator />
		<main class="m-4 flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
