import React, { createContext, useState, useContext, useReducer, useEffect } from 'react'
import { invoiceReducer } from './reducer'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    data: undefined
  })

  const getLocalInvoices = () => {
    if (localStorage.getItem('invoices') === null) {
      return []
    }
    const invoices = JSON.parse(localStorage.getItem('invoices'))
    return invoices
  }

  const [state, dispatch] = useReducer(invoiceReducer, {
    invoices: getLocalInvoices()
  })

  useEffect(() => {
    const invoices = JSON.stringify(state.invoices)
    localStorage.setItem('invoices', invoices)
  }, [state.invoices])

  const removeInvoice = (id) => {
    dispatch({
      type: 'REMOVE_INVOICE',
      payload: id
    });
  };

  const addInvoice = (invoice) => {
    dispatch({
      type: 'ADD_INVOICE',
      payload: invoice
    });
  };

  const editInvoice = (invoice) => {
    dispatch({
      type: 'EDIT_INVOICE',
      payload: invoice
    });
  };

  const calculateTotal = (quantity, price, discount, tax) => {
    const subtotal = quantity * price
    const totalAfterDiscount = subtotal - subtotal * (discount / 100)
    const total = totalAfterDiscount + totalAfterDiscount * (tax / 100)
    return total.toFixed(2)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        addInvoice,
        removeInvoice,
        editInvoice,
        calculateTotal,
        ...state
      }}
    >
      { children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }