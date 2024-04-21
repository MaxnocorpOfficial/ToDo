<script setup lang="ts">
import type { TNote } from '@/types'
import { ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { useNotes } from '@/composables/useNotes'
import { ElMessage, ElMessageBox } from 'element-plus'
import NoteForm from '@/components/NoteForm.vue'

const { notes } = useNotes()

const route = useRoute()
const note = structuredClone(
  toRaw(notes.value.find((note: TNote) => note.id === +route.params.id)) as TNote
)

const form = ref<TNote>({
  title: note.title,
  id: note.id,
  todos: note.todos
})

const submitForm = (localForm: TNote) => {
  ElMessageBox.confirm('Сохранить заметку?', 'Warning', {
    confirmButtonText: 'Да',
    cancelButtonText: 'Отмена',
    type: 'warning'
  }).then(() => {
    const noteIdx = notes.value.findIndex((i) => i.id === +route.params.id)
    notes.value[noteIdx] = localForm
    ElMessage({
      type: 'success',
      message: 'Заметка сохранена'
    })
  })
}
</script>

<template>
  <el-container class="container">
    <h1>Редактирование заметки</h1>
    <NoteForm
      ref="formEl"
      class="form"
      :is-form-expanded="true"
      :form="form"
      @submit="submitForm"
    />
  </el-container>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.form {
  width: 500px;
  margin: 0 auto;
}

.todo-form {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
}
</style>
