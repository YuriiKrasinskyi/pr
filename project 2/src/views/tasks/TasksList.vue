<template>
   <div class="flex flex-col space-y-[10px]">
      <task-item v-for="task in getItemsList" :key="task.id" :task="task"/>
   </div>
</template>
 
 
<script setup>
import TaskItem from './TaskItem.vue'

import { storeToRefs } from 'pinia';

import { useRouter } from 'vue-router'
const router = useRouter()


// import { computed } from 'vue'

import { useTodoItemsStore } from '@/stores/todo'

const todoItemsStore = useTodoItemsStore()
const { loadItemsList } = todoItemsStore
const { getItemsList } = storeToRefs(todoItemsStore)



</script>
 
 
<style lang="scss" scoped></style>