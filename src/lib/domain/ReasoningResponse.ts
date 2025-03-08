import type { Booking } from './Booking';

export interface AnomalyFeature {
	feature: string; // The name of the feature (e.g., 'HKONT')
	reason: string; // The reason why the feature is flagged as part of the anomaly
	value: string; // The value of the feature (e.g., 'D68')
}

export interface Reasoning {
	anomaly_features: AnomalyFeature[]; // Array of anomaly features
	is_anomaly: boolean; // Boolean indicating if the document is an anomaly
	message: string; // String containing a status message
}

export interface ReasoningResponse {
	data: Array<{
		BELNR: string; // Document number (BELNR)
		BSCHL: string; // BSCHL (accounting document type)
		BUKRS: string; // Company code
		DMBTR: number; // Amount in local currency
		HKONT: string; // Account number
		KTOSL: string; // Cost element
		PRCTR: string; // Profit center
		WAERS: string; // Currency key
		WRBTR: number; // Amount in transaction currency
	}>;
	message: string; // Message received (e.g., "JSON received")
	reasoning: Reasoning; // Reasoning behind the anomaly detection
}

// Function to map ReasoningResponse to a single Booking object
export function mapReasoningResponseToBooking(response: ReasoningResponse): Booking {
	// Assuming data has only one element (1:1 mapping)
	const item = response.data[0];

	return {
		documentNumber: item.BELNR, // Mapping BELNR to documentNumber
		companyCode: item.BUKRS, // Mapping BUKRS to companyCode
		postingKey: item.BSCHL, // Mapping BSCHL to postingKey
		generalLedgerAccount: item.HKONT, // Mapping HKONT to generalLedgerAccount
		generalLedgerAccountKey: item.KTOSL, // Mapping KTOSL to generalLedgerAccountKey
		profitCenter: item.PRCTR, // Mapping PRCTR to profitCenter
		currencyKey: item.WAERS, // Mapping WAERS to currencyKey
		documentCurrencyAmount: item.DMBTR.toString(), // Mapping DMBTR to documentCurrencyAmount as string
		localCurrencyAmount: item.WRBTR.toString() // Mapping WRBTR to localCurrencyAmount as string
	};
}
