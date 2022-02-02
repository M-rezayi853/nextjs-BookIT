import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

import ButtonLoader from '../layout/ButtonLoader'
import { resetPassword, clearErrors } from '../../redux/actions/userActions'

const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()
  const dispatch = useDispatch()

  const { success, loading, error } = useSelector(
    (state) => state.forgotPassword
  )

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (success) {
      router.push('/login')
    }
  }, [dispatch, error, success, router])

  const submitHandler = (e) => {
    e.preventDefault()

    const passwords = {
      password,
      confirmPassword,
    }

    dispatch(resetPassword(router.query.token, passwords))
  }
  return (
    <div className='row wrapper'>
      <div className='col-10 col-lg-5'>
        <form className='shadow-lg' onSubmit={submitHandler}>
          <h1 className='mb-3'>New Password</h1>

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

          <div className='form-group'>
            <label htmlFor='confirm_password_field'>Confirm Password</label>
            <input
              type='password'
              id='confirm_password_field'
              className='form-control'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id='new_password_button'
            type='submit'
            className='btn btn-block py-3'
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : 'Set Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewPassword
