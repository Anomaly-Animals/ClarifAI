import type { Booking } from '$lib/domain/Booking.js';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { base } from '$app/paths';
import type { CsvBooking } from '$lib/domain/CsvBooking';

export async function load() {
	const filePath = path.resolve(base, 'static', 'anomal_data.csv'); // Path to the CSV file in the static folder
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const parsedCsv = Papa.parse<CsvBooking>(fileContent, {
		header: true,
		delimiter: ',',
		skipEmptyLines: true
	});

	if (parsedCsv.errors.length !== 0) {
		return {
			error: {
				code: 500,
				message: 'Something went wrong!'
			}
		};
	}

	// Map the raw data to the Booking interface
	const bookings: Booking[] = parsedCsv.data.map((row) => ({
		documentNumber: row.BELNR,
		companyCode: row.BUKRS,
		postingKey: row.KTOSL,
		generalLedgerAccount: row.HKONT,
		generalLedgerAccountKey: row.BSCHL,
		profitCenter: row.PRCTR,
		currencyKey: row.WAERS,
		documentCurrencyAmount: parseFloat(row.DMBTR).toFixed(2),
		localCurrencyAmount: parseFloat(row.WRBTR).toFixed(2)
	}));

	return {
		bookings
	};
}
