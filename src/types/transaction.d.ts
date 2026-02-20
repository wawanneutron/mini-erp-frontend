import type { Product } from './product'

export interface TransactionItem {
  id: number
  transaction_id: number
  product_id: number
  qty: number
  price_at_transaction: string
  subtotal: string
  created_at: string
  updated_at: string
  product: Product
}

export interface Transaction {
  id: number
  tenant_id: number
  user_id: number
  total: string
  created_at: string
  updated_at: string
  items: TransactionItem[]
}
