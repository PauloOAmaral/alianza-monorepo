import type { WorkflowTranslation } from '@alianza/application/admin/types'
import { useTranslation } from 'react-i18next'

export function useWorkflowTranslation() {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language as 'pt' | 'en'

    const translate = (translation: WorkflowTranslation): string => {
        return translation[currentLanguage] || translation.pt || translation.en || ''
    }

    return { translate, currentLanguage }
}
