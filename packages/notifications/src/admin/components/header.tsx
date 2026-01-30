import { Img, Section } from "@react-email/components"
import { ENV } from "~/utils/env"

export const Header = () => {
    const imagesBaseUrl = ENV.CDN_BASE_URL

    return (
        <Section>
            <Img
                aria-hidden
                className="my-0 mx-auto"
                height="auto"
                src={`${imagesBaseUrl}/width=140,height=auto,quality=100/emails/logo.png`}
                width="140"
            />
        </Section>
    )
}
