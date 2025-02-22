"use client"
import type React from "react"
import { useState } from "react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export type PropertySearchProps = {
    showActions?: boolean
}

export default function PropertySearch(props: PropertySearchProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const pathname = usePathname();
    const { replace } = useRouter();

    const searchParams = useSearchParams();

    const setParam = (param: string, term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set(param, term);
        } else {
            params.delete(param);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setParam("q", searchTerm)
    }

    return (
        <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
                <Input
                    type="text"
                    name="q"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setParam("q", e.target.value)
                    }}
                    className="flex-grow"
                />
                <Button type="submit">
                    <Search className="mr-2 h-4 w-4" /> Search
                </Button>
                {props.showActions && (
                    <Link href="/create-property">
                        <Button>
                            Create Property
                        </Button>
                    </Link>
                )}
            </div>
        </form>
    )
}
