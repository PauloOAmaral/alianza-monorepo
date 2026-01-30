import { Link, Section, Text } from "@react-email/components"
import { ENV } from "~/utils/env"

export const Footer = () => {
    const baseUrl = ENV.APP_PUBLIC_URL ?? "http://localhost:3000"

    return (
        <Section>
            <Text className="text-[12px]leading-[24px] text-center">
                <Link className="text-[#666666] visited:text-[#666666]" href={baseUrl}>
                    {baseUrl}
                </Link>
            </Text>
        </Section>
    )
}
