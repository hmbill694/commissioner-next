'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { formatDate } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Trash } from "lucide-react"
import Link from "next/link"
import { deleteProperty } from "~/server/actions/PropertyActions"
import { useActionState } from "react"
import { Property } from "~/server/db/schema"

interface PropertyCardProps {
    property: Property
    showActions?: boolean
}

const initFormState = { error: "" }

export default function PropertyCard({ property, showActions }: PropertyCardProps) {
    const [state, deleteFormAction, pending] = useActionState(deleteProperty, initFormState)

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{property.name || property.address}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-500 mb-2">{property.address}</p>
                <p className="font-semibold mb-1">Asking Price: {property.askingPrice}</p>
                <p className="text-sm mb-2">Commission Rate: {property.commissionRate}</p>
                {property.description && <p className="text-sm text-gray-600 mb-2">{property.description}</p>}
                <div className="text-xs text-gray-400">
                    <p>Created: {formatDate(property.createdAt)}</p>
                    {property.updatedAt && <p>Updated: {formatDate(property.updatedAt)}</p>}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                {showActions && (
                    <form action={deleteFormAction}>
                        <input hidden name="id" value={property.id} readOnly />
                        <Button>
                            <Trash />
                        </Button>
                    </form>
                )}
                <Link href={`/property-details/${property.id}`}>
                    <Button>
                        Go to Property Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

