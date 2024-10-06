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

		if (info.definition) {
			setStarredStatus(
				card,
				`${info.description.length}/${info.definition.length}`,
			)
		} else {
			container.append(card)
		}

		return [card, info.definition?.length, info.description?.length]
	})

	return Promise.all(promises)
}

function sortByDefinitionLength(
	entries: (number | HTMLElement)[][],
	container: HTMLElement,
) {
	entries
		.filter(([_c, dl, _dl]) => (dl ?? 0) !== 0)
		.sort(([_c1, dl1, _dl1], [_c2, dl2, _dl2]) => (dl1! < dl2! ? 1 : -1))
		.map(([c, _dfl, _dsl]) => c as HTMLElement)
		.reverse()
		.forEach((e) => container.insertBefore(e, container.firstChild))
}

export async function sort(observer: MutationObserver, container: HTMLElement) {
	observer.disconnect()

	sortByDefinitionLength(await _sort(container), container)

	observer.observe(container, {
		attributes: false,
		childList: true,
		subtree: false,
	})
}
