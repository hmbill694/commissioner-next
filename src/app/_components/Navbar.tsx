import { Building2 } from "lucide-react"
import Link from "next/link"
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Building2 className="h-8 w-8 text-primary mr-2" />
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            Commissioner
                        </Link>
                    </div>
                    <div className="flex gap-3">
                        <SignedOut>
                            <SignInButton />
                            <SignUpButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    )
}
