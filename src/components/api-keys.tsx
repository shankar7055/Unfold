import type { ApiKey } from "@better-auth/api-key"
import { Trash, X } from "@phosphor-icons/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { ClipboardCopyButton } from "@/components/clipboard-copy-button"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import {
  captureBrowserEvent,
  captureBrowserException,
} from "@/integrations/posthog/browser"
import { authClient } from "@/lib/auth-client"

type ApiKeySummary = Omit<ApiKey, "key">

const apiKeysQueryKey = ["auth", "api-keys"] as const
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
})

export function ApiKeys() {
  const queryClient = useQueryClient()
  const [name, setName] = useState("")
  const [createdKey, setCreatedKey] = useState<string | null>(null)

  const keys = useQuery({
    queryKey: apiKeysQueryKey,
    queryFn: async (): Promise<Array<ApiKeySummary>> => {
      const result = await authClient.apiKey.list()
      if (result.error) {
        throw new Error(result.error.message ?? "Could not load API keys.")
      }
      return result.data.apiKeys
    },
  })

  const createKeyMutation = useMutation({
    mutationFn: async (keyName?: string) => {
      const result = await authClient.apiKey.create(
        keyName ? { name: keyName } : {}
      )
      if (result.error) {
        throw new Error(result.error.message ?? "Could not create API key.")
      }
      return result.data.key
    },
    onSuccess: async (key) => {
      captureBrowserEvent("api_key_created", { named: Boolean(name.trim()) })
      setName("")
      setCreatedKey(key)
      await queryClient.invalidateQueries({ queryKey: apiKeysQueryKey })
    },
    onError: (error) =>
      captureBrowserException(error, { operation: "api_key_create" }),
  })

  const revokeKeyMutation = useMutation({
    mutationFn: async (keyId: string) => {
      const result = await authClient.apiKey.delete({ keyId })
      if (result.error) {
        throw new Error(result.error.message ?? "Could not revoke API key.")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: apiKeysQueryKey })
    },
    onError: (error) =>
      captureBrowserException(error, { operation: "api_key_revoke" }),
  })

  function createKey(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const keyName = name.trim()
    createKeyMutation.mutate(keyName || undefined)
  }

  const error = keys.error ?? createKeyMutation.error ?? revokeKeyMutation.error

  return (
    <section
      aria-labelledby="api-keys-title"
      className="min-w-0 scroll-mt-20 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-6"
      id="api-keys"
    >
      <div>
        <h2
          className="font-heading text-xl font-medium text-white"
          id="api-keys-title"
        >
          API keys
        </h2>
      </div>

      <form
        className="flex w-full flex-col gap-2 py-4 sm:flex-row"
        onSubmit={createKey}
      >
        <label className="sr-only" htmlFor="api-key-name">
          API key name
        </label>
        <Input
          id="api-key-name"
          className="h-10 flex-1 border-[#2A2A2A] bg-[#161616] px-3 font-body text-white placeholder:text-[#52525B] focus:border-[#F59E0B]/50 focus:ring-2 focus:ring-[#F59E0B]/20"
          placeholder="Name (optional)"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={64}
        />
        <Button
          className="h-10 rounded-md bg-[#F59E0B] font-body text-sm font-medium text-black transition-colors hover:bg-[#D97706]"
          type="submit"
          disabled={createKeyMutation.isPending}
        >
          Create new key
        </Button>
      </form>

      {createdKey ? (
        <Alert className="ph-no-capture mb-5 max-w-full min-w-0 overflow-hidden border-[#F59E0B]/30 bg-[#F59E0B]/10 pr-10">
          <Button
            aria-label="Dismiss API key"
            className="absolute top-1.5 right-1.5"
            onClick={() => setCreatedKey(null)}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <X weight="bold" />
          </Button>
          <AlertTitle className="font-medium text-white">
            Copy this key now
          </AlertTitle>
          <AlertDescription className="text-[#A1A1AA]">
            It will not be shown again.
          </AlertDescription>
          <div className="mt-3 flex min-w-0 items-center gap-2">
            <code className="block min-w-0 flex-1 overflow-x-auto rounded-none border border-[#2A2A2A] bg-[#161616] px-3 py-2 font-mono text-sm whitespace-nowrap text-[#FCD34D]">
              {createdKey}
            </code>
            <ClipboardCopyButton
              key={createdKey}
              label="API key"
              size="icon"
              value={createdKey}
              variant="outline"
            />
          </div>
        </Alert>
      ) : null}

      {error ? (
        <p className="mb-5 font-body text-sm text-rose-500" role="alert">
          {error.message}
        </p>
      ) : null}

      <div className="divide-y divide-[#2A2A2A]">
        {keys.isPending ? (
          <p className="py-4 font-body text-sm text-[#71717A]">
            Loading keys...
          </p>
        ) : keys.data?.length === 0 ? (
          <p className="py-4 font-body text-sm text-[#71717A]">
            No API keys generated yet.
          </p>
        ) : (
          keys.data?.map((key) => (
            <div
              className="flex items-center justify-between gap-4 rounded-md px-2 py-4 transition-colors hover:bg-[#222222]"
              key={key.id}
            >
              <div className="min-w-0">
                <p className="truncate font-mono text-xs font-medium text-white">
                  {key.start}...
                </p>
                <p className="mt-1 truncate font-body text-xs text-[#A1A1AA]">
                  {key.name ? `${key.name} · ` : null}Created{" "}
                  {dateFormatter.format(new Date(key.createdAt))}
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    aria-label={`Revoke key ${key.start}`}
                    size="icon-sm"
                    variant="ghost"
                    className="hover:text-rose-400"
                    disabled={revokeKeyMutation.isPending}
                  >
                    <Trash
                      className="text-[#52525B] transition-colors hover:text-rose-400"
                      weight="bold"
                    />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-heading text-white">
                      Revoke this API key?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#A1A1AA]">
                      Applications using this key will immediately lose access.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-[#3F3F46] bg-transparent text-white hover:bg-[#222222]">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-rose-600 text-white hover:bg-rose-700"
                      onClick={() => revokeKeyMutation.mutate(key.id)}
                    >
                      Revoke key
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
