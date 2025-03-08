import type { ReasoningResponse } from '$lib/domain/ReasoningResponse';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ReasoningRequest } from '$lib/domain/ReasoningRequest';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const documentNumber = url.searchParams.get('documentNumber');
	console.log(documentNumber);

	const requestBody: ReasoningRequest = {
		anomaly_belnr: documentNumber || ''
	};

	const response = await fetch(`http://127.0.0.1:5000/reasoning`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	});

	if (!response.ok) {
		console.log(response);
		const error = 'Something went wrong';

		return json(error, { status: 500 });
	}

	const reasoningResponse: ReasoningResponse = await response.json();
	return json(reasoningResponse, { status: 200 });
};
