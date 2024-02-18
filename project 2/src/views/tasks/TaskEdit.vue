<template>
   <Transition name="modal-outer">
      <div v-show="modalActive" class="m-auto max-w-xl h-screen">
         <div>
            <div>
               <input v-model="taskObj.name" ref="task" type="text" placeholder="Task name">
            </div>
            <div>
               <input v-model="taskObj.description" ref="description" type="text" placeholder="description">
            </div>
            <div>
               <select v-model="taskObj.priority" ref="priority">
                  <!-- <font-awesome-icon :icon="['fas', 'plus']" color="green" /> -->
                  <option disabled value="">priority</option>
                  <option>priority 1</option>
                  <option>priority 2</option>
                  <option>priority 3</option>
                  <option>priority 4</option>
               </select>
            </div>
            <v-date-picker></v-date-picker>
         </div>

         <hr>
         <div class="flex justify-end gap-2">
            <button @click="$emit('close-modal')" class="bg-[#f5f5f5] p-2 rounded-xl">Cancel</button>
            <button @click="onTaskAction" class="bg-[#eda59e] p-2 rounded-xl text-white">{{
               buttonTitle }}</button>
         </div>
         <div v-if="message && isMessageVisible">{{ message }}</div>
      </div>
   </Transition>
</template> 

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
   transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
   opacity: 0;
}
</style>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

import { storeToRefs } from 'pinia'
import { useTodoItemsStore } from '@/stores/todo.js'
const todoItemStore = useTodoItemsStore()
const { loadItemsList } = todoItemStore
const { getItemsList } = storeToRefs(todoItemStore)


let taskObj = ref({})
const taskId = computed(() => route.params.id)

function onCancel() {
   router.push({
      name: 'home',
   })
}

defineEmits(['close-modal'])
defineProps({
   modalActive: {
      type: Boolean,
      default: false,
   }
})

const buttonTitle = computed(() => taskId.value ? 'Save' : 'Add task')

const task = ref(null)
const description = ref(null)
const priority = ref(null)
const fieldName = ref(null)
const message = ref(null)
const isMessageVisible = computed(() => fieldName.value)
function onAdd() {
   if (!taskObj.name) {
      task.value.focus()
      fieldName.value = 'task'
      message.value = 'Введіть заголовок'
   }
   else if (!taskObj.description) {
      description.value.focus()
      fieldName.value = 'desk'
      message.value = 'Введіть текст'
   }
   else if (!taskObj.value) {
      priority.value.focus()
      fieldName.value = 'priority'
      message.value = 'Виберіть пріоритет'
   }
}

// const emit = defineEmits(['close-modal'])

async function onTaskAction() {
   if (taskId.value) await todoItemStore.updateItem
      (taskId.value, taskObj.value)
   else
      await
         todoItemStore.addItem(taskObj.value)
   router.push({
      name: 'tasks',
   })
   // emit('close-modal')
}

function cmon() {
   onAdd()
   onTaskAction()
}

onMounted(async () => {
   if (taskId.value) {
      taskObj.value = await todoItemStore.loadItemById(taskId.value)
   }
   // else {
   //    task.value.focus()
   // }
})

</script>