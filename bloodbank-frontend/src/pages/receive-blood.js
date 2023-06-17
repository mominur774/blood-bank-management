import React, { useContext, useEffect, useState } from 'react';
import { PageWrapper } from '@/components/Wrapper';
import useApiHelper from '@/api';
import { useRouter } from 'next/router';
import GlobalContext from '@/context/GlobalContext';

const ReceiveBlood = () => {
  const [formData, setFormData] = useState({});
  const [bloodBankList, setBloodBankList] = useState([]);
  const [errors, setErrors] = useState({})

  const api = useApiHelper()
  const router = useRouter()
  const gContext = useContext(GlobalContext);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const donateBlood = (e) => {
    e.preventDefault();
    api.createRecipient(formData).then(res => {
      setErrors({});
      router.push('/recipient')
    }).catch(error => {
      setErrors(error?.response?.data)
    })
  }

  useEffect(() => {
    api.getBloodBank().then(res => {
      setBloodBankList(res.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <PageWrapper page="Receive Blood">
      <h5 className='mb-3'>Receive Blood</h5>
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <form onSubmit={donateBlood} action="">
            <div className="form-group mb-3">
              <label htmlFor="hospital" className="form-label">Bag Quantity</label>
              <input
                type="number"
                name="bag_quantity"
                placeholder='Quantity'
                className="form-control"
                onChange={handleChange}
              />
              {errors.bag_quantity && <span className='d-block mt-2 text-danger'>{errors.bag_quantity}</span>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="hospital" className="form-label">Select a blood bank</label>
              <select
                name="blood_bank"
                className="form-select"
                onChange={handleChange}
                required
              >
                <option value="">Please select</option>
                {bloodBankList?.map(bank => (
                  <option key={bank.id} value={bank.id}>{bank.hospital_name}</option>
                ))}
              </select>
            </div>
            <button
              className='btn btn-primary'
              type="submit"
            >
              Receive
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}

export default ReceiveBlood