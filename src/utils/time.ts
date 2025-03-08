type Duration = {
	seconds?: number
	minutes?: number
	hours?: number
}

/**
 * Transform any duration in milliseconds
 * @param opts Duration units to convert
 */
export function toMilliseconds(opts: Duration) {
	let count = 0

	if (opts.seconds) {
		count += opts.seconds * 1000
	}

	if (opts.minutes) {
		count += opts.minutes * 1000 * 60
	}

	if (opts.hours) {
		count += opts.hours * 1000 * 60 * 60
	}

	return count
}
