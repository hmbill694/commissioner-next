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
import { Property } from "~/server/db/schema"

export type PropertyFormProps = {
  action: ActionFunction
  initialState?: Property
  currentUser: string
}

export default function PropertyForm(props: PropertyFormProps) {
  const [commissionRate, setCommissionRate] = useState(props.initialState?.commissionRate ?? "")
  const [askingPrice, setAskingPrice] = useState(props.initialState?.askingPrice ?? "")

  const readOnly = props.initialState && props.initialState.userId !== props.currentUser

  const pageMode = props.initialState ? "Edit" : "Create"

  const commissionRateChange = (text: string) => {
    if (!/^\d*\.?\d*$/.test(text)) return;

    const parts = text.split(".");
    if (parts.length > 2) return;
    if ((parts[1]?.length ?? 0) > 2) return;

    setCommissionRate(text);
  };

  const askingPriceChange = (text: string) => {
    const cleanedStr = text.replace(/,/g, ""); // Remove existing commas

    if (isNaN(Number(cleanedStr))) {
      return
    }

    setAskingPrice(formatNumberWithCommas(cleanedStr))
  }


  const [state, action, pending] = useActionState(props.action, { error: "" })

  return (
    <form action={action} className="space-y-6 max-w-5xl w-full flex flex-col">
      {state.error && <div className="space-y-2">Error: {state.error}</div>}
      {readOnly && (
        <>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" required defaultValue={props.initialState?.address ?? ""} readOnly={readOnly} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" required defaultValue={props.initialState?.address ?? ""} readOnly={readOnly} />
      </div>
        </>
      )}
      <input id="id" name="id" value={props.initialState?.id ?? ""} hidden readOnly />
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" required defaultValue={props.initialState?.address ?? ""} readOnly={readOnly} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name (Optional)</Label>
        <Input id="name" name="name" defaultValue={props.initialState?.name ?? ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="commission-rate">Commission Rate</Label>
        <div className="flex items-center gap-2">
          <Input id="commission-rate" name="commission-rate" value={commissionRate} onChange={(e) => commissionRateChange(e.target.value)} readOnly={readOnly} />
          <Percent />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="asking-price">Asking Price</Label>
        <div className="flex items-center gap-2">
          <DollarSign />
          <Input id="asking-price" name="asking-price" value={askingPrice} onChange={(e) => askingPriceChange(e.target.value)} readOnly={readOnly} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={props.initialState?.description ?? ""} readOnly={readOnly} />
      </div>
      { props.currentUser === props.initialState?.userId && (
        <Button type="submit" className="align-self-end" disabled={pending}>{pageMode} Property</Button>
      ) }
    </form>
  )
}

