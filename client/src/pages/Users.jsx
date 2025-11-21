import React from 'react'
import CrudPage from './CrudPage'

const fields = [
  { name: 'firstname', label: 'First Name' },
  { name: 'lastname', label: 'Last Name' },
  { name: 'email', label: 'Email' },
  { name: 'password', label: 'Password', type: 'password' }
]

export default function Users(){
  return <CrudPage resource={'users'} fields={fields} />
}
