<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import logo from '$lib/assets/LogoEbnerStolz.png';
	import { Separator } from '$lib/components/ui/separator/index';
</script>

<div class="flex h-full flex-row gap-4">
	<section class="w-1/2"></section>
	<Separator orientation="vertical" class="mx-8" />
	<section class="flex h-full flex-1 items-center">
		<div class="mx-auto">
			<h1
				class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl"
			>
				Analyze Your Suspicious Transactions Now!
			</h1>
			<p class="mb-8 max-w-2xl text-xl font-light text-gray-500 dark:text-gray-400">
				Explore suspicious transactions on the dashboard, where you can view flagged entries, see
				the reasoning behind the flags, and drill down for more detailed analysis. Alternatively,
				enter any data into our Anomalyzer to check if it could be flagged as suspicious, with clear
				reasoning and highlights explaining the decision.
			</p>

			<Button href="/dashboard">Go to Dashboard</Button>
			<Button variant="link" href="/anomalyzer">Try the Anomalyzer</Button>

			<Separator class="my-8" />

			<div class="mx-auto mt-4 flex w-1/3 flex-col items-center">
				<p class="my-auto mb-2 max-w-2xl text-xl font-light text-gray-500 dark:text-gray-400">
					Sponsored by
				</p>
				<img alt="Logo of RSM Ebner Stolz" src={logo} />
			</div>
		</div>
	</section>
</div>
