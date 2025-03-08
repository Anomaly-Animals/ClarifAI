import type { ReasoningResponse } from '$lib/domain/ReasoningResponse';

// Interface defining the shape of AnomalyzerState
export interface AnomalyzerState {
	pageLoading: boolean;
	mountedOnBottom: boolean;
	searchSuccessful: boolean;
	faultyState: boolean;
	showApiError: boolean;
	documentNumber: string;
	reasonings?: ReasoningResponse;
}

// Initial state for Anomalyzer
export const anomalyzerState: AnomalyzerState = $state({
	pageLoading: false,
	mountedOnBottom: false,
	searchSuccessful: false,
	faultyState: false,
	showApiError: false,
	documentNumber: ''
});

// Function to clear/reset the state to initial values
export const clearAnomalyzerState = (): void => {
	anomalyzerState.pageLoading = false;
	anomalyzerState.mountedOnBottom = false;
	anomalyzerState.searchSuccessful = false;
	anomalyzerState.faultyState = false;
	anomalyzerState.showApiError = false;
	anomalyzerState.documentNumber = '';
	anomalyzerState.reasonings = undefined;
};

export const showApiError = (): void => {
	anomalyzerState.showApiError = true;
	setTimeout(() => (anomalyzerState.showApiError = false), 1500);
};
