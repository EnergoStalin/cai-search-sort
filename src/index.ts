import { CAPI } from "./api"
import {
	clearStatus,
	isStarred,
	setPendingStatus,
	setStarredStatus,
} from "./statuses"
import { waitNotNull } from "./util"

waitNotNull(() =>
	document
		.evaluate(
			"/html/body/div[1]/div/main/div/div/div/main/div/div[2]",
			document,
		)
		.iterateNext(),
).then((node) => {
	const cardsContainer = node as HTMLElement
	const capi = new CAPI()

	const cardsObserver = new MutationObserver(sortSearches)
	function sortSearches() {
		cardsObserver.disconnect()
		const nodes = Array.from(
			cardsContainer.childNodes,
		) as unknown as HTMLElement[]

		Promise.all(
			nodes.map(async (card) => {
				if (isStarred(card)) return

				setPendingStatus(card)
				const info = await capi.getCharacterInfo(
					(card as HTMLLinkElement).href.split("/").pop()!,
				)
				clearStatus(card)

				if (info.definition) {
					setStarredStatus(
						card,
						`${info.description.length}/${info.definition.length}`,
					)
				} else {
					cardsContainer.append(card)
				}

				return [info.definition?.length, info.description?.length]
			}),
		).then((e) => {
			console.log(e)

			cardsObserver.observe(cardsContainer, {
				attributes: false,
				childList: true,
				subtree: false,
			})
		})
	}

	sortSearches()
})
