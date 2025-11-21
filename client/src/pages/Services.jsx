import React from 'react'
import CrudPage from './CrudPage'

const fields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'textarea' }
]

export default function Services(){
  return <CrudPage resource={'services'} fields={fields} />
}
