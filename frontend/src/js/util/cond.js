export default function cond(condition, options) {
	if (condition in options) {
		return options[condition]();
	}
	if ('default' in options) {
		return options.default();
	}
}
