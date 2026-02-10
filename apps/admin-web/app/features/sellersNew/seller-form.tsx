import { Button } from '@alianza/ui/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@alianza/ui/components/ui/dialog'
import { FieldGroup } from '@alianza/ui/components/ui/field'
import { Separator } from '@alianza/ui/components/ui/separator'
import { objectToFormData } from '@alianza/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useFetcher, useLoaderData, useNavigate } from 'react-router'
import { BaseSelectField } from '~/components/shared/base-select-field'
import { BasicForm } from '~/components/shared/basic-form'
import type { action as createSellerAction, loader } from '~/routes/sellers-new'
import {
    type CreateSellerFormInputType,
    type CreateSellerFormOutputType,
    useCreateSellerSchema
} from './schema'

type UserContextOption = { id: string; label: string }

interface SellerFormProps {
    userContextOptions: UserContextOption[]
}

function mapOptionsToSelectItems(options: UserContextOption[]) {
    return options.map((opt) => ({ id: opt.id, name: opt.label }))
}

export function SellerForm({ userContextOptions }: SellerFormProps) {
    const { t } = useTranslation()
    const createSellerSchema = useCreateSellerSchema()
    const createSellerFetcher = useFetcher<typeof createSellerAction>()

    const form = useForm<CreateSellerFormInputType, unknown, CreateSellerFormOutputType>({
        resolver: zodResolver(createSellerSchema),
        defaultValues: {
            userContextId: ''
        }
    })

    async function handleSubmit(values: CreateSellerFormOutputType) {
        await createSellerFetcher.submit(objectToFormData(values), { method: 'POST' })
    }

    const isPending = createSellerFetcher.state !== 'idle'
    const selectItems = mapOptionsToSelectItems(userContextOptions)

    return (
        <BasicForm addProvider={form} onSubmit={handleSubmit}>
            <FieldGroup className='grid gap-4 grid-cols-1'>
                <BaseSelectField
                    items={selectItems}
                    label={t('fields.sellers.userContext.label', { defaultValue: 'Usuário do sistema' })}
                    name='userContextId'
                    required
                >
                    {(option) => <span className='truncate'>{option.name ?? option.id}</span>}
                </BaseSelectField>
            </FieldGroup>

            <div className='flex flex-wrap items-center gap-2'>
                <Button asChild type='button' variant='outline'>
                    <Link to='/sellers'>{t('buttons.cancel')}</Link>
                </Button>
                <Button isPending={isPending} type='submit'>
                    {t('buttons.save')}
                </Button>
            </div>
        </BasicForm>
    )
}

export function SellerNewDialog() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { userContextOptions } = useLoaderData<typeof loader>()

    return (
        <Dialog
            onOpenChange={(open) => {
                if (!open) navigate('/sellers')
            }}
            open={true}
        >
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <DialogTitle>{t('dialogs.sellers.new.title', { defaultValue: 'Novo vendedor' })}</DialogTitle>
                    <DialogDescription>
                        {t('dialogs.sellers.new.description', {
                            defaultValue: 'Vincule um usuário do sistema como vendedor. Código e prefixo serão gerados automaticamente.'
                        })}
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <SellerForm userContextOptions={userContextOptions} />
            </DialogContent>
        </Dialog>
    )
}
