"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

type Property = {
  id: string
  address: string
  status: string
}

export default function PropertyList() {
  const { user } = useUser()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const fetchProperties = async () => {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProperties([
        { id: "1", address: "123 Main St, Anytown, USA", status: "For Sale" },
        { id: "2", address: "456 Elm St, Somewhere, USA", status: "Under Contract" },
        { id: "3", address: "789 Oak St, Elsewhere, USA", status: "Closed" },
      ])
      setLoading(false)
    }

    if (user) {
      fetchProperties()
    }
  }, [user])

  if (loading) {
    return <div>Loading properties...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card key={property.id}>
          <CardHeader>
            <CardTitle>{property.address}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Status: {property.status}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

