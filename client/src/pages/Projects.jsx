import React from 'react'
import CrudPage from './CrudPage'

const fields = [
  { name: 'title', label: 'Title' },
  { name: 'completion', label: 'Completion Date', type: 'date' },
  { name: 'description', label: 'Description', type: 'textarea' }
]

export default function Projects(){
  return <CrudPage resource={'projects'} fields={fields} />
}
