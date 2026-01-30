import { Label } from "@alianza/ui/label"

interface StatusDisplayFieldProps {
    label: string
    badgeText: string
    badgeColor?: "green" | "red" | "yellow" | "blue"
    description?: string
}

export function StatusDisplayField({
    label,
    badgeText,
    badgeColor = "green",
    description,
}: StatusDisplayFieldProps) {
    const badgeColorClasses = {
        green: "bg-green-100 text-green-700",
        red: "bg-red-100 text-red-700",
        yellow: "bg-yellow-100 text-yellow-700",
        blue: "bg-blue-100 text-blue-700",
    }

    const dotColorClasses = {
        green: "bg-green-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500",
        blue: "bg-blue-500",
    }

    return (
        <div>
            <Label className="text-primary! text-normal font-medium block mb-2">{label}</Label>
            <div className="flex items-start gap-4">
                <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${badgeColorClasses[badgeColor]}`}
                >
                    <div className={`w-2 h-2 rounded-full ${dotColorClasses[badgeColor]}`} />
                    {badgeText}
                </div>
                {description && <div className="text-sm text-gray-600">{description}</div>}
            </div>
        </div>
    )
}
