import React, { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/Wrapper';
import useApiHelper from '@/api';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BloodBank = () => {
  const [bloodBank, setBloodBank] = useState([]);

  const api = useApiHelper()
  const router = useRouter();

  useEffect(() => {
    api.getBloodBank().then(res => {
      setBloodBank(res.data)
    }).catch(error => {
      console.log(error)
    })

  }, [router.query])

  const handleFilter = e => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [e.target.name]: e.target.value }
    })
  }

  return (
    <PageWrapper page="Blood Bank">
      <h5 className='mb-3'>Blood Bank</h5>
      <Link href="/donate-blood">
        <button className='btn btn-primary mb-3'>
          Donate blood
        </button>
      </Link>
      <div className='d-flex align-items-center justify-content-between my-3'>
        <div>
          <input
            className='form-control'
            type="text"
            name="search"
            placeholder='Search...'
            onChange={handleFilter}
          />
        </div>
        <div>
          <select onChange={handleFilter} className='form-select' name="ordering" id="">
            <option value="default">Default</option>
            <option value="name">Hospital (asc)</option>
            <option value="-name">Hospital (desc)</option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>Blood Group</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {bloodBank.map(bank => (
              <tr key={bank?.id}>
                <td>{bank?.hospital_name}</td>
                <td>{bank?.blood_group}</td>
                <td>{bank?.bag_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  )
}

export default BloodBank