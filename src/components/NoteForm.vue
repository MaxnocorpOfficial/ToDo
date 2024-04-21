<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import type { TNote } from '@/types'

const props = defineProps<{ isFormExpanded: boolean; form: TNote | null }>()
const emits = defineEmits<{ (event: 'submit', value: TNote): void }>()

const { form } = toRefs(props)

const localForm = ref({
  title: form?.value?.title || '',
  id: form?.value?.id || Date.now(),
  todos: form?.value?.todos.length
    ? form?.value?.todos
    : [
        {
          description: '',
          id: Date.now(),
          checked: false
        }
      ]
})

const handleAddTodo = () => {
  localForm.value.todos.push({
    description: '',
    id: Date.now(),
    checked: false
  })
}

const handleDeleteTodo = (idx: number) => {
  localForm.value.todos.splice(idx, 1)
}

const resetForm = () => {
  localForm.value = {
    title: '',
    id: Date.now(),
    todos: [
      {
        description: '',
        id: Date.now(),
        checked: false
      }
    ]
  }
}

defineExpose({
  resetForm,
  form: localForm
})
</script>

<template>
  <el-form>
    <el-form-item label="Название">
      <el-input v-model="localForm.title" autocomplete="off" />
    </el-form-item>
    <el-form-item v-for="(todo, idx) in localForm.todos" :key="idx">
      <div class="todo-form">
        <el-checkbox v-if="isFormExpanded" v-model="todo.checked" size="large" />
        <el-input v-model="todo.description" autocomplete="off" />
        <el-button
          v-if="localForm.todos.length > 1"
          type="primary"
          :icon="Delete"
          @click="handleDeleteTodo(idx)"
        />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Plus" @click="handleAddTodo" />
    </el-form-item>
    <el-form-item v-if="isFormExpanded">
      <el-button type="primary" @click="emits('submit', localForm)">Сохранить</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.todo-form {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
}
</style>
