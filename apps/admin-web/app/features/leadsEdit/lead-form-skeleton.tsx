import { FieldGroup } from '@alianza/ui/components/ui/field'
import { Skeleton } from '@alianza/ui/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@alianza/ui/components/ui/tabs'
import { useTranslation } from 'react-i18next'

function FieldSkeleton() {
    return (
        <div className='space-y-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-9 w-full' />
        </div>
    )
}

function TextareaFieldSkeleton() {
    return (
        <div className='space-y-2'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-24 w-full' />
        </div>
    )
}

export function LeadEditFormSkeleton() {
    const { t } = useTranslation()

    return (
        <Tabs className='space-y-4' defaultValue='identification'>
            <TabsList className='grid w-full grid-cols-2 gap-2 md:grid-cols-4'>
                <TabsTrigger value='identification'>{t('dialogs.leads.sections.identification')}</TabsTrigger>
                <TabsTrigger value='contact'>{t('dialogs.leads.sections.contact')}</TabsTrigger>
                <TabsTrigger value='source'>{t('dialogs.leads.sections.source')}</TabsTrigger>
                <TabsTrigger value='context'>{t('dialogs.leads.sections.context')}</TabsTrigger>
            </TabsList>

            <TabsContent value='identification'>
                <FieldGroup className='grid gap-4 md:grid-cols-2'>
                    <FieldSkeleton />
                    <FieldSkeleton />
                    <FieldSkeleton />
                    <FieldSkeleton />
                    <TextareaFieldSkeleton />
                </FieldGroup>
            </TabsContent>

            <TabsContent value='contact'>
                <FieldGroup className='grid gap-4 md:grid-cols-2'>
                    <FieldSkeleton />
                    <div className='md:col-span-2'>
                        <FieldSkeleton />
                    </div>
                    <div className='md:col-span-2'>
                        <FieldSkeleton />
                    </div>
                </FieldGroup>
            </TabsContent>

            <TabsContent value='source'>
                <FieldGroup className='grid gap-4 md:grid-cols-2'>
                    <FieldSkeleton />
                    <FieldSkeleton />
                    <div className='md:col-span-2'>
                        <FieldSkeleton />
                    </div>
                </FieldGroup>
            </TabsContent>

            <TabsContent value='context'>
                <FieldGroup className='grid gap-4 md:grid-cols-2'>
                    <FieldSkeleton />
                    <FieldSkeleton />
                    <FieldSkeleton />
                </FieldGroup>
            </TabsContent>

            <div className='flex flex-wrap items-center gap-2'>
                <Skeleton className='h-9 w-20' />
            </div>
        </Tabs>
    )
}
