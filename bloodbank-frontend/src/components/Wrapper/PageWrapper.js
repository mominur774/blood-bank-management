import React from 'react'
import { Sidebar } from '../Sidebar'
import { Header } from '../Header'

const PageWrapper = ({ children, page }) => {
  return (
    <div className="row">
      <div className="col-lg-3 col-md-3">
        <Sidebar page={page} />
      </div>
      <div className="col-lg-9 col-md-9 main-content">
        <Header page={page} />
        {children}
      </div>
    </div>
  )
}

export default PageWrapper