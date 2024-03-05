import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSubjectsStore = defineStore('subjects', () => {
  const subjectsList = ref([
    { id: 1, title: 'Математика' },
    { id: 2, title: 'Українська' },
    { id: 3, title: 'Англійська' },
    { id: 4, title: 'Фізика' },
    { id: 5, title: 'Хімія' },
    { id: 6, title: 'Біологія' }
  ])
  const getSubjectById = computed(
    () => (subjectId) => subjectsList.value.find((subject) => subject.id === subjectId)
  )
  return { subjectsList, getSubjectById }
})
