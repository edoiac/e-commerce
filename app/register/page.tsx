"use client"
import Form from 'next/form'

const Register = () => {

    const register = async (formData: FormData) => {
        const response = await fetch('http://localhost:8080/auth/register', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(
                {
                    username: formData.get("username"),
                    password: formData.get("password")
                }
            )
        })
        let body;

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            body = await response.json();
        } else {
            body = await response.text();
        }

        if (!response.ok) {
            console.error("Errore:", body);
            throw new Error(body.message || body || "Registration failed");
        }

        console.log("Success:", body);
    }

    return (
        <div className="px-20">
            <main className="py-10">
                <h1 className='text-center text-4xl'>Please Register</h1>
                <div>
                    <Form action={register} className='flex flex-col items-center'>
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
            </main>
        </div>
    )
}

export default Register