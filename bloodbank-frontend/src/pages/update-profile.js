import React, { useContext, useEffect, useState } from 'react';
import { PageWrapper } from '@/components/Wrapper';
import { useRouter } from 'next/router';
import useApiHelper from '@/api';
import { bloodGroup } from '@/enum';
import GlobalContext from '@/context/GlobalContext';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({});
  const api = useApiHelper();
  const router = useRouter();
  const gContext = useContext(GlobalContext);


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    api.updateUser(formData).then(res => {
      router.push('/')
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (gContext?.user) {
      setFormData(gContext?.user)
    }
  }, [gContext?.user])

  return (
    <PageWrapper page="Update Profile">
      <div className="row login">
        <div className="col-lg-8 col-md-8 col-sm-12 mx-auto">
          <h4 className='mb-4'>Update Profile</h4>
          <form onSubmit={handleSubmit} action="">
            <div className="form-group mb-3">
              <label htmlFor="first_name" className="form-label">First Name</label>
              <input
                type="text"
                name="first_name"
                className='form-control'
                placeholder='First Name'
                onChange={handleChange}
                defaultValue={formData?.first_name}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="last_name" className="form-label">Last Name</label>
              <input
                type="text"
                name="last_name"
                className='form-control'
                placeholder='Last Name'
                onChange={handleChange}
                defaultValue={formData?.last_name}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="last_name" className="form-label">Blood Group</label>
              <select
                className='form-select'
                name="blood_group"
                onChange={handleChange}
                defaultValue={formData.blood_group && formData?.blood_group || ""}
              >
                <option value="">Please select</option>
                {bloodGroup.map((blood, idx) => (
                  <option key={idx} value={blood.value}>
                    {blood.value}
                  </option>
                ))}
              </select>
            </div>
            <button
              className='btn btn-primary w-100 login-btn fw-bold py-2 mt-2 mb-3'
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}

export default UpdateProfile