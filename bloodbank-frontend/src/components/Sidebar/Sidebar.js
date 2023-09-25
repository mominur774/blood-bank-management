import useApiHelper from '@/api'
import GlobalContext from '@/context/GlobalContext'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const Sidebar = ({ page }) => {
  const gContext = useContext(GlobalContext)

  return (
    <div className='sidebar'>
      <h6 className='mt-3 mb-5 px-3'>Blood Bank Management System</h6>
      <ul className='px-3'>
        <li className={`nav-link ${page == 'Home' && 'active'}`}>
          <Link className='nav-item' href='/'>Home</Link>
        </li>
        <li className={`nav-link ${page == 'Blood Bank' && 'active'}`}>
          <Link className='nav-item' href={`${gContext?.isLoggedIn ? '/blood-bank' : '/sign-in'}`}>Blood Bank</Link>
        </li>
        <li className={`nav-link ${page == 'Donor' && 'active'}`}>
          <Link className='nav-item' href={`${gContext?.isLoggedIn ? '/donor' : '/sign-in'}`}>Donor</Link>
        </li>
        <li className={`nav-link ${page == 'Recipient' && 'active'}`}>
          <Link className='nav-item' href={`${gContext?.isLoggedIn ? '/recipient' : '/sign-in'}`}>Recipient</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar