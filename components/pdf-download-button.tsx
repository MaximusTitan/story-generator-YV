"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface PdfDownloadButtonProps {
  story: {
    title: string
    summary: string
    scenes: any[]
  }
  variant?: "default" | "outline"
  showLabel?: boolean
}

export function PdfDownloadButton({ story, variant = "default", showLabel = true }: PdfDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePrint = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: story.title,
          summary: story.summary,
          scenes: story.scenes
        })
      })

      if (!response.ok) throw new Error('Failed to generate PDF')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // Open PDF in new window for printing
      const printWindow = window.open(url)
      printWindow?.addEventListener('load', () => {
        printWindow.print()
      })
      
      window.URL.revokeObjectURL(url)
      toast({
        title: "Print dialog opened",
        description: "Your story is ready to print."
      })
    } catch (error) {
      toast({
        title: "Print failed",
        description: "There was a problem preparing your story for print."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      onClick={handlePrint}
      disabled={isLoading}
    >
      <Printer className="w-4 h-4" />
      {showLabel && <span className="ml-2">Print Story</span>}
    </Button>
  )
}
