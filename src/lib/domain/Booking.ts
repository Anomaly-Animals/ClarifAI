/**
 * Represents a financial booking or transaction entry within an SAP accounting system.
 * This interface is used to capture and organize detailed information related to
 * the posting of financial transactions in the company's accounting records.
 * It includes key details such as the type of transaction, associated accounts,
 * currencies, and the amounts involved.
 */
export interface Booking {
	/**
	 * Unique identifier for a specific booking entry. This could represent a receipt number or any other
	 * system-generated identifier that ensures the booking entry is distinct.
	 */
	documentNumber: string;

	/**
	 * Represents the accounting instance within a company, typically corresponding to different departments or
	 * business units that manage their own finances separately. Example: 'IT Department', 'Sales Department'.
	 */
	companyCode: string;

	/**
	 * Identifies the type of operation performed in this booking entry. It categorizes the transaction,
	 * such as a deposit, withdrawal, or other types of financial operations that impact the accounts.
	 * Example: 'Deposit', 'Withdrawal', 'Transfer'.
	 */
	postingKey: string;

	/**
	 * General Ledger (GL) account used to classify the booking entry. GL accounts categorize transactions for
	 * financial reporting. For example: 'Cash', 'Accounts Receivable', 'Revenue'.
	 */
	generalLedgerAccount: string;

	/**
	 * A key or unique identifier that helps further distinguish between different sub-categories or divisions
	 * of a particular general ledger account. It provides more granular tracking within a specific GL account.
	 * Example: 'Accounts Receivable - North America', 'Revenue - Product X'.
	 */
	generalLedgerAccountKey: string;

	/**
	 * Represents a segment within the company that is used to track profitability, cost, or revenue.
	 * Profit centers are often used to analyze performance by departments, product lines, or business units.
	 * Example: 'Product Line A', 'North America Sales', 'Customer Support'.
	 */
	profitCenter: string;

	/**
	 * The currency key representing the currency in which the transaction was originally conducted.
	 * This key refers to a specific currency such as 'EUR' (Euro), 'USD' (United States Dollar), or 'GBP' (British Pound).
	 */
	currencyKey: string;

	/**
	 * The monetary amount in the original currency used in the transaction (e.g., if the transaction was in USD,
	 * this would represent the amount in USD).
	 */
	documentCurrencyAmount: string;

	/**
	 * The equivalent monetary amount in the company's local operating currency (e.g., if the company operates
	 * primarily in Germany, this field would represent the amount in EUR, which may be different from the document currency).
	 */
	localCurrencyAmount: string;
}
