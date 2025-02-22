import { StopCircle } from "lucide-react"
import { ReactNode } from "react"

export type ErrorDisplayProps = {
    message?: string
    children: Readonly<ReactNode>
}

export default function ErrorDisplay(props: ErrorDisplayProps) {
    return props.message ? (
        <div className="flex flex-col items-center justify-center w-full h-full flex-1">
            <div className="flex-1 mb-6">
                <StopCircle className="w-full h-full"/>
            </div>
            <h2 className="text-lg font-semibold">
                {props.message}
            </h2>
        </div>
    ) : props.children 
}