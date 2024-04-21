export type TTodo = {
  description: string
  id: number
  checked: boolean
}

export type TNote = {
  title: string
  id: number
  todos: TTodo[]
}
