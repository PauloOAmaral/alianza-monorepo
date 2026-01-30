import { Body, Container, Head, Hr, Html, Preview, Tailwind } from "@react-email/components"
import { Footer } from "./footer"
import { Header } from "./header"

interface EmailProps {
    previewText: string
    children: React.ReactNode
}

export const Email = ({ previewText, children }: EmailProps) => {
    return (
        <Html>
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Head />
                <Body className="bg-white my-auto mx-auto font-sans px-[8px]">
                    <Container className="border border-solid border-[#1d4281] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Header />
                        {children}
                        <Hr className="border-t-solid border-t my-[26px] mx-0 w-full" />
                        <Footer />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
