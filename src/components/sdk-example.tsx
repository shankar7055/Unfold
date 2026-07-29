import { ArrowsSplit, FileText } from "@phosphor-icons/react"

import { SyntaxHighlight } from "@/components/syntax-highlight"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const examples = {
  parse: `import { Unfold } from "@unfold/sdk"

const client = new Unfold()

// Fast hosted engine for simple pages
const result = await client.parse(file, {
  provider: "liteparse",
  outputs: ["markdown", "tables"],
})`,
  compare: `import { Unfold } from "@unfold/sdk"

const client = new Unfold()

// Fan out one document across engines; keep every outcome
const results = await client.compare(file, {
  providers: ["liteparse", "pdf-inspector", "llamaparse", "mistral-ocr"],
  outputs: ["markdown"],
})`,
} as const

const exampleTabs = [
  { icon: FileText, id: "parse", label: "Parse" },
  { icon: ArrowsSplit, id: "compare", label: "Compare" },
] as const

export function SdkExample() {
  return (
    <Tabs
      className="gap-0 overflow-hidden rounded-none border border-l-2 border-[#1F1F1F] border-l-[#F59E0B] bg-[#141414] text-left"
      defaultValue="parse"
    >
      <TabsList
        className="grid w-full grid-cols-2 border-b border-[#1F1F1F]"
        variant="panel"
      >
        {exampleTabs.map(({ icon: Icon, id, label }) => (
          <TabsTrigger
            className="h-14 not-first:border-l not-first:border-border"
            key={id}
            value={id}
          >
            <Icon className="size-4 text-primary" weight="regular" />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(examples).map(([id, example]) => (
        <TabsContent className="min-w-0" key={id} value={id}>
          <SyntaxHighlight
            className="overflow-x-auto p-5 font-mono text-sm leading-7 md:p-7"
            code={example}
            id={id}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
