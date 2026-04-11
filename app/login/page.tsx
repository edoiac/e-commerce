"use client"
import Message, { messageType } from '@/components/message/Message'
import { useAuth } from '@/context/AuthProvider'
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


function Login() {
    const { saveAccessToken } = useAuth()
    const [loginSubmit, setloginSubmit] = useState<boolean | undefined>(undefined)
    const router = useRouter()

    const login = async (formData: FormData) => {
        const response = await fetch('http://localhost:8080/auth/login', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(
                {
                    username: formData.get("username"),
                    password: formData.get("password")
                }
            )
        })
        let body

        const contentType = response.headers.get("content-type")

        if (contentType && contentType.includes("application/json")) {
            body = await response.json()
        } else {
            body = await response.text()
        }

        if (!response.ok) {
            setloginSubmit(false)
            return
        }
        setloginSubmit(true)
        saveAccessToken(body.accessToken)
        setTimeout(() => {
            setloginSubmit(undefined)
            router.replace('/')
        }, 1000)
    }

    return (
        <div className="px-20">
            <main className="py-10">
                <h1 className='text-center text-4xl'>Please Login</h1>
                <div>
                    <Form action={login} className='flex flex-col items-center'>
                        <div className='my-5'>
                            <label htmlFor="username" className='block'>Username </label>
                            <input className='w-lg h-10 rounded-md border-1 border-gray-500 px-2' type="text" name='username' />
                        </div>
                        <div>
                            <label htmlFor="password" className='block'>Password </label>
                            <input className='w-lg h-10 rounded-md border-1 border-gray-500 px-2' type="password" name='password' />
                        </div>
                        <button type='submit' className='w-auto h-10 rounded-md border-1 border-gray-500 px-2 m-10'>Submit</button>
                    </Form>
                </div>
                {loginSubmit === true && <Message text='Login Successful' type={messageType.success} />}
                {loginSubmit === false && <Message text='Wrong Username or Password' type={messageType.error} />}
            </main>
        </div>
    )
}

export default Login