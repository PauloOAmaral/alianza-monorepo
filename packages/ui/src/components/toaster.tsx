import { toast as notify, Toaster as SonnerToaster } from 'sonner'

const Toaster = () => {
    return <SonnerToaster position='top-center' />
}

export { Toaster, notify }
