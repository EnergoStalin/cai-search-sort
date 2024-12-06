import "./styles/tooltip.css"
import "./styles/bootstrap.css"
import { pendingIcon, starredIcon } from "./icons"

export function clearStatus(card: HTMLElement) {
	card.querySelector("div[data-status]")?.remove()
}

export function statusWrapper(card: HTMLElement, status: string) {
	const d = document.createElement("div")
	d.dataset.status = status
	d.classList.add("flex", "flex-col", "tooltip")

	card.classList.add("align-items-start")
	card.append(d)

	return d
}

export function isStarred(card: HTMLElement) {
	return Boolean(card.querySelector('div[data-status="starred"]'))
}
export function setStarredStatus(card: HTMLElement, descriptionLength: number) {
	statusWrapper(card, "starred").innerHTML = `
		<div class="flex grow-0 shrink-0 justify-center">
			${starredIcon}
		</div>
		<div class="flex flex-row gap-1 tooltip-text">
			<span class="tooltip-even">Description</span>
			<span class="tooltip-even tooltip-number">${descriptionLength}</span>
		</div>
	`
}

export function setPendingStatus(card: HTMLElement) {
	statusWrapper(card, "pending").innerHTML = `
		<div class="flex flex-row grow-0 shrink-0 w-full items-center justify-center">
			${pendingIcon}
		</div>
	`
}
