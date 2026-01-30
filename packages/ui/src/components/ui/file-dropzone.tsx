import { Upload } from 'lucide-react'
import type React from 'react'
import type { RefObject } from 'react'

interface FileDropzoneProps {
    fileInputRef: RefObject<HTMLInputElement | null>
    handleBoxClick: () => void
    handleDragOver: (e: React.DragEvent) => void
    handleDrop: (e: React.DragEvent) => void
    handleFileSelect: (files: FileList | null) => void
}

export function FileDropzone({ fileInputRef, handleBoxClick, handleDragOver, handleDrop, handleFileSelect }: FileDropzoneProps) {
    return (
        <div className='px-6'>
            {/* biome-ignore lint/a11y/useSemanticElements: cannot use button — contains label (invalid HTML) */}
            <div
                className='border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer w-full bg-transparent'
                onClick={handleBoxClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleBoxClick()
                    }
                }}
                role='button'
                tabIndex={0}
            >
                <div className='mb-2 bg-muted rounded-full p-3'>
                    <Upload className='h-5 w-5 text-muted-foreground' />
                </div>
                <p className='text-sm font-medium text-foreground'>Upload a project image</p>
                <p className='text-sm text-muted-foreground mt-1'>
                    or,{' '}
                    <label
                        className='text-primary hover:text-primary/90 font-medium cursor-pointer'
                        htmlFor='fileUpload'
                        onClick={e => e.stopPropagation()}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                handleBoxClick()
                            }
                        }}
                    >
                        click to browse
                    </label>{' '}
                    (4MB max)
                </p>
                <input accept='image/*' className='hidden' id='fileUpload' onChange={e => handleFileSelect(e.target.files)} ref={fileInputRef} type='file' />
            </div>
        </div>
    )
}
