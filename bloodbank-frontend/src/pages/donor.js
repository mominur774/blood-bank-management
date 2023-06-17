import useApiHelper from '@/api';
import { PageWrapper } from '@/components/Wrapper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import moment from 'moment';

const Donor = () => {
  const [donors, setDonors] = useState([]);

  const api = useApiHelper()
  const router = useRouter();

  useEffect(() => {
    api.getDonor(router.query).then(res => {
      setDonors(res.data)
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
    <PageWrapper page="Donor">
      <h5 className='mb-3'>Donor List</h5>
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
            <option value="owner">Donor (asc)</option>
            <option value="-owner">Donor (desc)</option>
            <option value="hospital">Hospital (asc)</option>
            <option value="-hospital">Hospital (desc)</option>
            <option value="created_at">Created at (asc)</option>
            <option value="-created_at">Create at (desc)</option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Hospital</th>
              <th>Blood Group</th>
              <th>Donate Date</th>
            </tr>
          </thead>
          <tbody>
            {donors.map(donor => (
              <tr key={donor?.id}>
                <td>{donor?.donor_details?.name}</td>
                <td>{donor?.hospital_name}</td>
                <td>{donor?.donor_details?.blood_group}</td>
                <td>{moment(donor?.created_at).fromNow()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  )
}

export default Donor