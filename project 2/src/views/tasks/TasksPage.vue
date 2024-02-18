<template>
   <main-master-page>
      <div class="mb-2">
         <tasks-list />
      </div>
      <div>
         <button @click="onAdd(task)">
            <font-awesome-icon :icon="['fas', 'plus']" color="red" />
            Add task</button>
      </div>
   </main-master-page>
</template>
 
 
<script setup>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'

import { onMounted } from 'vue'
import TasksList from './TasksList.vue'
import { useRouter } from 'vue-router'
const router = useRouter()



import { useTodoItemsStore } from '@/stores/todo'
const todoItemsStore = useTodoItemsStore()

onMounted(() => {
   todoItemsStore.loadItemsList()
})

function onAdd() {
   router.push({
      name: 'tasks-config'
   })
}


</script>
 
 
<style lang="scss" scoped></style>
 