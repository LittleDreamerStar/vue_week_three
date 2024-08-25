<script setup lang="ts">
import type { MenuItemProps, ShoppingCartListProps, CheckOutProps } from '@/type'
import { onMounted, ref } from 'vue'
import menuData from '@/data/data.json'

import MenuItem from '../components/MenuItem.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import CheckOut from '../components/CheckOut.vue'

const menu = ref<MenuItemProps[]>([])
const shoppingCartList = ref<ShoppingCartListProps[]>([])
const commit = ref<string>('')
const checkOut = ref<CheckOutProps[]>([])

const addShoppingCart = (item: MenuItemProps) => {
  const calcRepeat = shoppingCartList.value.some(({ id }) => id === item.id)

  if (calcRepeat) {
    alert('選單重複')
    return
  }

  shoppingCartList.value = [...shoppingCartList.value, { ...item, quantity: 1, total: item.price }]
}

const UpdateQuantity = (data: ShoppingCartListProps, quantity: number) => {
  shoppingCartList.value = shoppingCartList.value.map((item) =>
    item.id === data.id ? { ...data, quantity, total: quantity * item.price } : item
  )
}

const UpdateCommit = (data: Event) => {
  commit.value = (data.target as HTMLSelectElement).value
}

const DeleteItem = (data: ShoppingCartListProps) => {
  shoppingCartList.value = shoppingCartList.value.filter((item) => item.id !== data.id)
}

const PostCheckOut = () => {
  checkOut.value = [
    ...checkOut.value,
    {
      id: crypto.randomUUID(),
      checkOutList: shoppingCartList.value,
      commit: commit.value,
      allTotal: shoppingCartList.value
        .map(({ total }) => total)
        .reduce((allTotal, item) => allTotal + item, 0)
    }
  ]
  shoppingCartList.value = []
  commit.value = ''
}

onMounted(() => {
  if (!menu.value.length && menuData.length) menu.value = menuData
})
</script>

<template>
  <div id="root">
    <div class="container mt-5">
      <header class="p-2 mt-4 rounded-4 bg-info text-center mb-5">
        <h1 class="m-0 fs-3 fw-bold text-white text-center">飲料店 POS 系統</h1>
      </header>
      <div class="row">
        <MenuItem v-if="menu.length" :menu="menu" @addShoppingCart="addShoppingCart" />
        <div class="col-md-8">
          <ShoppingCart
            :shoppingCartList="shoppingCartList"
            @UpdateQuantity="UpdateQuantity"
            :commit="commit"
            @UpdateCommit="UpdateCommit"
            @DeleteItem="DeleteItem"
            @PostCheckOut="PostCheckOut"
          />
        </div>
      </div>
      <hr />
      <CheckOut :checkOut="checkOut" />
    </div>
  </div>
</template>
