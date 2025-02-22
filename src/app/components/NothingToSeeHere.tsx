export type NothingToSeeHereProps = {
    message: string
}

export default function NothingToSeeHere(props: NothingToSeeHereProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full flex-1">
            <div className="grid grid-cols-3 gap-4 mb-6">
                {Array.from({ length: 9 }).map((ele, idx) => <div key={idx} className="w-32 h-32 bg-gray-300"></div>)}
            </div>
            <h2 className="text-lg font-semibold">
                {props.message}
            </h2>
        </div>
    )
}