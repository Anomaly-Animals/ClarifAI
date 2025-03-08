<script lang="ts">
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { mapReasoningResponseToBooking, type Reasoning } from '$lib/domain/ReasoningResponse';
	import { anomalyzerState } from '$lib/state/anomalyzerState.svelte';
	import { fade } from 'svelte/transition';
	import NewViolationReasonCell from './NewViolationReasonCell.svelte';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import { MessageCircleWarningIcon } from 'lucide-svelte';

	// Mapping of faulty cells to reasons
	const featureToReasonMapping: { [key: string]: string } = {
		companyCode: 'This company code is unique and not found in previous transactions.',
		postingKey: 'This posting key is unique and not found in previous transactions.',
		generalLedgerAccount:
			'This general ledger account is unique and not found in previous transactions.',
		generalLedgerAccountKey:
			'This general ledger account key is unique and not found in previous transactions.',
		profitCenter: 'This profit center is unique and not found in previous transactions.',
		currencyKey: 'This currency key is unique and not found in previous transactions.',
		documentCurrencyAmount: 'Have a look at the Suspicious Ranges Section for more details.',
		localCurrencyAmount: 'Have a look at the Suspicious Ranges Section for more details.'
	};
	const {
		companyCode,
		currencyKey,
		documentCurrencyAmount,
		documentNumber,
		generalLedgerAccount,
		generalLedgerAccountKey,
		localCurrencyAmount,
		postingKey,
		profitCenter
	} = $derived(mapReasoningResponseToBooking(anomalyzerState.reasonings!));

	// Get faulty cells based on anomaly features
	const getFaultyCells = (reasonings: Reasoning) => {
		const faultyCells: Set<string> = new Set();
		const rangeFeatures: Array<{ feature: string; reason: string }> = [];

		// Mapping feature names to table columns
		const featureToColumnMapping: { [key: string]: string } = {
			BUKRS: 'companyCode',
			BSCHL: 'postingKey',
			HKONT: 'generalLedgerAccount',
			KTOSL: 'generalLedgerAccountKey',
			PRCTR: 'profitCenter',
			WAERS: 'currencyKey',
			DMBTR: 'documentCurrencyAmount',
			WRBTR: 'localCurrencyAmount'
		};

		// Add faulty cells to the set based on anomaly features
		reasonings.anomaly_features.forEach((feature) => {
			if (feature.feature.includes('DMBTR_WRBTR_RANGE')) {
				// Store the range feature and its reason
				rangeFeatures.push({
					feature: feature.feature,
					reason: feature.reason
				});
			} else {
				// Handle categorical features
				const columnName = featureToColumnMapping[feature.feature];
				if (columnName) {
					faultyCells.add(columnName);
				}
			}
		});

		return { faultyCells, rangeFeatures };
	};

	// Get the set of faulty cells and range features based on anomaly features
	const { faultyCells, rangeFeatures } = $derived(
		getFaultyCells(anomalyzerState.reasonings?.reasoning!)
	);

	// Map faulty cells to their reasons
	const mapFaultyCellsToReasons = (faultyCells: Set<string>) => {
		return Array.from(faultyCells).map((cell) => {
			return featureToReasonMapping[cell] || `No reason found for ${cell}`;
		});
	};

	// Get the reasons for the faulty cells
	const faultyCellReasons = $derived(mapFaultyCellsToReasons(faultyCells));

	const determineFaultyCell = (key: string) =>
		faultyCells.has(key) ||
		((key === 'documentCurrencyAmount' || key === 'localCurrencyAmount') &&
			rangeFeatures.length > 0);
</script>

{#snippet tableCell(content: string, key: string)}
	<td
		class={[
			'mx-4 mt-2 whitespace-nowrap rounded-xl p-2 px-4 py-2 font-medium text-gray-700 dark:text-white',
			determineFaultyCell(key) && 'bg-orange-200/40'
		]}
	>
		{#if determineFaultyCell(key)}
			<HoverCard.Root>
				<HoverCard.Trigger
					class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
				>
					{content}
				</HoverCard.Trigger>
				<HoverCard.Content class="w-80">
					<div class="flex items-center justify-center space-x-4">
						<MessageCircleWarningIcon size="48" class="flex justify-center text-red-500" />
						<div class="space-y-1">
							<h4 class="text-sm font-semibold">Violation reason</h4>
							<p class="text-sm">{featureToReasonMapping[key]}</p>
						</div>
					</div>
				</HoverCard.Content>
			</HoverCard.Root>
		{:else}
			{content}
		{/if}
	</td>
{/snippet}

<div class="mb-16 flex h-full flex-col gap-16 p-4" transition:fade>
	<div>
		<h1 class="scroll-m-20 text-3xl font-extrabold leading-none tracking-tight">
			Document Number: {documentNumber}
		</h1>
		<Separator class="mb-4 mt-2" />
		<h2 class="scroll-m-20 text-2xl font-bold leading-none tracking-tight">Anomalies detected!</h2>
	</div>
	<div class="flex h-1/2 items-center">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead
				class="rounded-lg bg-gradient-to-r from-purple-300/40 to-teal-200/40 text-xs uppercase text-gray-700 dark:text-gray-300"
			>
				<tr>
					<th scope="col" class="px-4 py-3">Company Code</th>
					<th scope="col" class="px-4 py-3">Posting Key</th>
					<th scope="col" class="px-4 py-3">General Ledger Account</th>
					<th scope="col" class="px-4 py-3">General Ledger Account Key</th>
					<th scope="col" class="px-4 py-3">Profit Center</th>
					<th scope="col" class="px-4 py-3">Currency Key</th>
					<th scope="col" class="px-4 py-3">Document Currency Amount</th>
					<th scope="col" class="px-4 py-3">Local Curency Amount</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
					{@render tableCell(companyCode, 'companyCode')}
					{@render tableCell(postingKey, 'postingKey')}
					{@render tableCell(generalLedgerAccount, 'generalLedgerAccount')}
					{@render tableCell(generalLedgerAccountKey, 'generalLedgerAccountKey')}
					{@render tableCell(profitCenter, 'profitCenter')}
					{@render tableCell(currencyKey, 'currencyKey')}
					{@render tableCell(documentCurrencyAmount, 'documentCurrencyAmount')}
					{@render tableCell(localCurrencyAmount, 'localCurrencyAmount')}
				</tr>
			</tbody>
		</table>
	</div>
	<div class="mt-auto">
		<h2 class="scroll-m-20 text-3xl font-extrabold leading-none tracking-tight">
			Violation Reasons
		</h2>
		<Separator class="my-6" />
		<div
			class={[
				'flex flex-row gap-8',
				!(faultyCells.size > 0 && rangeFeatures.length > 0) && 'justify-center'
			]}
		>
			{#if faultyCells.size > 0}
				<NewViolationReasonCell
					title={'Unique Entries Detected'}
					description={'These entries appear to be unique in the context of your transactions. Please verify if this is intentional or possibly an error.'}
					reasons={faultyCellReasons}
				/>
			{/if}
			{#if faultyCells.size > 0 && rangeFeatures}
				<Separator class="mx-4" orientation="vertical" />
			{/if}
			{#if rangeFeatures.length > 0}
				<NewViolationReasonCell
					title={'Suspicious Range Detected'}
					description={'The amounts in this transaction fall within previously observed suspicious ranges. Please double-check if this is expected behavior.'}
					reasons={rangeFeatures.map((range) => `${range.feature}: ${range.reason}`)}
				/>
			{/if}
		</div>
	</div>
</div>
