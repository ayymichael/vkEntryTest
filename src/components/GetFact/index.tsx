import { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type ResponseType = {
  fact: string
  length: number
}

type Inputs = {
  example: string
  exampleRequired: string
}

const GetFact = () => {
  const [data, setData] = useState<ResponseType>({
    fact: '',
    length: 0,
  })
  const [clickFlag, setClickFlag] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      example: '',
      exampleRequired: '',
    },
  })

  const clickHandler = () => {
    setClickFlag(!clickFlag)
    if (inputRef.current) {
      inputRef.current.value = data.fact
    }
    inputRef.current?.focus()
    inputRef.current?.setSelectionRange(
      inputRef.current?.value.split(' ')[0].length,
      inputRef.current?.value.split(' ')[0].length
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      return await fetch('https://catfact.ninja/fact')
        .then((res) => res.json())
        .then((data) => setData(data))
    }
    fetchData()
  }, [clickFlag])

  return (
    <form
      onSubmit={handleSubmit(() => {
        clickHandler()
      })}
    >
      <label>Факт</label>
      <input
        {...register('example')}
        style={{ width: '1000px' }}
        ref={inputRef}
        value={inputRef.current?.value || ''}
      />
      {/* {errors.exampleRequired && true && <p>This field is required</p>} */}
      <input type="submit" />
    </form>
  )
}

export default GetFact
