import { getCharacterInfo } from "@/api"
import {
	clearStatus,
	isStarred,
	setPendingStatus,
	setStarredStatus,
} from "@/statuses"

async function _sort(container: HTMLElement) {
	const nodes = Array.from(container.childNodes) as unknown as HTMLElement[]

	const promises = nodes.map(async (card) => {
		if (isStarred(card)) return []

		setPendingStatus(card)
		const info = await getCharacterInfo(
			(card as HTMLLinkElement).href.split("/").pop()!,
		)
		clearStatus(card)

		if (info.description?.length > 0) {
			setStarredStatus(card, info.description.length)
		} else {
			container.append(card)
		}

		return [card, info.description?.length]
	})

	return Promise.all(promises)
}

function sortByDefinitionLength(
	entries: (number | HTMLElement)[][],
	container: HTMLElement,
) {
	const sorted = entries
		.filter(([_, dl]) => dl)
		.sort(([_c1, dl1], [_c2, dl2]) => (dl1! > dl2! ? 1 : -1))

	for (const [c] of sorted) {
		container.insertBefore(c as HTMLElement, container.firstChild)
	}
}

export async function sort(observer: MutationObserver, container: HTMLElement) {
	observer.disconnect()

	const entries = await _sort(container)
	sortByDefinitionLength(entries, container)

	observer.observe(container, {
		attributes: false,
		childList: true,
		subtree: false,
	})
}
