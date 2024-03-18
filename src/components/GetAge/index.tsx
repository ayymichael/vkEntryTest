import { ChangeEventHandler, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type ResponseType = {
  count?: number
  name: string
  age: number
}

const GetAge = () => {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [data, setData] = useState<ResponseType>({
    name: '',
    age: 0,
  })
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      example: '',
      exampleRequired: '',
    },
  })

  const debounce = (callback: () => void, wait: number) => {
    let timeoutId: number | undefined
    return (...args: []) => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args)
      }, wait)
    }
  }

  const fetchAge = async (name: string) => {
    return await fetch(`https://api.agify.io/?name=${name}`)
        .then((res) => res.json())
        .then((data) => setData(data))
  }

  const clickHandler = (value: string) => {
    fetchAge(value)
  }

  const changeHandler: ChangeEventHandler<HTMLInputElement> = debounce(() => {
    if (inputRef.current) {
      setName(inputRef.current.value)
    }
    fetchAge(name)
  }, 3000)

  return (
    <>
      <form
        onSubmit={handleSubmit((event) => {
          clickHandler(event.example)
        })}
      >
        <label>Имя</label>
        <input ref={inputRef} onChange={changeHandler} type="text" />
        <button type="submit">Узнать возраст</button>
      </form>
      Ваш возраст: {data.age}
    </>
  )
}

export default GetAge
