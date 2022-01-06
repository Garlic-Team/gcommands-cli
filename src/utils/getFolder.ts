export const getFolder = (config, type) => {
	if (type === 'command') return config.dirs.commands;
	else if (type === 'listener') return config.dirs.listeners;
	else if (type === 'inhibitor') return config.dirs.inhibitors;
};