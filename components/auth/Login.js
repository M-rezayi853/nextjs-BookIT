import React, { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/client'

import ButtonLoader from '../layout/ButtonLoader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className='container container-fluid'>
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-3'>Login</h1>
            <div className='form-group'>
              <label htmlFor='email_field'>Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password_field'>Password</label>
              <input
                type='password'
                id='password_field'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link href='/password/forgot' className='float-right mb-4'>
              <a>Forgot Password?</a>
            </Link>

            <button
              id='login_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : 'LOGIN'}
            </button>

            <Link href={'/register'}>
              <a className='float-right mt-3'>New User?</a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
