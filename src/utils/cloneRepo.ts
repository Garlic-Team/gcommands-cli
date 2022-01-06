import clone from 'github-clone-repo';

interface CloneOptions {
    owner: string;
    repository: string;
    branch: string;
    'project-name': string;
}

export default async(options: CloneOptions) => {
	const cloned = await clone({
		owner: options.owner,
		repository: options.repository,
		branch: options.branch,
		outPath: `./${options['project-name']}`
	});

	return cloned;
};