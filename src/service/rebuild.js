import { useState } from 'react';
import { Base64 } from 'js-base64';
import { rebuildToken, authUser } from './auth/auth';
import gitClient from './gitClient';
import { Alert } from 'components';

const options = {
	owner: 'iammrsea',
	repo: 'ecommerce',
	path: 'rebuild/data.json',
};

const client = () => {
	return gitClient(rebuildToken());
};

const getContents = options => {
	return client().repos.getContents(options);
};
const saveContents = options => {
	return client().repos.createOrUpdateFile(options);
};

const useRebuild = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const rebuild = async () => {
		try {
			setLoading(true);
			const {
				data: { sha, content },
			} = await getContents(options);

			let decodedContent = JSON.parse(Base64.decode(content));
			if (!Object.keys(decodedContent).length > 0) {
				const newContent = {
					[authUser().username]: {
						request: 'rebuild site',
						date: new Date().toISOString(),
					},
				};
				await saveContents({
					...options,
					message: 'A request to rebuild site',
					content: Base64.encode(JSON.stringify(newContent)),
					sha,
				});
			} else {
				decodedContent[authUser().username] = {
					request: 'rebuild site',
					date: new Date().toISOString(),
				};
				await saveContents({
					...options,
					message: 'A request to rebuild site',
					content: Base64.encode(JSON.stringify(decodedContent)),
					sha,
				});
			}
			setLoading(false);
			Alert({ message: 'Request successfully sent', color: 'green' });
		} catch (e) {
			setLoading(false);
			setError(e);
		}
	};
	return { rebuild, loading, error };
};

export default useRebuild;
