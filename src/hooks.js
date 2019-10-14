import { useState } from 'react'

export const useField = (type) => {  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  const field = {
    type,
    value,
    onChange,
  }

  return [
    field,
    reset
  ]
}

// module can have several named exports
export const useAnotherHook = () => {  // ...
}