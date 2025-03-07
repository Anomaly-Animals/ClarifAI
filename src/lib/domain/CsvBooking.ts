/**
 * Represents the structure of a single row in the CSV file.
 * This interface is used to map the CSV headers to an object structure
 * before transforming it into the `Booking` type.
 */
export interface CsvBooking {
	BELNR: string; // Document number
	WAERS: string; // Currency key (e.g., 'USD', 'EUR')
	BUKRS: string; // Company code (e.g., 'IT', 'Sales')
	KTOSL: string; // Posting key (e.g., 'Debit', 'Credit')
	PRCTR: string; // Profit center (e.g., 'North America')
	BSCHL: string; // General ledger account key
	HKONT: string; // General ledger account (e.g., 'Cash', 'Receivables')
	DMBTR: string; // Amount in document currency
	WRBTR: string; // Amount in local currency
}
