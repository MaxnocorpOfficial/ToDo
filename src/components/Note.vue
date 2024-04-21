<script setup lang="ts">
import type { TNote } from '@/types'
import { toRefs } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

type TProps = {
  note: TNote
}

const props = defineProps<TProps>()

const emits = defineEmits<{ (event: 'delete', id: number): void }>()

const { note } = toRefs(props)
</script>

<template>
  <el-card class="note">
    <template #header>
      <div class="note__header">
        <div class="note__title">{{ note.title }}</div>
        <div class="note__actions">
          <router-link :to="`/note/${note.id}`">
            <el-icon size="2rem" color="#409efc">
              <Edit />
            </el-icon>
          </router-link>
          <el-button type="danger" :icon="Delete" @click="emits('delete', note.id)" />
        </div>
      </div>
    </template>
    <p v-for="todo in note.todos" :key="todo.id" :class="{ 'todo-checked': todo.checked }">
      {{ todo.description }}
    </p>
  </el-card>
</template>

<style scoped lang="scss">
.note {
  margin-bottom: 2rem;

  &:hover {
    filter: brightness(99%);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 500;
  }
}

.todo-checked {
  text-decoration: line-through;
}
</style>
