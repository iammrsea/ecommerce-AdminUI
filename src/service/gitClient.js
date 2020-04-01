import { Octokit } from '@octokit/rest';

export default accessToken => {
	return new Octokit({
		auth: accessToken,
	});
};
