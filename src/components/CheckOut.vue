<script setup lang="ts">
import { defineProps } from 'vue'
import type { CheckOutProps } from '@/type'

const props = defineProps<{
  checkOut: CheckOutProps[]
}>()
</script>

<template>
  <div class="d-flex" :style="{ flexWrap: 'wrap' }">
    <div
      v-for="{ id, checkOutList, commit, allTotal } in props.checkOut"
      :key="id"
      class="row m-3 col-3"
      style="flex:auto"
    >
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <h5>訂單</h5>
            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col">品項</th>
                  <th scope="col">數量</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in checkOutList" :key="data.id">
                  <td>{{ data.name }}</td>
                  <td>{{ data.quantity }}</td>
                  <td>{{ data.total }}</td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    class="mt-4 mb-4"
                    :style="{ borderBottom: '0px', textAlign: 'justify' }"
                  >
                    備註: <span>{{ commit }}</span>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    class="mt-4 mb-4"
                    :style="{ borderBottom: '0px', textAlign: 'end' }"
                  >
                    <h5>
                      總計: <span>${{ allTotal }}</span>
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
