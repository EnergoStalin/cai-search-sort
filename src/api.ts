import { waitNotNull } from "./util"

const pageProps = await waitNotNull(
	() => document.querySelector("#__NEXT_DATA__")?.textContent,
).then((e) => JSON.parse(e!).props.pageProps)

export const token: string = pageProps.token

export async function getCharacterInfo(id: string) {
	return await fetch(`https://plus.character.ai/chat/character/info/`, {
		headers: {
			Authorization: `Token ${token}`,
			Origin: "https://character.ai/",
			Referer: "https://character.ai/",
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		method: "POST",
		body: JSON.stringify({ external_id: id }),
	})
		.then((e) => e.json())
		.then((e) => e.character)
}
