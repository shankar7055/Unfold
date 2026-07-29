# @unfold/cli

Parse and compare documents across providers from the terminal.

```bash
npx @unfold/cli login
npx @unfold/cli parse report.pdf
npx @unfold/cli compare report.pdf --json
```

Hosted mode uses an Unfold API key created during `login`. Direct BYOK mode
calls the selected provider without sending the document or provider key through
Unfold:

```bash
LLAMA_CLOUD_API_KEY=... npx @unfold/cli parse report.pdf --local
```

See [unfold.dev](https://unfold.shankarpratap220.workers.dev) and the
[source repository](https://github.com/unfold-dev/unfold).
