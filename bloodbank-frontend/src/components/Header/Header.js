import GlobalContext from '@/context/GlobalContext'
import Link from 'next/link';
import React, { useContext } from 'react';
import Profile from './Profile';

const Header = (props) => {
  const gContext = useContext(GlobalContext);

  return (
    <div className='header d-flex align-items-center justify-content-between my-3 py-2 px-3 py-1 mb-5'>
      <div className='d-flex align-items-center'>
        <h6>{props?.page}</h6>
      </div>
      <div>
        {gContext.isLoggedIn ? (
          <div className='profile'>
            <Profile />
          </div>
        ) : (
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" href="/sign-in">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/sign-up">Sign Up</Link>
                </li>
              </ul>
            </div>
          </nav>
        )
        }
      </div>
    </div>
  )
}

export default Header