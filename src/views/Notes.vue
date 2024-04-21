<script setup lang="ts">
import { ref } from 'vue'
import Note from '@/components/Note.vue'
import NoteForm from '@/components/NoteForm.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useNotes } from '@/composables/useNotes'

const { notes } = useNotes()

const dialogFormVisible = ref(false)
const formEl = ref()

const handleCreateNote = () => {
  dialogFormVisible.value = false
  notes.value.push(formEl.value.form)
  formEl.value.resetForm()
}

const handleDeleteNote = (id: number) => {
  const noteIdx = notes.value.findIndex((n) => n.id === id)
  ElMessageBox.confirm('Удалить заметку?', 'Warning', {
    confirmButtonText: 'Да',
    cancelButtonText: 'Отмена',
    type: 'warning'
  }).then(() => {
    notes.value.splice(noteIdx, 1)
    ElMessage({
      type: 'success',
      message: 'Заметка удалена'
    })
  })
}
</script>

<template>
  <el-container class="container">
    <h1>Notes App</h1>
    <el-main>
      <p v-if="!notes.length" class="empty-data">Заметок нет!</p>
      <Note
        v-else
        class="note"
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @delete="handleDeleteNote"
      />
      <el-button type="primary" class="create-note" @click="dialogFormVisible = true">
        Создать заметку
      </el-button>
    </el-main>
  </el-container>

  <el-dialog
    v-model="dialogFormVisible"
    title="Новая заметка"
    width="500"
    @close="formEl.resetForm()"
  >
    <NoteForm ref="formEl" :is-form-expanded="false" :form="null" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button type="primary" @click="handleCreateNote"> Создать </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.create-note {
  position: fixed;
  bottom: 3rem;
  right: 3rem;
}

.empty-data {
  text-align: center;
}
</style>
