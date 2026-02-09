export type LeadSourceOption = {
    value: string
    code: number
    labelKey: string
}

export const leadSourceOptions: LeadSourceOption[] = [
    { value: 'facebook', code: 0, labelKey: 'leads.sources.facebook' },
    { value: 'messenger', code: 1, labelKey: 'leads.sources.messenger' },
    { value: 'instagram', code: 2, labelKey: 'leads.sources.instagram' },
    { value: 'direct', code: 3, labelKey: 'leads.sources.direct' },
    { value: 'google', code: 4, labelKey: 'leads.sources.google' },
    { value: 'tiktok', code: 5, labelKey: 'leads.sources.tiktok' },
    { value: 'youtube', code: 6, labelKey: 'leads.sources.youtube' },
    { value: 'blog', code: 7, labelKey: 'leads.sources.blog' },
    { value: 'email', code: 8, labelKey: 'leads.sources.email' },
    { value: 'indication', code: 9, labelKey: 'leads.sources.indication' },
    { value: 'company', code: 10, labelKey: 'leads.sources.company' },
    { value: 'affiliate', code: 11, labelKey: 'leads.sources.affiliate' },
    { value: 'influencer', code: 12, labelKey: 'leads.sources.influencer' },
    { value: 'student_indication', code: 13, labelKey: 'leads.sources.studentIndication' },
    { value: 'fb_forms', code: 14, labelKey: 'leads.sources.facebookForms' },
    { value: 'ex_student', code: 15, labelKey: 'leads.sources.exStudent' },
    { value: 'campaign', code: 16, labelKey: 'leads.sources.campaign' }
]

export const leadSourceCodeByValue = new Map(leadSourceOptions.map(option => [option.value, option.code]))
export const leadSourceValueByCode = new Map(leadSourceOptions.map(option => [option.code, option.value]))
