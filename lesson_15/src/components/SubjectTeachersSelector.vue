<template>
   <div>
      <label>
         {{ subjectTitle }}
         <select v-model="selectedTeacher" @change="onChange">
            <option v-for="teacher in teachersList" :key="teacher.id" :value="teacher.id">
               {{ teacher.name }}
            </option>
         </select>
      </label>
   </div>
</template>

<script setup>
import { useSubjectsStore } from '@/stores/subjects';
import { useTeachersStore } from '@/stores/teachers';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const subjectsStore = useSubjectsStore()
const { getSubjectById } = storeToRefs(subjectsStore)

const teachersStore = useTeachersStore()
const { getTeachersBySubjectId } = storeToRefs(teachersStore)

const selectedTeacher = ref(null)

const props = defineProps({
   subjectsId: {
      type: [Number, String],
      required: true
   }
})

const emit = defineEmits(['teacher-selected'])

const subjectTitle = computed(() => {
   getSubjectById.value(parseInt(props.subjectsId))?.title
})

const teachersList = computed(() => {
   return getTeachersBySubjectId.value(parseInt(props.subjectsId))
})

function onChange() {
   emit('teacher-selected', selectedTeacher.value)
}

</script>

<style lang="scss" scoped></style>