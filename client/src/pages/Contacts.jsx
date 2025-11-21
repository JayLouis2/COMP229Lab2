import React from 'react'
import CrudPage from './CrudPage'

const fields = [
  { name: 'firstname', label: 'First Name' },
  { name: 'lastname', label: 'Last Name' },
  { name: 'email', label: 'Email' }
]

export default function Contacts(){
  return <CrudPage resource={'contacts'} fields={fields} />
}
