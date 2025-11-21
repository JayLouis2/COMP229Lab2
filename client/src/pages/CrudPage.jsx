import React, { useEffect, useState } from 'react'
import * as api from '../api'

export default function CrudPage({ resource, fields }){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(() => ({}))

  useEffect(()=>{ fetchAll() }, [resource])

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null)
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  async function fetchAll(){
    setLoading(true); setError(null); setSuccess(null)
    try{
      const data = await api.list(resource)
      setItems(data)
    }catch(err){ 
      setError(`Failed to load ${resource}: ${err.message}`)
    }
    setLoading(false)
  }

  function openNew(){ 
    setEditing(null); 
    setForm({}); 
    setError(null); 
    setSuccess(null); 
  }
  
  function openEdit(item){ 
    setEditing(item._id || item.id); 
    setForm(item); 
    setError(null); 
    setSuccess(null); 
  }

  function change(e){
    const { name, value } = e.target
    setForm(prev=> ({ ...prev, [name]: value }))
  }

  async function save(e){
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try{
      if (editing) {
        await api.update(resource, editing, form)
        setSuccess(`${resource.slice(0,-1)} updated successfully!`)
      } else {
        await api.create(resource, form)
        setSuccess(`${resource.slice(0,-1)} created successfully!`)
      }
      fetchAll()
      setForm({})
      setEditing(null)
    }catch(err){ 
      setError(`Failed to save ${resource.slice(0,-1)}: ${err.message}`)
    }
    setLoading(false)
  }

  async function del(id){
    if (!window.confirm('Are you sure you want to delete this item?')) return
    setError(null)
    setSuccess(null)
    setLoading(true)
    try{ 
      await api.remove(resource, id)
      setSuccess(`${resource.slice(0,-1)} deleted successfully!`)
      fetchAll()
    }catch(err){ 
      setError(`Failed to delete ${resource.slice(0,-1)}: ${err.message}`)
      setLoading(false)
    }
  }

  async function deleteAll(){
    if (!window.confirm(`Are you sure you want to delete all ${resource}? This action cannot be undone.`)) return
    setError(null)
    setSuccess(null)
    setLoading(true)
    try{
      await api.removeAll(resource)
      setSuccess(`All ${resource} deleted successfully!`)
      fetchAll()
    }catch(err){
      setError(`Failed to delete all ${resource}: ${err.message}`)
      setLoading(false)
    }
  }

  return (
    <div className="crud-page">
      <div className="toolbar">
        <button onClick={openNew} disabled={loading}>Add {resource.slice(0,-1)}</button>
        <button onClick={deleteAll} disabled={loading}>Delete All</button>
      </div>

      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}
      
      {loading && !items.length ? <div className="loading">Loading...</div> : (
        <>
          {items.length === 0 ? (
            <div className="empty-state">No {resource} found. Click "Add {resource.slice(0,-1)}" to create one.</div>
          ) : (
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
                      <button onClick={()=>openEdit(it)} disabled={loading}>Edit</button>
                      <button onClick={()=>del(it._id || it.id)} disabled={loading}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      <div className="form-wrap">
        <h3>{editing ? 'Edit' : 'Add'} {resource.slice(0,-1)}</h3>
        <form onSubmit={save}>
          {fields.map(f => (
            <div key={f.name} className="field">
              <label>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  name={f.name}
                  value={form[f.name] || ''}
                  onChange={change}
                  rows={4}
                />
              ) : (
                <input
                  name={f.name}
                  type={f.type || 'text'}
                  value={form[f.name] || ''}
                  onChange={change}
                  required={f.required !== false}
                />
              )}
            </div>
          ))}
          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={()=>{ setForm({}); setEditing(null); setError(null); setSuccess(null) }} disabled={loading}>
              Cancel
            </button>
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
