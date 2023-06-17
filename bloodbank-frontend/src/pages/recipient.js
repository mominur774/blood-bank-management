import useApiHelper from '@/api';
import { PageWrapper } from '@/components/Wrapper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import moment from 'moment';

const Recipient = () => {
  const [recipients, setRecipients] = useState([]);

  const api = useApiHelper()
  const router = useRouter();

  useEffect(() => {
    api.getRecipient(router.query).then(res => {
      setRecipients(res.data)
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
    <PageWrapper page="Recipient">
      <h5 className='mb-3'>Recipient List</h5>
      <Link href="/receive-blood">
        <button className='btn btn-primary mb-3'>
          Receive blood
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
            <option value="owner">Recipient (asc)</option>
            <option value="-owner">Recipient (desc)</option>
            <option value="blood_bank__hospital">Hospital (asc)</option>
            <option value="-blood_bank__hospital">Hospital (desc)</option>
            <option value="created_at">Created at (asc)</option>
            <option value="-created_at">Create at (desc)</option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>From (Hospital)</th>
              <th>Recipient</th>
              <th>Blood Group</th>
              <th>Bag Quantity</th>
              <th>Receive Date</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map(recipient => (
              <tr key={recipient?.id}>
                <td>{recipient?.blood_bank_details?.hospital}</td>
                <td>{recipient?.recipient}</td>
                <td>{recipient?.blood_bank_details?.blood_group}</td>
                <td>{recipient?.bag_quantity}</td>
                <td>{moment(recipient?.created_at).fromNow()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  )
}

export default Recipient