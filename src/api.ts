export class CAPI {
	private pageProps: { token: string }
	public token: string

	constructor() {
		this.pageProps = JSON.parse(
			document.querySelector("#__NEXT_DATA__")!.textContent!,
		)!.props!.pageProps!
		this.token = this.pageProps.token
	}

	async getCharacterInfo(id: string) {
		return await fetch(`https://plus.character.ai/chat/character/info/`, {
			headers: {
				Authorization: `Token ${this.token}`,
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
}
