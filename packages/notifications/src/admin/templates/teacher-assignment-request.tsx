import { Button, Heading, Hr, Section, Text } from "@react-email/components"
import { ENV } from "~/utils/env"
import { Email } from "../components"

export interface TeacherAssignmentRequestProps {
    teacherFirstName: string
    studentName: string
    studentAge: number
    studentLevel: string
    studentLanguage: string
    studentCountry: string
    studentSchedule: string // Ex: "8h (BR) = 6h (PT)"
    classPeriod: string // Ex: "4 x 45min"
    experimentalFeedback: string
    recommendedMaterial?: string
    courseReason?: string
    token: string
}

export const TeacherAssignmentRequestHtml = ({
    teacherFirstName,
    studentName,
    studentAge,
    studentLevel,
    studentLanguage,
    studentCountry,
    studentSchedule,
    classPeriod,
    experimentalFeedback,
    recommendedMaterial,
    courseReason,
    token,
}: TeacherAssignmentRequestProps) => {
    const baseUrl = ENV.APP_PUBLIC_URL
    const previewText = `Novo aluno para aprovação: ${studentName}`

    return (
        <Email previewText={previewText}>
            <Section>
                <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                    Nova Atribuição de Aluno
                </Heading>
                <Text className="text-black text-[14px] leading-[24px]">
                    Olá {teacherFirstName},
                </Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    A área de distribuições selecionou você para um novo aluno. Por favor, revise as
                    informações abaixo e confirme se pode aceitar este aluno.
                </Text>

                <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                <Section className="bg-[#f6f9fc] rounded-md p-[20px] my-[16px]">
                    <Heading className="text-black text-[18px] font-semibold mt-0 mb-[12px]">
                        Informações do Aluno
                    </Heading>
                    <Text className="text-black text-[14px] leading-[20px] m-0 mb-[8px]">
                        <strong>Nome:</strong> {studentName}
                    </Text>
                    <Text className="text-black text-[14px] leading-[20px] m-0 mb-[8px]">
                        <strong>Idade:</strong> {studentAge} anos
                    </Text>
                    <Text className="text-black text-[14px] leading-[20px] m-0 mb-[8px]">
                        <strong>Nível:</strong> {studentLevel}
                    </Text>
                    <Text className="text-black text-[14px] leading-[20px] m-0 mb-[8px]">
                        <strong>Idioma:</strong> {studentLanguage}
                    </Text>
                    <Text className="text-black text-[14px] leading-[20px] m-0 mb-[8px]">
                        <strong>País:</strong> {studentCountry}
                    </Text>
                </Section>

                <Section className="bg-[#f6f9fc] rounded-md p-[20px] my-[16px]">
                    <Heading className="text-black text-[18px] font-semibold mt-0 mb-[12px]">
                        Horários e Aulas
                    </Heading>
                    <Text className="text-black text-[14px] leading-[20px] m-0 mb-[8px]">
                        <strong>Horários compatíveis:</strong> {studentSchedule}
                    </Text>
                    <Text className="text-black text-[14px] leading-[20px] m-0 mb-[8px]">
                        <strong>Período de aula:</strong> {classPeriod}
                    </Text>
                </Section>

                <Section className="bg-[#f6f9fc] rounded-md p-[20px] my-[16px]">
                    <Heading className="text-black text-[18px] font-semibold mt-0 mb-[12px]">
                        Informações Pedagógicas
                    </Heading>
                    <Text className="text-black text-[14px] leading-[20px] m-0 mb-[8px]">
                        <strong>Feedback da aula experimental:</strong>
                    </Text>
                    <Text className="text-black text-[14px] leading-[20px] m-0 mb-[12px] italic">
                        {experimentalFeedback}
                    </Text>
                    {recommendedMaterial && (
                        <Text className="text-black text-[14px] leading-[20px] m-0 mb-[8px]">
                            <strong>Material recomendado:</strong> {recommendedMaterial}
                        </Text>
                    )}
                    {courseReason && (
                        <Text className="text-black text-[14px] leading-[20px] m-0">
                            <strong>Motivo do curso:</strong> {courseReason}
                        </Text>
                    )}
                </Section>

                <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                <Text className="text-black text-[14px] leading-[24px] font-semibold">
                    Você tem 60 minutos para responder esta solicitação.
                </Text>

                <Section className="text-center mt-[32px]">
                    <Button
                        className="bg-[#28a745] text-white border-none rounded-md px-[32px] py-[12px] mx-[8px] text-[14px] font-semibold"
                        href={`${baseUrl}/teacher/assignments/${token}/approve`}
                    >
                        ✓ Aceitar Aluno
                    </Button>
                    <Button
                        className="bg-[#dc3545] text-white border-none rounded-md px-[32px] py-[12px] mx-[8px] text-[14px] font-semibold"
                        href={`${baseUrl}/teacher/assignments/${token}/reject`}
                    >
                        ✗ Recusar
                    </Button>
                </Section>

                <Text className="text-[#666666] text-[12px] leading-[20px] text-center mt-[24px]">
                    Após 60 minutos sem resposta, esta atribuição será cancelada automaticamente.
                </Text>
            </Section>
        </Email>
    )
}

export const TeacherAssignmentRequestText = ({
    teacherFirstName,
    studentName,
    studentAge,
    studentLevel,
    studentLanguage,
    studentCountry,
    studentSchedule,
    classPeriod,
    experimentalFeedback,
    recommendedMaterial,
    courseReason,
    token,
}: TeacherAssignmentRequestProps) => {
    const baseUrl = ENV.APP_PUBLIC_URL

    return `Olá ${teacherFirstName},

A área de distribuições selecionou você para um novo aluno.

INFORMAÇÕES DO ALUNO:
- Nome: ${studentName}
- Idade: ${studentAge} anos
- Nível: ${studentLevel}
- Idioma: ${studentLanguage}
- País: ${studentCountry}

HORÁRIOS E AULAS:
- Horários compatíveis: ${studentSchedule}
- Período de aula: ${classPeriod}

INFORMAÇÕES PEDAGÓGICAS:
Feedback da aula experimental: ${experimentalFeedback}
${recommendedMaterial ? `Material recomendado: ${recommendedMaterial}` : ""}
${courseReason ? `Motivo do curso: ${courseReason}` : ""}

VOCÊ TEM 60 MINUTOS PARA RESPONDER.

Para aceitar: ${baseUrl}/teacher/assignments/${token}/approve
Para recusar: ${baseUrl}/teacher/assignments/${token}/reject

Após 60 minutos sem resposta, esta atribuição será cancelada automaticamente.
`
}

TeacherAssignmentRequestHtml.PreviewProps = {
    teacherFirstName: "Maria",
    studentName: "João Silva",
    studentAge: 25,
    studentLevel: "Intermediário",
    studentLanguage: "Inglês",
    studentCountry: "Brasil",
    studentSchedule: "8h (BR) = 6h (PT), 14h (BR) = 12h (PT)",
    classPeriod: "4 x 45min",
    experimentalFeedback:
        "Aluno demonstrou boa compreensão auditiva. Precisa desenvolver mais a produção oral e vocabulário.",
    recommendedMaterial: "New English File Intermediate",
    courseReason: "Trabalho",
    token: "a7b9c2d4e6f8g1h3i5j7k9l2m4n6p8q0",
} as TeacherAssignmentRequestProps

export default TeacherAssignmentRequestHtml
