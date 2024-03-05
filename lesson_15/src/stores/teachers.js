import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTeachersStore = defineStore('teachers', () => {
  const teachersList = ref([
    { id: 1, name: 'Олександр Іванович', subjectId: 3 },
    { id: 2, name: 'Наталія Петрівна', subjectId: 4 },
    { id: 3, name: 'Єва Юріївна', subjectId: 5 },
    { id: 4, name: 'Оксана Петрівна', subjectId: 1 },
    { id: 5, name: 'Анна Василівна', subjectId: 2 },
    { id: 6, name: 'Олександр Федорович', subjectId: 3 },
    { id: 7, name: 'Олеся Петрівна', subjectId: 4 },
    { id: 8, name: 'Єва Андріївна', subjectId: 5 },
    { id: 9, name: 'Оксана Феофанівна', subjectId: 1 },
    { id: 10, name: 'Анна Сергіївна', subjectId: 2 }
  ])

  const getTeacherById = computed(
    () => (teacherId) => teachersList.value.find((teacher) => teacher.id === teacherId)
  )

  const getTeachersBySubjectId = computed(
    () => (subjectId) => teachersList.value.filter((subject) => subject.subjectId === subjectId)
  )
  return { teachersList, getTeacherById, getTeachersBySubjectId }
})
