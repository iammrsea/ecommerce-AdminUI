const activeRoute = routeName => {
	const urlParts = routeName.split('/');
	return window.location.href.endsWith(urlParts[urlParts.length - 1]);
};
export default activeRoute;
