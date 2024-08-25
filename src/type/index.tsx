export interface MenuItemProps {
  id: number
  name: string
  description: string
  price: number
}

export interface ShoppingCartListProps extends MenuItemProps {
  quantity: number
  total: number
}

export interface CheckOutProps {
  id: string
  checkOutList: ShoppingCartListProps[]
  commit: string
  allTotal: number
}
