import { Heading, Section, Text } from '@react-email/components'
import { Email } from '../components'

export interface TeacherAssignmentRejectedProps {
    analystFirstName: string
    teacherName: string
    studentName: string
    rejectionReason?: string
    rejectedAt: string
}

export const TeacherAssignmentRejectedHtml = ({ analystFirstName, teacherName, studentName, rejectionReason, rejectedAt }: TeacherAssignmentRejectedProps) => {
    const previewText = `Atribuição recusada: ${studentName} → ${teacherName}`

    return (
        <Email previewText={previewText}>
            <Section>
                <Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'>✗ Atribuição Recusada</Heading>
                <Text className='text-black text-[14px] leading-[24px]'>Olá {analystFirstName},</Text>
                <Text className='text-black text-[14px] leading-[24px]'>
                    O professor <strong>{teacherName}</strong> recusou a atribuição do aluno <strong>{studentName}</strong>.
                </Text>

                <Section className='bg-[#f8d7da] border-l-4 border-[#dc3545] rounded-md p-[20px] my-[24px]'>
                    <Text className='text-[#721c24] text-[14px] leading-[20px] m-0 font-semibold'>Status: Atribuição recusada</Text>
                    <Text className='text-[#721c24] text-[12px] leading-[18px] m-0 mt-[8px]'>Recusado em: {rejectedAt}</Text>
                    {rejectionReason && (
                        <>
                            <Text className='text-[#721c24] text-[12px] leading-[18px] m-0 mt-[12px] font-semibold'>Motivo:</Text>
                            <Text className='text-[#721c24] text-[12px] leading-[18px] m-0 mt-[4px] italic'>"{rejectionReason}"</Text>
                        </>
                    )}
                </Section>

                <Text className='text-black text-[14px] leading-[24px]'>O aluno retornou ao status de distribuição pendente e pode ser atribuído novamente a outro professor.</Text>
            </Section>
        </Email>
    )
}

export const TeacherAssignmentRejectedText = ({ analystFirstName, teacherName, studentName, rejectionReason, rejectedAt }: TeacherAssignmentRejectedProps) => {
    return `Olá ${analystFirstName},

ATRIBUIÇÃO RECUSADA

O professor ${teacherName} recusou a atribuição do aluno ${studentName}.

Status: Atribuição recusada
Recusado em: ${rejectedAt}
${rejectionReason ? `Motivo: "${rejectionReason}"` : ''}

O aluno retornou ao status de distribuição pendente e pode ser atribuído novamente a outro professor.
`
}

TeacherAssignmentRejectedHtml.PreviewProps = {
    analystFirstName: 'Carlos',
    teacherName: 'Maria Santos',
    studentName: 'João Silva',
    rejectionReason: 'Agenda incompatível com os horários disponíveis do aluno',
    rejectedAt: '27/01/2026 às 14:35'
} as TeacherAssignmentRejectedProps

export default TeacherAssignmentRejectedHtml
