
export type PrevState = { error?: string }

export type ActionFunction = (prev: PrevState, form: FormData) => Promise<{ error?: string }>