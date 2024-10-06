// eslint-disable-next-line import/no-unresolved
import { userscript } from "esbuild-plugin-userscript"
import { defineConfig } from "tsup"
import pkg from "@root/package.json" assert { type: "json" }

const dev = process.env.ENVIRONMENT === "development"

const metadata = {
	name: "c.AI Search Sort",
	author: pkg.author,
	description: pkg.description,
	license: pkg.license,
	version: process.env.VERSION || pkg.version,
	namespace: "https://c.ai",
	match: "https://character.ai/search*",
	"run-at": "document-body",
	icon: "https://www.google.com/s2/favicons?sz=64&domain=character.ai",
}

// eslint-disable-next-line import/no-default-export
export default defineConfig({
	entry: ["src/index.ts"],
	format: "iife",
	target: "es6",
	bundle: true,
	outDir: "build",
	minify: dev,
	clean: false,
	outExtension: () => {
		return { js: ".user.js", dts: ".user.dts" }
	},
	esbuildPlugins: [
		userscript({
			metadata,
			proxy: dev
				? {
						port: 8080,
						metadata,
						targets: () => true,
					}
				: undefined,
		}),
	],
})
