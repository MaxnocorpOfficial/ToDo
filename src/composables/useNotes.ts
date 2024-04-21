import type { TNote } from '@/types'
import { useStorage } from '@vueuse/core'

export function useNotes() {
  const notes = useStorage<TNote[]>('my-notes', [
    {
      title: 'NOTE 1',
      id: Date.now(),
      todos: [
        {
          description: 'NOTE 1 - TODO 1',
          id: Date.now(),
          checked: false
        },
        {
          description: 'NOTE 1 - TODO 2',
          id: Date.now(),
          checked: true
        },
        {
          description: 'NOTE 1 - TODO 3',
          id: Date.now(),
          checked: false
        }
      ]
    }
  ])

  return {
    notes
  }
}
