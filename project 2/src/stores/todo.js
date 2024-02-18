import { defineStore } from 'pinia'
import getStoreTemplate from './helpers/storeTemplate'
import { useGeneralStore } from './general'

export const useTodoItemsStore = defineStore('todoItems', () => {
  const generalStore = useGeneralStore()
  const { generalApiOperation } = generalStore

  return getStoreTemplate('todoList', generalApiOperation)
})
