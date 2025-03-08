export interface AnomalyFeature {
	feature: string;
	reason: string;
	value: string;
}

export interface Reasoning {
	anomaly_features: AnomalyFeature[];
	is_anomaly: boolean;
}

export interface ReasoningResponse {
	data: {
		anomaly_belnr: string;
	};
	message: string;
	reasoning: Reasoning;
}
