import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context';

const Dashboard = () => {
  const { user, invoices, removeInvoice } = useGlobalContext()
  const [invoicesToDisplay, setInvoicesToDisplay] = useState(invoices)

  const filterInvoices = (basis) => {
    if (basis === 'due') {
      const dueInvoices = invoices.filter(invoice => invoice.status === 'due')
      setInvoicesToDisplay(dueInvoices)
    } else if (basis === 'paid') {
      const paidInvoices = invoices.filter(invoice => invoice.status === 'paid')
      setInvoicesToDisplay(paidInvoices)
    } else {
      setInvoicesToDisplay(invoices)
    }
  }

  useEffect(() => {
    filterInvoices('all')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoices])

  const history = useHistory()

  return (
    <div className='page'>
      {
        user.data ? (
          <>
            <div className='far-apart'>
              <h2>Welcome, {user.data.name}</h2>
              <div><button className='btn' onClick={() => history.push('/add')}>Create</button></div>
            </div>
            <hr />
            <div className="far-apart">
              <h2>Invoice List</h2>
              <div>
                <button className='filter-btn' onClick={() => filterInvoices('all')}>All</button>
                <button className='filter-btn' onClick={() => filterInvoices('due')}>Due</button>
                <button className='filter-btn' onClick={() => filterInvoices('paid')}>Paid</button>
              </div>
            </div>
            {
              invoicesToDisplay.length === 0 ? (
                <div>
                  <h4>Empty List</h4>
                </div>
              ) : (
                  <div className="scrollable-list">
                    {
                      invoicesToDisplay.map(invoice => {
                        const { id, itemName, description, quantity, total } = invoice
                        return (
                          <div key={id} className='far-apart invoice'>
                            <div className="invoice-info">
                              <h4>Item: {itemName} | {description}</h4>
                              <h4>Units: {quantity}</h4>
                              <h4>Total: ${total}</h4>
                            </div>
                            <div className="action-btn">
                              <Link to={`/edit/${id}`} className='btn'>
                                <i className="fas fa-pencil-alt"></i>
                              </Link>
                              <button className="btn btn-danger" onClick={() => {
                                removeInvoice(id)
                                history.push('/dashboard')
                              }}>
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>

                )
            }
          </>
        ) : (
            <div className="full-page-info">
              <h2>You are not logged in. Go to <span><button className='btn' onClick={() => history.push('/')}>Login</button></span></h2>
            </div>
          )
      }
    </div >
  )
}

export default Dashboard
