// Magic! don't look!!!

export async function waitNotNull<T>(
	func: () => Promise<T | null> | T | null,
	timeout = 10000,
	interval = 1000,
): Promise<T> {
	return new Promise<T>((res, rej) => {
		let time = timeout
		const i = setInterval(async () => {
			const c = await func()
			time -= interval
			if (time <= 0) {
				clearInterval(i)
				rej!()
			}
			if (!c) return

			clearInterval(i)
			res!(c)
		}, interval)
	})
}

export function injectNavigationHook(callback: (oldLocation: string) => void) {
	let old = unsafeWindow.location.href
	new MutationObserver(() => {
		if (old === unsafeWindow.location.href) return
		old = unsafeWindow.location.href

		callback(old)
	}).observe(unsafeWindow.document.body, {
		subtree: true,
		childList: true,
	})

	callback(old)
}
