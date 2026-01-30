import { Heading, Section, Text } from "@react-email/components"
import { Email } from "../components"

export interface TeacherAssignmentExpiredProps {
    analystFirstName: string
    teacherName: string
    studentName: string
    expiredAt: string
}

export const TeacherAssignmentExpiredHtml = ({
    analystFirstName,
    teacherName,
    studentName,
    expiredAt,
}: TeacherAssignmentExpiredProps) => {
    const previewText = `Atribuição expirada: ${studentName} → ${teacherName}`

    return (
        <Email previewText={previewText}>
            <Section>
                <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                    ⏱ Atribuição Expirada
                </Heading>
                <Text className="text-black text-[14px] leading-[24px]">
                    Olá {analystFirstName},
                </Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    A atribuição do aluno <strong>{studentName}</strong> para o professor{" "}
                    <strong>{teacherName}</strong> expirou por falta de resposta.
                </Text>

                <Section className="bg-[#fff3cd] border-l-4 border-[#ffc107] rounded-md p-[20px] my-[24px]">
                    <Text className="text-[#856404] text-[14px] leading-[20px] m-0 font-semibold">
                        Status: Atribuição expirada (60 minutos sem resposta)
                    </Text>
                    <Text className="text-[#856404] text-[12px] leading-[18px] m-0 mt-[8px]">
                        Expirado em: {expiredAt}
                    </Text>
                </Section>

                <Text className="text-black text-[14px] leading-[24px]">
                    O professor não respondeu à solicitação dentro do prazo de 60 minutos. O aluno
                    retornou ao status de distribuição pendente e pode ser atribuído novamente.
                </Text>
            </Section>
        </Email>
    )
}

export const TeacherAssignmentExpiredText = ({
    analystFirstName,
    teacherName,
    studentName,
    expiredAt,
}: TeacherAssignmentExpiredProps) => {
    return `Olá ${analystFirstName},

ATRIBUIÇÃO EXPIRADA

A atribuição do aluno ${studentName} para o professor ${teacherName} expirou por falta de resposta.

Status: Atribuição expirada (60 minutos sem resposta)
Expirado em: ${expiredAt}

O professor não respondeu à solicitação dentro do prazo de 60 minutos. O aluno retornou ao status de distribuição pendente e pode ser atribuído novamente.
`
}

TeacherAssignmentExpiredHtml.PreviewProps = {
    analystFirstName: "Carlos",
    teacherName: "Maria Santos",
    studentName: "João Silva",
    expiredAt: "27/01/2026 às 15:35",
} as TeacherAssignmentExpiredProps

export default TeacherAssignmentExpiredHtml
