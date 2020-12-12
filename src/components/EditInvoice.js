import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom"
import { useGlobalContext } from '../context'

const EditInvoice = (route) => {
  const history = useHistory()
  const { user, invoices, editInvoice, calculateTotal } = useGlobalContext()
  const [selectedInvoice, setSelectedInvoice] = useState({
    id: null,
    itemName: '',
    description: '',
    quantity: 0,
    price: 0,
    discount: 0,
    tax: 0,
    total: 0
  })

  useEffect(() => {
    const currentInvoiceId = route.match.params.id
    const currentInvoice = invoices.find(invoice => invoice.id === currentInvoiceId);
    setSelectedInvoice(currentInvoice);
    // eslint-disable-next-line
  }, [])

  const handleOnChange = (invoiceKey, value) => setSelectedInvoice({ ...selectedInvoice, [invoiceKey]: value })

  const onSubmit = e => {
    e.preventDefault();
    const { quantity, price, discount, tax } = selectedInvoice
    selectedInvoice.total = calculateTotal(quantity, price, discount, tax)
    editInvoice(selectedInvoice)
    history.push('/dashboard')
  }

  // if (!selectedInvoice || !selectedInvoice.id) {
  //   console.log(route);
  //   history.push('/dashboard')
  // }

  return (
    <div className='page'>
      {
        user.data ? (
          <>
            <h2>Create new Invoice</h2>
            <form className='form' onSubmit={onSubmit}>
              <label htmlFor="item-name">Item Name: </label>
              <input type="text" id="item-name" placeholder='Enter Item Name' value={selectedInvoice.itemName} onChange={e => handleOnChange('itemName', e.target.value)} />

              <label htmlFor="desc">Item description: </label>
              <input type="text" id="desc" placeholder='Enter Item Description' value={selectedInvoice.description} onChange={e => handleOnChange('description', e.target.value)} />

              <label htmlFor='status'>Status:</label>
              <select id='status' value={selectedInvoice.status} onChange={e => handleOnChange('status', e.target.value)}>
                <option value="due">Due</option>
                <option value="paid">Paid</option>
              </select>

              <div className="number-input">
                <div className="number-input-set">
                  <label htmlFor="quantity">Quantity: </label>
                  <input type="number" id="quantity" value={selectedInvoice.quantity} min={0} onChange={e => handleOnChange('quantity', parseInt(e.target.value))} />
                </div>

                <div className="number-input-set">
                  <label htmlFor="price">Price: </label>
                  <input type="number" id="price" value={selectedInvoice.price} min={0} step='any' onChange={e => handleOnChange('price', parseFloat(e.target.value))} />
                </div>
              </div>

              <div className="number-input">
                <div className="number-input-set">
                  <label htmlFor="discount">Discount: </label>
                  <input type="number" id="discount" value={selectedInvoice.discount} min={0} max={100} step='any' onChange={e => handleOnChange('discount', parseFloat(e.target.value))} />
                </div>

                <div className="number-input-set">
                  <label htmlFor="tax">Tax: </label>
                  <input type="number" id="tax" value={selectedInvoice.tax} min={0} max={100} step='any' onChange={e => handleOnChange('tax', parseFloat(e.target.value))} />
                </div>
              </div>

              <div className="far-apart">
                <div>
                  <p>Note: Tax is applicable on discounted price.</p>
                  <p>*Required fields</p>
                </div>
                <div>
                  <h4>Subtotal: ${selectedInvoice.quantity * selectedInvoice.price}</h4>
                  <h4>Tax: {selectedInvoice.tax}%</h4>
                  <h4>Discount: {selectedInvoice.discount}%</h4>
                  <h3>Total: ${calculateTotal(selectedInvoice.quantity, selectedInvoice.price, selectedInvoice.discount, selectedInvoice.tax)}</h3>
                </div>
              </div>

              <div className="action-btn">
                <input style={{ margin: '0' }} type="submit" value='Update' readOnly />
                <Link to='/dashboard' className='btn'>Cancel</Link>
              </div>
            </form>
          </>
        ) : (
            <div className="full-page-info">
              <h2>You are not logged in. Go to <span><button className='btn' onClick={() => history.push('/')}>Login</button></span></h2>
            </div>
          )
      }

    </div>
  )
}

export default EditInvoice
