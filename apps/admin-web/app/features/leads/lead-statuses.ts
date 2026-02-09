export type LeadStatusOption = {
    value: string
    labelKey: string
}

export const leadStatusOptions: LeadStatusOption[] = [
    { value: 'pre_analisys', labelKey: 'leads.status.pre_analisys' },
    { value: 'created', labelKey: 'leads.status.created' },
    { value: 'in_service', labelKey: 'leads.status.in_service' },
    { value: 'experimental_class', labelKey: 'leads.status.experimental_class' },
    { value: 'experimental_class_missed', labelKey: 'leads.status.experimental_class_missed' },
    { value: 'feedback', labelKey: 'leads.status.feedback' },
    { value: 'contract', labelKey: 'leads.status.contract' },
    { value: 'waiting_payment', labelKey: 'leads.status.waiting_payment' },
    { value: 'paid', labelKey: 'leads.status.paid' },
    { value: 'talk_later', labelKey: 'leads.status.talk_later' },
    { value: 'disqualified', labelKey: 'leads.status.disqualified' }
]
