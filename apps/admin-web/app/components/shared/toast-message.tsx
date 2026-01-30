export function ToastMessages({ errors }: { errors: string | string[] }) {
    const errorsArray = Array.isArray(errors) ? errors : errors.split('\n')

    return (
        <ul>
            {errorsArray.map((error, index) => (
                <li key={`${index}-${error.replace(/[^a-zA-Z0-9]/g, '')}`}>{error}</li>
            ))}
        </ul>
    )
}
