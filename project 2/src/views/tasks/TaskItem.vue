<template>
   <div
      class="flex flex-col space-y-[8px] w-64 p-2.5 rounded-2xl border-solid border border-light-grey-500 max-w-xs cursor-pointer">
      <div class="text-sm">{{ task.name }}</div>
      <div class="text-xs">{{ task.description }}</div>
      <div class="text-xs">{{ task.priority }}</div>

      <div class="flex gap-2 justify-end">
         <button @click="onEdit(task)" class="bg-[#f5f5f5] p-2 rounded-xl">edit</button>
         <button @click="onDelete(task)" class="bg-[#eda59e] p-2 rounded-xl text-white">delete</button>
      </div>
   </div>
</template>
 
<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

import { useRouter } from 'vue-router'
import { computed } from 'vue'
const router = useRouter()

import { useUsersStore } from '@/stores/users'
const { getCurrentUserPermissions } = storeToRefs(useUsersStore())

import { useTodoItemsStore } from '@/stores/todo'
const todoItemsStore = useTodoItemsStore()

import { storeToRefs } from 'pinia'

const props = defineProps({
   task: {
      type: Object,
      required: true
   }
})


function onEdit(task) {
   router.push({
      name: 'tasks-config',
      params: {
         id: props['task'].id
      }
   })
}
function onDelete(task) {
   todoItemsStore.deleteItem(task.id)
}




</script>



 
 