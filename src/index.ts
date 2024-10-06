import { sort } from "./sorting/definition"
import { waitNotNull } from "./util"

const cardsContainer = (await waitNotNull(() =>
	document
		.evaluate(
			"/html/body/div[1]/div/main/div/div/div/main/div/div[2]",
			document,
		)
		.iterateNext(),
)) as HTMLElement

const sortSearches: MutationCallback = (_, observer) =>
	sort(observer, cardsContainer)

sortSearches([], new MutationObserver(sortSearches))
