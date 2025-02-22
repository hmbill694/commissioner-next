"use client"

import type React from "react"
import { useActionState, useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { DollarSign, Percent } from "lucide-react"
import { formatNumberWithCommas } from "~/lib/utils"
import { ActionFunction } from "~/server/actions/types"

export type PropertyFormProps = {
  action: ActionFunction
}

export default function PropertyForm(props: PropertyFormProps) {
  const [commissionRate, setCommissionRate] = useState("")
  const [askingPrice, setAskingPrice] = useState("")

  const commissionRateChange = (text: string) => {
    if (!/^\d*\.?\d*$/.test(text)) return;

    const parts = text.split(".");
    if (parts.length > 2) return;
    if ((parts[1]?.length ?? 0) > 2) return;

    setCommissionRate(text);
  };

  const askingPriceChange = (text: string) => {
    const cleanedStr = text.replace(/,/g, ""); // Remove existing commas

    if(isNaN(Number(cleanedStr))) {
      return
    }

    setAskingPrice(formatNumberWithCommas(cleanedStr))
  }


  const [state, action, pending] = useActionState(props.action, { error: ""})

  return (
    <form action={action} className="space-y-6 max-w-5xl w-full flex flex-col">
      { state.error && <div className="space-y-2">Error: {state.error}</div> }
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name (Optional)</Label>
        <Input id="name" name="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="commission-rate">Commission Rate</Label>
        <div className="flex items-center gap-2">
        <Input id="commission-rate" name="commission-rate" value={commissionRate} onChange={(e) => commissionRateChange(e.target.value)} />
        <Percent />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="asking-price">Asking Price</Label>
        <div className="flex items-center gap-2">
          <DollarSign />
          <Input id="asking-price" name="asking-price" value={askingPrice} onChange={(e) => askingPriceChange(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} />
      </div>
      <Button type="submit" className="align-self-end" disabled={pending}>Create Property</Button>
    </form>
  )
}

