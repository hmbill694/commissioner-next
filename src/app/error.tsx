"use client"
import { useEffect } from "react"
import { Button } from "~/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4">Oops! {error.message ?? "Something went wrong"}</h1>
            <p className="mb-4">We apologize for the inconvenience. Let&apos;s try again.</p>
            <Button onClick={() => reset()}>Try again</Button>
          </div>
        </div>
  )
}