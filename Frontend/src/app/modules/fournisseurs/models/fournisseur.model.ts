export type Fournisseur = {
  id?: string
  name?: string
  type?: string
  currencyCode?: string // currency code not exit in BE
  paymentTerm?: string
  address?: string
  codeCity?: string
  nameCity?: string
  wilayaName?: string // willaya code missing in FE
  phone?: string
  email?: string
  code?: string
  vendorSKU?: any
  shippingAddress?: string
  shippingCity?: string
}
