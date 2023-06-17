import React, { useContext, useState } from 'react';
import { PageWrapper } from '@/components/Wrapper';
import Link from 'next/link';
import useApiHelper from '@/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import GlobalContext from '@/context/GlobalContext';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const api = useApiHelper();
  const router = useRouter();
  const gContext = useContext(GlobalContext)

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    api.signUp(formData).then(res => {
      Cookies.set('accessToken', res?.data?.access)
      router.push('/update-profile')
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <PageWrapper page="Sign Up">
      <div className="row login">
        <div className="col-lg-8 col-md-8 col-sm-12 mx-auto">
          <h4 className='mb-4'>Sign up</h4>
          <form onSubmit={handleSubmit} action="">
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className='form-control'
                placeholder='Email address'
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password1" className="form-label">Password</label>
              <input
                type="password"
                name="password1"
                className='form-control'
                placeholder='Password'
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password2" className="form-label">Confirm Password</label>
              <input
                type="password"
                name="password2"
                className='form-control'
                placeholder='Confirm Password'
                onChange={handleChange}
              />
            </div>
            <button
              className='btn btn-primary w-100 login-btn fw-bold py-2 mb-3'
              type="submit"
            >
              Sign Up
            </button>
            <span className='d-block text-center'>
              Already have an account? <Link href="/sign-in">Sign In</Link>
            </span>
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}

export default SignUp