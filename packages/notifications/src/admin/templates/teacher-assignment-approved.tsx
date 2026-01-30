import { Heading, Section, Text } from "@react-email/components"
import { Email } from "../components"

export interface TeacherAssignmentApprovedProps {
    analystFirstName: string
    teacherName: string
    studentName: string
    approvedAt: string
}

export const TeacherAssignmentApprovedHtml = ({
    analystFirstName,
    teacherName,
    studentName,
    approvedAt,
}: TeacherAssignmentApprovedProps) => {
    const previewText = `Atribuição aprovada: ${studentName} → ${teacherName}`

    return (
        <Email previewText={previewText}>
            <Section>
                <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                    ✓ Atribuição Aprovada
                </Heading>
                <Text className="text-black text-[14px] leading-[24px]">
                    Olá {analystFirstName},
                </Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    O professor <strong>{teacherName}</strong> aprovou a atribuição do aluno{" "}
                    <strong>{studentName}</strong>.
                </Text>

                <Section className="bg-[#d4edda] border-l-4 border-[#28a745] rounded-md p-[20px] my-[24px]">
                    <Text className="text-[#155724] text-[14px] leading-[20px] m-0 font-semibold">
                        Status: Aluno vinculado com sucesso
                    </Text>
                    <Text className="text-[#155724] text-[12px] leading-[18px] m-0 mt-[8px]">
                        Aprovado em: {approvedAt}
                    </Text>
                </Section>

                <Text className="text-black text-[14px] leading-[24px]">
                    O aluno já foi vinculado definitivamente ao professor e o processo pedagógico pode
                    ser iniciado.
                </Text>
            </Section>
        </Email>
    )
}

export const TeacherAssignmentApprovedText = ({
    analystFirstName,
    teacherName,
    studentName,
    approvedAt,
}: TeacherAssignmentApprovedProps) => {
    return `Olá ${analystFirstName},

ATRIBUIÇÃO APROVADA

O professor ${teacherName} aprovou a atribuição do aluno ${studentName}.

Status: Aluno vinculado com sucesso
Aprovado em: ${approvedAt}

O aluno já foi vinculado definitivamente ao professor e o processo pedagógico pode ser iniciado.
`
}

TeacherAssignmentApprovedHtml.PreviewProps = {
    analystFirstName: "Carlos",
    teacherName: "Maria Santos",
    studentName: "João Silva",
    approvedAt: "27/01/2026 às 14:35",
} as TeacherAssignmentApprovedProps

export default TeacherAssignmentApprovedHtml
