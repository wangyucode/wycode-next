export default function FormField({inputOptions}) {
    return (
        <div className="flex items-center mb-2">
            {inputOptions.placeholder}:
            <input
                className={'ml-2 flex-1 px-2 py-1 rounded border border-slate-400/30 focus-visible:outline-0 focus-visible:ring-2'}
                {...inputOptions}
            />
        </div>
    )
}