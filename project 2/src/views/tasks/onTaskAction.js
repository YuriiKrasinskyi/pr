import { taskId, todoItemStore, taskObj, router } from './TaskEdit.vue'

export async function onTaskAction() {
  if (taskId.value) await todoItemStore.updateItem(taskId.value, taskObj)
  else await todoItemStore.addItem(taskObj)
  router.push({
    name: 'tasks'
  })
}
