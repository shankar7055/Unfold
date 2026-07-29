# @unfold/sdk

Provider-neutral document parsing for TypeScript. Use the hosted Unfold API
or call LlamaParse, Mistral OCR, and Datalab directly with your own keys.

```bash
pnpm add @unfold/sdk
```

## Hosted

```ts
import { Unfold } from "@unfold/sdk"

const client = new Unfold({ apiKey: process.env.UNFOLD_API_KEY })
const result = await client.parse("https://example.com/report.pdf", {
  provider: "llamaparse",
  outputs: ["markdown", "pages"],
})

console.log(result.outputs.markdown)
```

## Direct BYOK

```ts
import { DirectUnfold } from "@unfold/sdk"
import { llamaparse } from "@unfold/sdk/llamaparse"

const client = new DirectUnfold({
  providers: { llamaparse: llamaparse() },
})

const result = await client.parse(file, {
  provider: "llamaparse",
  outputs: ["markdown"],
})
```

See [unfold.dev](https://unfold.unfold-app.workers.dev) and the
[source repository](https://github.com/unfold-dev/unfold).
