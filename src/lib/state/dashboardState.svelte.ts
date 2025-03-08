export interface DashboardState {
	shouldShowAlert: boolean;
}

export const dashboardState: DashboardState = $state({
	shouldShowAlert: false
});

export const showAlert = () => {
	dashboardState.shouldShowAlert = true;

	setTimeout(() => {
		dashboardState.shouldShowAlert = false;
	}, 2000);
};
