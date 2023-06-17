import React, { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/Wrapper';
import useApiHelper from '@/api';
import { useRouter } from 'next/router';


const Home = () => {
  const [hospitals, setHospitals] = useState([]);

  const api = useApiHelper();
  const router = useRouter();

  useEffect(() => {
    api.hospitalList(router.query).then(res => {
      setHospitals(res.data)
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
    <PageWrapper page="Home">
      <h5 className='mb-3'>Hospital List</h5>
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
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map(hospital => (
              <tr key={hospital?.id}>
                <td>{hospital?.name}</td>
                <td>{hospital?.phone_number1}</td>
                <td>{hospital?.email}</td>
                <td>{hospital?.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  )
}

export default Home