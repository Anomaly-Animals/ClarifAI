import { renderComponent, renderSnippet } from '$lib/components/ui/data-table';
import type { Booking } from '$lib/domain/Booking';
import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import DataTableActions from './dataTableActions.svelte';
import DataTableSortButton from './dataTableSortButton.svelte';

const formatter = new Intl.NumberFormat('de-DE');

const amountCellSnippet = createRawSnippet<[string]>((getAmount) => {
	const amount = getAmount();
	return {
		render: () => `<div class="font-medium">${amount}</div>`
	};
});

export const columns: ColumnDef<Booking>[] = [
	{
		accessorKey: 'documentNumber',
		header: 'Document Number'
	},
	{
		accessorKey: 'companyCode',
		header: 'Company Code'
	},
	{
		accessorKey: 'postingKey',
		header: 'Posting Key'
	},
	{
		accessorKey: 'generalLedgerAccount',
		header: 'General Ledger Account'
	},
	{
		accessorKey: 'generalLedgerAccountKey',
		header: 'General Ledger Account Key'
	},
	{
		accessorKey: 'profitCenter',
		header: 'Profit Center'
	},
	{
		accessorKey: 'currencyKey',
		header: 'Currency Key'
	},
	{
		accessorKey: 'documentCurrencyAmount',
		header: ({ column }) =>
			renderComponent(DataTableSortButton, {
				sortHandler: () => column.toggleSorting(column.getIsSorted() === 'asc'),
				buttonText: 'Document Currency Amount',
				currentSortOption: column.getIsSorted()
			}),
		cell: ({ row }) => {
			return renderSnippet(
				amountCellSnippet,
				formatter.format(parseFloat(row.getValue('documentCurrencyAmount')))
			);
		}
	},
	{
		accessorKey: 'localCurrencyAmount',
		header: ({ column }) =>
			renderComponent(DataTableSortButton, {
				sortHandler: () => column.toggleSorting(column.getIsSorted() === 'asc'),
				buttonText: 'Local Curency Amount',
				currentSortOption: column.getIsSorted()
			}),
		cell: ({ row }) => {
			return renderSnippet(
				amountCellSnippet,
				formatter.format(parseFloat(row.getValue('localCurrencyAmount')))
			);
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { documentNumber: row.original.documentNumber });
		}
	}
];
