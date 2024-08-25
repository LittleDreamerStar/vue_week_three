<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { ShoppingCartListProps } from '@/type'

const props = defineProps<{
  shoppingCartList: ShoppingCartListProps[]
  commit: string
}>()

const totalPrice = computed(() => {
  const total = props.shoppingCartList.reduce((total, item) => total + item.total, 0)
  return total
})

const emit = defineEmits<{
  (key: 'UpdateQuantity', data: ShoppingCartListProps, quantity: number): void
  (key: 'UpdateCommit', data: Event): void
  (key: 'DeleteItem', data: ShoppingCartListProps): void
  (key: 'PostCheckOut'): void
}>()

const UpdateQuantity = (e: Event, data: ShoppingCartListProps) => {
  const quantity = (e.target as HTMLSelectElement).value
  emit('UpdateQuantity', data, Number(quantity))
}
const UpdateCommit = (e: Event) => {
  emit('UpdateCommit', e)
}

const DeleteItem = (data: ShoppingCartListProps) => {
  emit('DeleteItem', data)
}
</script>

<template>
  <table class="table text-center">
    <thead>
      <tr>
        <th scope="col" width="50">序列</th>
        <th scope="col">品項</th>
        <th scope="col">描述</th>
        <th scope="col" width="90">數量</th>
        <th scope="col">單價</th>
        <th scope="col">小計</th>
      </tr>
    </thead>
    <tbody v-if="props.shoppingCartList.length">
      <tr v-for="(item, index) in props.shoppingCartList" :key="item.id" class="text-center">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ item.name }}</td>
        <td>
          <small>{{ item.description }}</small>
        </td>
        <td>
          <select
            class="form-select form-select-sm"
            :value="item.quantity"
            @change="UpdateQuantity($event, item)"
          >
            <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
          </select>
        </td>
        <td>${{ item.price }}</td>
        <td>${{ item.total }}</td>
        <td>
          <button type="button" class="btn btn-sm btn-danger" @click="DeleteItem(item)">
            刪除
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="text-end mb-3" v-if="props.shoppingCartList.length">
    <h5>
      總計: <span>${{ totalPrice }}</span>
    </h5>
  </div>

  <textarea
    v-if="props.shoppingCartList.length"
    :value="props.commit"
    @input="UpdateCommit"
    class="form-control"
    placeholder="備註"
    id="order-comment"
    style="height: 100px"
  />

  <div class="text-end mt-4" v-if="props.shoppingCartList.length">
    <button class="btn btn-primary" @click="emit('PostCheckOut')">送出</button>
  </div>
</template>

<style lang="scss">
td {
  min-height: 80px;
  vertical-align: middle;
  text-align: center;
}
th {
  vertical-align: middle;
  text-align: center;
}
</style>
