import { Button } from '@alianza/ui/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { EmailField } from '~/components/form/fields/basic'

const ForgotPasswordForm = () => {

    const form = useForm()
    return (
        <FormProvider {...form}>
            <form className='space-y-4' onSubmit={e => e.preventDefault()}>
                {/* Email */}
                <div className='space-y-1'>
                    <EmailField label='Email address*' name='email' placeholder='Enter your email address' required />
                </div>

                <Button className='w-full' type='submit'>
                    Send Reset Link
                </Button>
            </form>
        </FormProvider>
    )
}

export { ForgotPasswordForm }
