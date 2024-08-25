<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { MenuItemProps } from '@/type/index'

const props = defineProps<{
  menu: MenuItemProps[]
}>()

const addShoppingCart = defineEmits<{
  (key: 'addShoppingCart', data: MenuItemProps): void
}>()
</script>

<template>
  <div class="col-md-4">
    <ul class="list-group">
      <li v-for="item in props.menu" :key="item.id" class="menu-item list-group-item">
        <button
          type="button"
          @click="addShoppingCart('addShoppingCart', item)"
          class="px-3 btn-menu d-flex justify-content-between align-items-center p-0 w-100 border-0 bg-transparent"
        >
          <div class="text-start">
            <span class="fw-bold">{{ item.name }}</span>
            <p class="d-none d-lg-block m-0">{{ item.description }}</p>
          </div>
          <span class="fs-5 text-nowrap">${{ item.price }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.menu-item {
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.075);
  }
}

p {
  font-size: 16px;
}
</style>
