import { Button, Heading, Section, Text } from "@react-email/components"
import { ENV } from "~/utils/env"
import { Email } from "../components"

export interface SignupConfirmationProps {
    firstName: string
    lastName: string
    token: string
}

export const SignupConfirmationHtml = ({ firstName, lastName, token }: SignupConfirmationProps) => {
    const baseUrl = ENV.APP_PUBLIC_URL
    const previewText = "Confirme seu email"
    const fullName = [firstName, lastName].filter(Boolean).join(" ") || "usuário"

    return (
        <Email previewText={previewText}>
            <Section>
                <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                    Alianza
                </Heading>
                <Text className="text-black text-[14px] leading-[24px]">Olá, {fullName},</Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    Bem-vindo ao sistema administrativo. Para ativar sua conta, confirme seu email
                    clicando no botão abaixo:
                </Text>
                <Section className="text-center">
                    <Button
                        className="bg-[#1d4281] text-white border-none rounded-md px-4 py-2 mx-auto"
                        href={`${baseUrl}/confirm-signup/${token}`}
                    >
                        Confirmar email
                    </Button>
                </Section>
                <Text className="text-[14px] leading-[24px] text-[#6b7280]">
                    Se você não criou uma conta, pode ignorar este email.
                </Text>
            </Section>
        </Email>
    )
}

export const SignupConfirmationText = ({ firstName, lastName, token }: SignupConfirmationProps) => {
    const baseUrl = ENV.APP_PUBLIC_URL
    const fullName = [firstName, lastName].filter(Boolean).join(" ") || "usuário"

    return `Olá, ${fullName},

Bem-vindo ao sistema administrativo. Para ativar sua conta, confirme seu email acessando o link abaixo:

${baseUrl}/confirm-signup/${token}

Se você não criou uma conta, pode ignorar este email.
`
}

SignupConfirmationHtml.PreviewProps = {
    firstName: "Maria",
    lastName: "Silva",
    token: "a7b9c2d4e6f8g1h3i5j7k9l2m4n6p8q0",
} as SignupConfirmationProps

SignupConfirmationText.TextProps = {
    firstName: "Maria",
    lastName: "Silva",
    token: "a7b9c2d4e6f8g1h3i5j7k9l2m4n6p8q0",
} as SignupConfirmationProps

export default SignupConfirmationHtml
