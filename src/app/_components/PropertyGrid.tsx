"use client"
import PropertyCard from "./PropertyCard"
import type { Property } from "~/server/db/schema"
import NothingToSeeHere from "../../components/shared/NothingToSeeHere"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

export type PropertyGridProps = {
    properties: Property[]
    notFoundMessage: string
    currentUser?: string
}

export default function PropertyGrid(props: PropertyGridProps) {
    const searchParams = useSearchParams()

    const filteredProperties = useMemo(() => {
        const query = searchParams.get("q")
        if (!query) {
            return props.properties
        }

        const lowercaseQuery = query.toLocaleLowerCase()

        return props.properties.filter(ele => ele.address.toLowerCase().includes(lowercaseQuery) || ele.name?.toLocaleLowerCase().includes(lowercaseQuery))
    }, [searchParams, props.properties])

    if (filteredProperties.length === 0) {
        return <NothingToSeeHere message={props.notFoundMessage} />
    }

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => 
                <PropertyCard 
                    key={property.id}
                    property={property}
                    showActions={props.currentUser === property.userId}
                />)}
            </div>
        </>
    )
}

