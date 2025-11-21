import React, { useEffect, useState } from 'react'
import * as api from '../api'

export default function CrudPage({ resource, fields }){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(() => ({}))

  useEffect(()=>{ fetchAll() }, [resource])

  async function fetchAll(){
    setLoading(true); setError(null)
    try{
      const data = await api.list(resource)
      setItems(data)
    }catch(err){ setError(err.message) }
    setLoading(false)
  }

  function openNew(){ setEditing(null); setForm({}); }
  function openEdit(item){ setEditing(item._id || item.id); setForm(item) }

  function change(e){
    const { name, value } = e.target
    setForm(prev=> ({ ...prev, [name]: value }))
  }

  async function save(e){
    e.preventDefault()
    try{
      if (editing) {
        await api.update(resource, editing, form)
      } else {
        await api.create(resource, form)
      }
      fetchAll(); setForm({}); setEditing(null)
    }catch(err){ setError(err.message) }
  }

  async function del(id){
    if (!confirm('Delete item?')) return
    try{ await api.remove(resource, id); fetchAll() }catch(err){ setError(err.message) }
  }

  return (
    <div className="crud-page">
      <div className="toolbar">
        <button onClick={openNew}>Add {resource.slice(0,-1)}</button>
        <button onClick={()=>{ if(confirm('Delete all?')) api.removeAll(resource).then(fetchAll).catch(e=>setError(e.message)) }}>Delete All</button>
      </div>

      {error && <div className="error">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <table>
          <thead>
            <tr>
              {fields.map(f=> <th key={f.name}>{f.label}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it=> (
              <tr key={it._id || it.id}>
                {fields.map(f => <td key={f.name}>{formatCell(it[f.name], f.type)}</td>)}
                <td>
                  <button onClick={()=>openEdit(it)}>Edit</button>
                  <button onClick={()=>del(it._id || it.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="form-wrap">
        <h3>{editing ? 'Edit' : 'Add'} {resource.slice(0,-1)}</h3>
        <form onSubmit={save}>
          {fields.map(f => (
            <div key={f.name} className="field">
              <label>{f.label}</label>
              <input
                name={f.name}
                type={f.type || 'text'}
                value={form[f.name] || ''}
                onChange={change}
              />
            </div>
          ))}
          <div className="actions">
            <button type="submit">Save</button>
            <button type="button" onClick={()=>{ setForm({}); setEditing(null) }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function formatCell(value, type){
  if (!value && value !== 0) return ''
  if (type === 'date') return new Date(value).toLocaleDateString()
  return String(value)
}
