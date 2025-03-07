import { BreadcrumbItem } from '$lib/domain/BreadcrumbItem';

export const breadcrumbMapping: Map<string, { breadcrumb: BreadcrumbItem; url: string }[]> =
	new Map([
		[
			'/dashboard',
			[
				{ breadcrumb: BreadcrumbItem.Platform, url: '/' },
				{ breadcrumb: BreadcrumbItem.Dashboard, url: '/dashboard' }
			]
		],
		['/', [{ breadcrumb: BreadcrumbItem.Homepage, url: '/' }]],
		['/settings', [{ breadcrumb: BreadcrumbItem.Settings, url: '/settings' }]],
		[
			'/anomalyzer',
			[
				{ breadcrumb: BreadcrumbItem.Platform, url: '/' },
				{ breadcrumb: BreadcrumbItem.Anomalyzer, url: '/anomalyzer' }
			]
		]
	]);

// Determine the breadcrumbs for a given route
export function determineBreadcrumbs(path: string) {
	// Return the breadcrumbs for the given path, or an empty array if the path is not found
	return breadcrumbMapping.get(path) || [];
}
