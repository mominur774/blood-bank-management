import React, { useState } from 'react';
import { PageWrapper } from '@/components/Wrapper';
import Link from 'next/link';
import useApiHelper from '@/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [formData, setFormData] = useState({});

  const api = useApiHelper();
  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    api.signIn(formData).then(res => {
      Cookies.set('accessToken', res?.data?.access)
      router.push('/')
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <PageWrapper page="Sign In">
      <div className="row login">
        <div className="col-lg-8 col-md-8 col-sm-12 mx-auto">
          <h4 className='mb-4'>Welcome back!</h4>
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
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className='form-control'
                placeholder='Password'
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <div className='forgot-password'>
                <Link href="#">Forgot password?</Link>
              </div>
            </div>
            <button
              className='btn btn-primary w-100 login-btn fw-bold py-2 mb-3'
              type="submit"
            >
              Sign In
            </button>
            <span className='d-block text-center'>
              Don't have an account? <Link href="/sign-up">Sign Up</Link>
            </span>
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}

export default SignIn