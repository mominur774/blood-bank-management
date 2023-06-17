import React, { useContext, useEffect, useState } from 'react';
import { PageWrapper } from '@/components/Wrapper';
import useApiHelper from '@/api';
import { useRouter } from 'next/router';
import GlobalContext from '@/context/GlobalContext';

const DonateBlood = () => {
  const [hospital, setHospital] = useState();
  const [hospitalList, setHospitalList] = useState([]);
  const [error, setError] = useState("");

  const api = useApiHelper()
  const router = useRouter()
  const gContext = useContext(GlobalContext);

  const donateBlood = (e) => {
    e.preventDefault();
    api.createDonor(hospital).then(res => {
      router.push('/blood-bank')
    }).catch(error => {
      setError(error.response.data[0])
    })
  }

  useEffect(() => {
    api.hospitalList().then(res => {
      setHospitalList(res.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <PageWrapper page="Donate Blood">
      <h5 className='mb-3'>Donate Blood</h5>
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <form onSubmit={donateBlood} action="">
            <div className="form-group mb-3">
              <label htmlFor="hospital" className="form-label">Select a hospital</label>
              <select
                name="hospital"
                className="form-select"
                onChange={(e) => setHospital({ "hospital": e.target.value })}
                required
              >
                <option value="">Please select</option>
                {hospitalList?.map(hospital => (
                  <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                ))}
              </select>
            </div>
            <button
              className='btn btn-primary'
              type="submit"
              disabled={!gContext?.user?.blood_group}
            >
              Donate
            </button>
            {!gContext?.user?.blood_group && <span className='d-block mt-2'>Please add blood group</span>}
            {error && <span className='d-block mt-2 text-danger'>{error}</span>}
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}

export default DonateBlood