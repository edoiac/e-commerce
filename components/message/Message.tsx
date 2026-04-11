import clsx from 'clsx/lite';

export enum messageType {
    error,
    success
}

interface MessageInterfaceProps {
    text: string
    type: messageType
}

function Message({ text, type }: MessageInterfaceProps) {
    return (
        <div className={
            clsx('w-auto inline-block rounded-md border-1 p-2',
                type === messageType.success && 'border-lime-500 text-lime-500 bg-lime-50',
                type === messageType.error && 'border-red-500 text-red-500 bg-red-50')
        }>{text}</div>
    )
}

export default Message