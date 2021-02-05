import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context';

const AddInvoice = () => {
  const [itemName, setItemName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(0)
  const [status, setStatus] = useState('due')
  const [isPending, setIsPending] = useState(false)

  const { user, addInvoice, calculateTotal } = useGlobalContext()
  const history = useHistory()

  const handleForm = (e) => {
    e.preventDefault()

    setIsPending(true)

    const newInvoice = {
      id: uuidv4(),
      itemName,
      description,
      quantity,
      price,
      discount,
      tax,
      status,
      total: parseFloat(calculateTotal(quantity, price, discount, tax))
    }

    addInvoice(newInvoice)
    setIsPending(false)
    history.push('/dashboard')
  }

  return (
    <div className='page'>
      {
        user.data ? (
          <>
            <h2>Create new Invoice</h2>
            <form className='form' onSubmit={handleForm}>
              <label htmlFor="item-name">Item Name*: </label>
              <input type="text" id="item-name" placeholder='Enter Item Name' value={itemName} onChange={e => setItemName(e.target.value)} required />

              <label htmlFor="desc">Item description*: </label>
              <input type="text" id="desc" placeholder='Enter Item Description' value={description} onChange={e => setDescription(e.target.value)} required />

              <label htmlFor='status'>Status*:</label>
              <select id='status' value={status} onChange={e => setStatus(e.target.value)}
                required>
                <option value="due">Due</option>
                <option value="paid">Paid</option>
              </select>

              <div className="number-input">
                <div className="number-input-set">
                  <label htmlFor="quantity">Quantity*: </label>
                  <input type="number" id="quantity" value={quantity} min={0} onChange={e => setQuantity(parseInt(e.target.value))} required />
                </div>

                <div className="number-input-set">
                  <label htmlFor="price">Price*: </label>
                  <input type="number" id="price" value={price} min={0} step='any' onChange={e => setPrice(parseFloat(e.target.value))} required />
                </div>
              </div>

              <div className="number-input">
                <div className="number-input-set">
                  <label htmlFor="discount">Discount*: </label>
                  <input type="number" id="discount" value={discount} min={0} max={100} step='any' onChange={e => setDiscount(parseFloat(e.target.value))} required />
                </div>

                <div className="number-input-set">
                  <label htmlFor="tax">Tax*: </label>
                  <input type="number" id="tax" value={tax} min={0} max={100} step='any' onChange={e => setTax(parseFloat(e.target.value))} required />
                </div>
              </div>

              <div className="far-apart">
                <div>
                  <p>Note: Tax is applicable on discounted price.</p>
                  <p>*Required fields</p>
                </div>
                <div>
                  <h4>Subtotal: ${quantity * price}</h4>
                  <h4>Tax: {tax}%</h4>
                  <h4>Discount: {discount}%</h4>
                  <h3>Total: ${calculateTotal(quantity, price, discount, tax)}</h3>
                </div>

              </div>

              {!isPending && <div className="action-btn">
                <input style={{ margin: '0' }} type="submit" value='Add' readOnly />
                <Link to='/dashboard' className='btn'>Cancel</Link>
              </div>}
              {isPending && <div className="action-btn">
                <input style={{ margin: '0' }} type="submit" value='Adding...' disabled readOnly />
              </div>}
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

export default AddInvoice
