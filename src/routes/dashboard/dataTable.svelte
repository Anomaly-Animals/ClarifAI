<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type ColumnFiltersState,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type PaginationState,
		type SortingState,
		type VisibilityState
	} from '@tanstack/table-core';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import {
		Check,
		ChevronLeft,
		ChevronRight,
		ArrowBigRightDash,
		ArrowBigLeftDash,
		Lasso
	} from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { dashboardState } from '$lib/state/dashboardState.svelte';
	import { fade } from 'svelte/transition';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
	};

	let { data, columns }: DataTableProps<TData, TValue> = $props();

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get columnVisibility() {
				return columnVisibility;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		}
	});
</script>

<div>
	<!-- FILTERS AND VISIBILITY -->
	<div class="my-4 flex items-center rounded-lg border bg-white p-4 shadow-md">
		<!-- FILTERS -->
		<Input
			placeholder={'Search for document number...'}
			value={(table.getColumn('documentNumber')?.getFilterValue() as string) ?? ''}
			onchange={(e) => {
				table.getColumn('documentNumber')?.setFilterValue(e.currentTarget.value);
			}}
			oninput={(e) => {
				table.getColumn('documentNumber')?.setFilterValue(e.currentTarget.value);
			}}
			class="max-w-xs"
		/>

		<!-- VISIBILITY -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="ml-auto">
						<Lasso />
						<p>Visible Columns</p>
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				{#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column.id)}
					<DropdownMenu.CheckboxItem
						class="capitalize"
						bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
					>
						{column.id}
					</DropdownMenu.CheckboxItem>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>

	<!-- CONTENT -->
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head>
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<!-- PAGINATION -->
	<div class="mt-4 flex w-full justify-end space-x-8">
		<div class="flex items-center space-x-2">
			<p class="text-sm font-medium">Rows per page</p>
			<Select.Root
				type="single"
				onValueChange={(value) => table.setPageSize(Number(value))}
				name="Test"
			>
				<Select.Trigger class="h-8 w-[70px]">{pagination.pageSize}</Select.Trigger>
				<Select.Content>
					<Select.Item value="10">10</Select.Item>
					<Select.Item value="20">20</Select.Item>
					<Select.Item value="30">30</Select.Item>
					<Select.Item value="40">40</Select.Item>
					<Select.Item value="50">50</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="ml-auto flex w-[100px] items-center justify-center text-sm font-medium">
			Page {pagination.pageIndex + 1} of {table.getPageCount()}
		</div>
		<div class="flex items-center space-x-2">
			<Button
				variant="outline"
				class="hidden h-8 w-8 p-0 lg:flex"
				onclick={() => table.setPageIndex(0)}
				disabled={!table.getCanPreviousPage()}
			>
				<span class="sr-only">Go to first page</span>
				<ArrowBigLeftDash size={15} />
			</Button>
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				onclick={() => table.setPageIndex(pagination.pageIndex - 1)}
				disabled={!table.getCanPreviousPage()}
			>
				<span class="sr-only">Go to previous page</span>
				<ChevronLeft size={15} />
			</Button>
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				disabled={!table.getCanNextPage()}
				onclick={() => table.setPageIndex(pagination.pageIndex + 1)}
			>
				<span class="sr-only">Go to next page</span>
				<ChevronRight size={15} />
			</Button>
			<Button
				variant="outline"
				class="hidden h-8 w-8 p-0 lg:flex"
				disabled={!table.getCanNextPage()}
				onclick={() => table.setPageIndex(Math.ceil(table.getRowCount() / pagination.pageSize) - 1)}
			>
				<span class="sr-only">Go to last page</span>
				<ArrowBigRightDash size={15} />
			</Button>
		</div>
	</div>
</div>

{#if dashboardState.shouldShowAlert}
	<div transition:fade>
		<Alert.Root class="justify-content center fixed bottom-5 left-1/2 -ml-48 w-96">
			<Alert.Description class="flex flex-row gap-4">
				<Check class="text-green-500" />
				<p>Document number was copied to the clipboard.</p>
			</Alert.Description>
		</Alert.Root>
	</div>
{/if}
