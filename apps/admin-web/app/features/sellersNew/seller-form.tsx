import { Button } from '@alianza/ui/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@alianza/ui/components/ui/dialog'
import { FieldGroup } from '@alianza/ui/components/ui/field'
import { Separator } from '@alianza/ui/components/ui/separator'
import { objectToFormData } from '@alianza/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useFetcher, useLoaderData, useNavigate } from 'react-router'
import { NumberField } from '~/components/form/fields/basic/number-field'
import { TextField } from '~/components/form/fields/basic/text-field'
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
            userContextId: '',
            referralCode: '',
            leadPrefix: '',
            dailyToSell: undefined,
            dailyExperimentalClass: undefined,
            pixelId: '',
            pixelSecret: ''
        }
    })

    async function handleSubmit(values: CreateSellerFormOutputType) {
        await createSellerFetcher.submit(objectToFormData(values), { method: 'POST' })
    }

    const isPending = createSellerFetcher.state !== 'idle'
    const selectItems = mapOptionsToSelectItems(userContextOptions)

    return (
        <BasicForm addProvider={form} onSubmit={handleSubmit}>
            <FieldGroup className='grid gap-4 grid-cols-1 md:grid-cols-2'>

                <BaseSelectField
                    items={selectItems}
                    label={t('fields.sellers.userContext.label')}
                    name='userContextId'
                    required
                >
                    {(option) => <span className='truncate'>{option.name ?? option.id}</span>}
                </BaseSelectField>

                <TextField
                    label={t('fields.sellers.referralCode.label')}
                    name='referralCode'
                    placeholder={t('fields.sellers.referralCode.placeholder')}
                />

                <TextField
                    label={t('fields.sellers.leadPrefix.label')}
                    name='leadPrefix'
                    placeholder={t('fields.sellers.leadPrefix.placeholder')}
                />

                <NumberField
                    label={t('fields.sellers.dailyToSell.label')}
                    name='dailyToSell'
                />

                <NumberField
                    label={t('fields.sellers.dailyExperimentalClass.label')}
                    name='dailyExperimentalClass'
                />

                <TextField
                    label={t('fields.sellers.pixelId.label')}
                    name='pixelId'
                />

                <TextField
                    label={t('fields.sellers.pixelSecret.label')}
                    name='pixelSecret'
                />

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
            <DialogContent className='max-w-lg'>
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
