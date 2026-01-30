import { Button, Heading, Section, Text } from "@react-email/components"
import { ENV } from "~/utils/env"
import { Email } from "../components"

export interface StudentTeacherAssignedProps {
    studentFirstName: string
    teacherName: string
    teacherEmail?: string
    firstClassSchedule?: string
    language: string
}

export const StudentTeacherAssignedHtml = ({
    studentFirstName,
    teacherName,
    teacherEmail,
    firstClassSchedule,
    language,
}: StudentTeacherAssignedProps) => {
    const baseUrl = ENV.APP_PUBLIC_URL
    const previewText = `Seu professor foi atribuído: ${teacherName}`

    return (
        <Email previewText={previewText}>
            <Section>
                <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                    Bem-vindo(a)! Seu Professor Foi Atribuído
                </Heading>
                <Text className="text-black text-[14px] leading-[24px]">
                    Olá {studentFirstName},
                </Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    Temos uma ótima notícia! Seu professor de <strong>{language}</strong> foi
                    atribuído e já pode iniciar suas aulas.
                </Text>

                <Section className="bg-[#d4edda] border-l-4 border-[#28a745] rounded-md p-[20px] my-[24px]">
                    <Text className="text-[#155724] text-[16px] leading-[20px] m-0 font-semibold">
                        Seu Professor: {teacherName}
                    </Text>
                    {teacherEmail && (
                        <Text className="text-[#155724] text-[14px] leading-[18px] m-0 mt-[8px]">
                            Email: {teacherEmail}
                        </Text>
                    )}
                </Section>

                {firstClassSchedule && (
                    <>
                        <Text className="text-black text-[14px] leading-[24px] font-semibold">
                            Primeira Aula:
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            {firstClassSchedule}
                        </Text>
                    </>
                )}

                <Text className="text-black text-[14px] leading-[24px]">
                    Em breve você receberá mais informações sobre o cronograma de aulas e materiais
                    que serão utilizados.
                </Text>

                <Section className="text-center mt-[32px]">
                    <Button
                        className="bg-[#1d4281] text-white border-none rounded-md px-[24px] py-[12px] mx-auto text-[14px] font-semibold"
                        href={`${baseUrl}/student/dashboard`}
                    >
                        Acessar Minha Área
                    </Button>
                </Section>

                <Text className="text-black text-[14px] leading-[24px] mt-[24px]">
                    Bons estudos!
                </Text>
            </Section>
        </Email>
    )
}

export const StudentTeacherAssignedText = ({
    studentFirstName,
    teacherName,
    teacherEmail,
    firstClassSchedule,
    language,
}: StudentTeacherAssignedProps) => {
    const baseUrl = ENV.APP_PUBLIC_URL

    return `Olá ${studentFirstName},

BEM-VINDO(A)! SEU PROFESSOR FOI ATRIBUÍDO

Temos uma ótima notícia! Seu professor de ${language} foi atribuído e já pode iniciar suas aulas.

SEU PROFESSOR: ${teacherName}
${teacherEmail ? `Email: ${teacherEmail}` : ""}

${firstClassSchedule ? `PRIMEIRA AULA:\n${firstClassSchedule}\n` : ""}

Em breve você receberá mais informações sobre o cronograma de aulas e materiais que serão utilizados.

Acesse sua área: ${baseUrl}/student/dashboard

Bons estudos!
`
}

StudentTeacherAssignedHtml.PreviewProps = {
    studentFirstName: "João",
    teacherName: "Maria Santos",
    teacherEmail: "maria.santos@escola.com",
    firstClassSchedule: "Segunda-feira, 29/01/2026 às 8h (horário de Brasília)",
    language: "Inglês",
} as StudentTeacherAssignedProps

export default StudentTeacherAssignedHtml
