import "./styles/tooltip.css"
import { pendingIcon, starredIcon } from "./icons"

export function clearStatus(card: HTMLElement) {
	card.querySelector("div[data-status]")?.remove()
}

export function statusWrapper(card: HTMLElement, status: string) {
	const height = card.querySelector("img")?.height
	const d = document.createElement("div")
	d.dataset.status = status
	d.classList.add("flex", "items-center", "relative", "flex-row", "tooltip")
	d.style = `min-height: ${height}px; flex-direction: column;`

	card.append(d)

	return d
}

export function isStarred(card: HTMLElement) {
	return Boolean(card.querySelector('div[data-status="starred"]'))
}
export function setStarredStatus(card: HTMLElement, label: string) {
	statusWrapper(card, "starred").innerHTML = `
		<div class="flex w-full" style="justify-content: center;">
			${starredIcon}
		</div>
		<span class="w-full tooltiptext">${label}</span>
	`
}

export function setPendingStatus(card: HTMLElement) {
	statusWrapper(card, "pending").innerHTML = `
		<div class="flex w-full items-center">
			${pendingIcon}
		</div>
	`
}
