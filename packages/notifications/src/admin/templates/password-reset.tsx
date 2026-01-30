import { Button, Heading, Section, Text } from "@react-email/components"
import { ENV } from "~/utils/env"
import { Email } from "../components"

export interface PasswordResetProps {
    token: string
}

export const PasswordResetHtml = ({ token }: PasswordResetProps) => {
    const baseUrl = ENV.APP_PUBLIC_URL
    const previewText = "Redefinição de senha"

    return (
        <Email previewText={previewText}>
            <Section>
                <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                    Alianza
                </Heading>
                <Text className="text-black text-[14px] leading-[24px]">Olá,</Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    Recebemos sua solicitação para redefinir sua senha. Por favor, clique no botão
                    abaixo para criar uma nova senha:
                </Text>
                <Section className="text-center">
                    <Button
                        className="bg-[#1d4281] text-white border-none rounded-md px-4 py-2 mx-auto"
                        href={`${baseUrl}/reset-password/${token}`}
                    >
                        Redefinir senha
                    </Button>
                </Section>
            </Section>
        </Email>
    )
}

export const PasswordResetText = ({ token }: PasswordResetProps) => {
    const baseUrl = ENV.APP_PUBLIC_URL

    return `Olá,

Recebemos sua solicitação para redefinir sua senha. Por favor, use o link abaixo para criar uma nova senha:

${baseUrl}/reset-password/${token}

Se você não solicitou a redefinição de senha, por favor ignore este email.
`
}

PasswordResetHtml.PreviewProps = {
    token: "a7b9c2d4e6f8g1h3i5j7k9l2m4n6p8q0",
} as PasswordResetProps

PasswordResetText.TextProps = {
    token: "a7b9c2d4e6f8g1h3i5j7k9l2m4n6p8q0",
} as PasswordResetProps

export default PasswordResetHtml
