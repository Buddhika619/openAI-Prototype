import React, { useEffect } from 'react'
// import Selection from '../components/Selection'
import { Label, TextInput, Card, Button, Textarea } from 'flowbite-react'
import axios from 'axios'
import { useState } from 'react'
import Spinner from '../components/Spinner'



import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'







const EmailCancellation = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
console.log(data)
  const [value, setValue] = useState({ name: 'Optimistic' })
  console.log(value)

  const [formData, setFormData] = useState({})

  console.log(formData)

  const {
    
  } = formData

  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  let fetch = async (order) => {
    try {
      setLoading(true)
      const { data } = await axios.post('/testing',order)
      setData(data)
      setLoading(false)

    
    } catch (error) {
      console.log(error)
    }
  }


  const people = [
    { name: 'Optimistic' },
    { name: 'Hopeful' },
    { name: 'Sad' },
    { name: 'Pessimistic' },
    { name: 'Humorous' },
    { name: 'Joyful' },
  ]


  const onSubmit = (e) => {
    e.preventDefault()
    fetch({formData, value})
 
  }

  

  function Selection({people}) {
    const [selected, setSelected] = useState(people[0])
  
    return (
      <div className=' top-16 w-200'>
        <Listbox value={selected} onChange={setValue} >
          <div className='relative mt-1'>
            <Listbox.Button
              className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline outline-blue-500 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'
              style={{
                outlineWidth: '2px',
                border: '1px solid #C5C5C5'
              }}

             
            >
              <span className='block truncate'>{selected.name}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-cyan-100	 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={person}
                    
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-blue-300'>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    )
  }
  



  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <form className='flex flex-col gap-4' onSubmit={onSubmit}>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='subject' value='Subject of the Mail' />
          </div>
          <TextInput
            id='subject'
            type='text'
            placeholder='Ex: Order Cancelation'
            onChange={onMutate}
            required={true}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='to' value='To whom?' />
          </div>
          <TextInput
            id='to'
            type='text'
            placeholder='Ex: Mr.Charlie Brown'
            onChange={onMutate}
            required={true}
          />
        </div>

        <div>
          <div className='mb-2 block'>
            <Label htmlFor='from' value='Who is sending this Mail?' />
          </div>
          <TextInput
            id='from'
            onChange={onMutate}
            type='text'
            placeholder='Ex: Mr.Fox Mulder'
            required={true}
          />
        </div>

        <div>
          <div className='mb-2 block'>
            <Label htmlFor='reason' value='Main Resason' />
          </div>
          <Textarea
            id='reason'
            onChange={onMutate}
            placeholder='Ex: Due to insufficent fund'
            required={true}
            rows={2}
          />
        </div>

        <div className=' block'>
          <Label htmlFor='text' value='Choose a tone' />
        </div>


        <Selection people = {people}/>

        <Button className='mt-4' type='submit'>
          Create Content
        </Button>
      </form>

     
      
      {data && (
        <Card href='#'>
        <p className='font-normal text-gray-700 dark:text-gray-400'>
          {data.result.text}
        </p>
        </Card>
      )}
       
     
    </>
  )
}

export default EmailCancellation
