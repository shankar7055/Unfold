<p align="center">
  <a href="https://unfold.dev">
    <img alt="Unfold" src="docs/assets/unfold-logo.svg" width="92">
  </a>
</p>

<h1 align="center">Unfold</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@unfold/sdk"><img alt="Unfold SDK on npm" src="https://shieldcn.dev/npm/@unfold/sdk.svg?variant=secondary&size=sm"></a>
  <a href="https://docs.unfold.dev"><img alt="Unfold documentation" src="https://shieldcn.dev/badge/Docs-read-00bdf7.svg?variant=secondary&size=sm"></a>
  <a href="https://github.com/unfold-dev/unfold/stargazers"><img alt="GitHub stars" src="https://shieldcn.dev/github/stars/unfold-dev/unfold.svg?variant=secondary&size=sm&theme=amber"></a>
  <a href="https://discord.gg/unfold"><img alt="Join Discord" src="https://shieldcn.dev/badge/Discord-join-5865f2.svg?variant=secondary&size=sm&logo=discord"></a>
</p>

<p align="center">
  <strong>Infrastructure for the document parsing pipeline you need.</strong>
</p>

Unfold provides the SDK, CLI, API, and durable execution primitives for
building document parsing pipelines across engines.

Switch providers, compare them on your own documents, and compose the routing
or fallback logic your application needs. Unfold handles the uploads,
asynchronous jobs, polling, retries, errors, and normalized results behind one
interface.

Improve output quality, cost, latency, and reliability without tying the rest
of your application to one provider.

## What Unfold gives you

| Need                              | Unfold                                                                   |
| --------------------------------- | ------------------------------------------------------------------------ |
| **Switch providers**              | Change engines without changing input or result handling                 |
| **Compare real documents**        | Run one document across engines and retain every success or failure      |
| **Build routing and fallback**    | Compose cheap-first, parallel, escalation, or fallback flows in your app |
| **Keep one application contract** | Use normalized pages, outputs, timing, usage, warnings, and errors       |
| **Choose where processing runs**  | Use managed hosted jobs or direct/BYOK calls from your own runtime       |

[Explore recipes →](https://docs.unfold.dev/guides/overview)

## Get started

```bash
npm install @unfold/sdk
```

```ts
import { Unfold } from "@unfold/sdk"

const unfold = new Unfold()
const result = await unfold.parse("https://example.com/report.pdf", {
  provider: "liteparse",
  outputs: ["markdown"],
})

console.log(result.outputs.markdown)
```

```bash
npx @unfold/cli@latest login
npx @unfold/cli@latest compare report.pdf \
  --providers liteparse,llamaparse,mistral-ocr \
  --outputs markdown
```

## Hosted or direct

|                       | Hosted                                         | Direct/BYOK                            |
| --------------------- | ---------------------------------------------- | -------------------------------------- |
| Best for              | Managed comparisons and durable jobs           | Keeping provider calls in your runtime |
| Document sent through | Unfold, then each selected provider            | Each selected provider only            |
| Execution             | Managed uploads, polling, retries, and results | Runs in your process                   |
| Billing               | Unfold credits                                 | Provider billing                       |
| TypeScript            | `Unfold`                                       | `DirectUnfold`                         |
| CLI                   | Default after `unfold login`                   | Add `--local`                          |

Neither mode silently falls back to the other. Credits pay for hosted
processing. Each account receives 5,000 free credits each month, purchased
credits never expire, and direct requests do not use Unfold credits.

[Read about processing modes →](https://docs.unfold.dev/concepts/processing-modes)

## Engines

| Engine            | Useful for                                                                | Hosted | Direct/BYOK |
| ----------------- | ------------------------------------------------------------------------- | :----: | :---------: |
| **LiteParse**     | Lightweight parsing with optional OCR, screenshots, and Office conversion |  Yes   |      —      |
| **PDF Inspector** | Fast PDF classification and text-layer inspection                         |  Yes   |      —      |
| **Mistral OCR**   | OCR with structured document output                                       |  Yes   |     Yes     |
| **Datalab**       | Document conversion and extraction                                        |  Yes   |     Yes     |
| **LlamaParse**    | Layout-aware document parsing                                             |  Yes   |     Yes     |

<details>
<summary><strong>Tech stack</strong></summary>

- **App:** TypeScript, React 19, TanStack Start, Router, and Query.
- **API and auth:** Hono with OpenAPI and Zod, plus Better Auth.
- **Durable backend:** Cloudflare Workers and Workflows, with D1 through
  Drizzle ORM and R2 for documents and results.
- **SDK and CLI:** A pnpm workspace with provider-neutral TypeScript packages.
- **UI and tooling:** Tailwind CSS 4, Radix UI, Vite+, and Vitest.

</details>

## Development

Unfold requires Node.js 22.14 or newer.

```bash
vp install
pnpm dev
```

Run the checks before pushing changes:

```bash
pnpm check
pnpm test
```

## Community

- [Website](https://unfold.dev)
- [Documentation](https://docs.unfold.dev)
- [Security](SECURITY.md)
- [Privacy](https://unfold.dev/privacy)
- [Discord](https://discord.gg/unfold)
- [GitHub](https://github.com/unfold-dev/unfold)

Unfold is open source under the [MIT License](LICENSE).
