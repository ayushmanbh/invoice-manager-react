export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_INVOICE':
      return {
        ...state,
        invoices: state.invoices.filter(invoice => invoice.id !== action.payload)
      };
    case 'ADD_INVOICE':
      return {
        ...state,
        invoices: [...state.invoices, action.payload]
      };
    case 'EDIT_INVOICE':
      const updatedInvoice = action.payload;

      const updatedInvoices = state.invoices.map(invoice => {
        if (invoice.id === updatedInvoice.id) {
          return updatedInvoice;
        }
        return invoice;
      });

      return {
        ...state,
        invoices: updatedInvoices
      };
    default: return state;
  }
}
