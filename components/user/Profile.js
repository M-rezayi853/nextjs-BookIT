import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

import ButtonLoader from '../layout/ButtonLoader'
import Loader from '../layout/Loader'
import { updateProfile, clearErrors } from '../../redux/actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants'

const Profile = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = user
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpeg'
  )

  const { user: loadedUser, loading } = useSelector((state) => state.loadedUser)

  const {
    isUpdated,
    loading: updateLoading,
    error,
  } = useSelector((state) => state.user)

  useEffect(() => {
    if (loadedUser) {
      setUser({
        name: loadedUser.name,
        email: loadedUser.email,
      })

      setAvatarPreview(loadedUser.avatar.url)
    }

    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      router.push('/')
      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, error, isUpdated, router, loadedUser])

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
      avatar,
    }

    dispatch(updateProfile(userData))
  }

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result)
          setAvatarPreview(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  return (
    <>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center'>
          <Loader />
        </div>
      ) : (
        <div className='container container-fluid'>
          <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
              <form className='shadow-lg' onSubmit={submitHandler}>
                <h1 className='mb-3'>Update Profile</h1>

                <div className='form-group'>
                  <label htmlFor='name_field'>Name</label>
                  <input
                    type='text'
                    id='name_field'
                    className='form-control'
                    value={name}
                    onChange={onChange}
                    name='name'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email_field'>Email</label>
                  <input
                    type='email'
                    id='email_field'
                    className='form-control'
                    value={email}
                    onChange={onChange}
                    name='email'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password_field'>Password</label>
                  <input
                    type='password'
                    id='password_field'
                    className='form-control'
                    value={password}
                    onChange={onChange}
                    name='password'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='avatar_upload'>Avatar</label>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex'>
                      <figure className='avatar mr-3 item-rtl'>
                        <Image
                          src={avatarPreview}
                          className='rounded-circle'
                          alt='image'
                          width={175}
                          height={175}
                        />
                      </figure>
                    </div>
                    <div className='custom-file'>
                      <input
                        type='file'
                        name='avatar'
                        className='custom-file-input'
                        id='customFile'
                        accept='images/*'
                        onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id='login_button'
                  type='submit'
                  className='btn btn-block py-3'
                  disabled={updateLoading}
                >
                  {updateLoading ? <ButtonLoader /> : 'UPDATE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
