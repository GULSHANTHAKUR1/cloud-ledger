import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import toast from 'react-hot-toast'

export default function StaffDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [tasks, setTasks]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [selectedTask, setSelectedTask] = useState(null)
  const [statusUpdate, setStatusUpdate] = useState('')
  const [noteUpdate, setNoteUpdate]     = useState('')

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out.')
    navigate('/login')
  }

  // Fetch only tasks assigned to this staff member
  const loadStaffTasks = async () => {
    if (!user?.email) return
    setLoading(true)
    let list = []

    try {
      const snap = await getDocs(collection(db, 'tasks'))
      snap.forEach(d => {
        const data = d.data()
        if (data.assignedStaffEmail?.toLowerCase() === user.email.toLowerCase()) {
          list.push({ id: d.id, ...data })
        }
      })
    } catch (err) {
      console.warn('Firestore tasks load notice:', err.message)
    }

    try {
      const local = JSON.parse(localStorage.getItem('cl_assigned_tasks') || '[]')
      local.forEach((t, i) => {
        if (t.assignedStaffEmail?.toLowerCase() === user.email.toLowerCase()) {
          const exists = list.some(x => x.title === t.title && x.clientName === t.clientName)
          if (!exists) {
            list.push({ id: `local-${i}`, ...t })
          }
        }
      })
    } catch (e) {}

    setTasks(list)
    setLoading(false)
  }

  useEffect(() => {
    loadStaffTasks()
  }, [user])

  // Update Task Status
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      if (taskId && !taskId.startsWith('local-')) {
        await updateDoc(doc(db, 'tasks', taskId), { status: newStatus })
      }

      // Update in localStorage
      try {
        const local = JSON.parse(localStorage.getItem('cl_assigned_tasks') || '[]')
        const updated = local.map(t => {
          if (t.title === selectedTask.title) {
            return { ...t, status: newStatus }
          }
          return t
        })
        localStorage.setItem('cl_assigned_tasks', JSON.stringify(updated))
      } catch (e) {}

      toast.success(`Task status updated to "${newStatus}"!`)
      setSelectedTask(prev => prev ? { ...prev, status: newStatus } : null)
      loadStaffTasks()
    } catch (err) {
      toast.error('Could not update status: ' + err.message)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Header */}
      <div style={{ background: '#0A1F44', padding: '0 2rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: '#1DB954', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>☁️</div>
          <div style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>
            Cloud<span style={{ color: '#1DB954' }}>Ledger</span>
          </div>
          <span style={{ background: 'rgba(59,130,246,0.2)', color: '#93c5fd', padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Staff Workspace
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
            {user?.email}
          </span>
          <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
            <i className="fas fa-sign-out-alt" /> Logout
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ padding: '2.5rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0A1F44', margin: 0 }}>
              My Assigned Work Tasks
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 4 }}>
              Tasks assigned directly to you by the Administrator. Update progress and upload deliverables.
            </p>
          </div>
          <button onClick={loadStaffTasks} className="btn btn-outline" style={{ padding: '9px 18px', fontSize: '0.85rem' }}>
            <i className="fas fa-sync-alt" /> Refresh Tasks
          </button>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.78rem' }}>Total Assigned</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0A1F44', marginTop: 4 }}>{tasks.length}</div>
          </div>
          <div style={{ background: 'white', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.78rem' }}>Pending Action</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563eb', marginTop: 4 }}>
              {tasks.filter(t => t.status !== 'Completed').length}
            </div>
          </div>
          <div style={{ background: 'white', border: '1.5px solid #f1f5f9', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.78rem' }}>Completed Filings</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16a34a', marginTop: 4 }}>
              {tasks.filter(t => t.status === 'Completed').length}
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', fontWeight: 800, color: '#0A1F44' }}>
            Assigned Work List
          </div>

          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.8rem', marginBottom: 10 }} />
              <div>Loading your assigned tasks...</div>
            </div>
          ) : tasks.length === 0 ? (
            <div style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569' }}>No Pending Tasks</div>
              <div style={{ fontSize: '0.85rem', marginTop: 4 }}>
                You have no active tasks assigned right now. Check back when Admin assigns new client filings.
              </div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '1px solid #e2e8f0', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 18px' }}>Task Details</th>
                    <th style={{ padding: '12px 18px' }}>Client</th>
                    <th style={{ padding: '12px 18px' }}>Due Date</th>
                    <th style={{ padding: '12px 18px' }}>Priority</th>
                    <th style={{ padding: '12px 18px' }}>Current Status</th>
                    <th style={{ padding: '12px 18px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t, idx) => (
                    <tr key={t.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#0A1F44' }}>{t.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.serviceCategory}</div>
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: 600, color: '#0A1F44' }}>
                        {t.clientName}
                      </td>
                      <td style={{ padding: '14px 18px', color: '#0A1F44', fontWeight: 600 }}>
                        {t.dueDate || '—'}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          background: t.priority === 'High' ? '#fee2e2' : '#fef3c7',
                          color: t.priority === 'High' ? '#b91c1c' : '#b45309',
                          padding: '2px 8px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700
                        }}>
                          {t.priority}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <select
                          value={t.status || 'Pending'}
                          onChange={e => handleUpdateStatus(t.id, e.target.value)}
                          style={{
                            padding: '4px 8px', borderRadius: 6, border: '1px solid #cbd5e1',
                            fontSize: '0.8rem', fontWeight: 600, background: 'white', color: '#0A1F44'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <button onClick={() => setSelectedTask(t)} className="btn btn-outline" style={{ padding: '5px 12px', fontSize: '0.75rem' }}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* ── MODAL: View Task Details ── */}
      {selectedTask && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(6, 15, 34, 0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        }}>
          <div style={{
            background: 'white', borderRadius: 20, maxWidth: 520, width: '100%',
            padding: '2.5rem', position: 'relative'
          }}>
            <button onClick={() => setSelectedTask(null)} style={{
              position: 'absolute', top: 20, right: 20, background: '#f1f5f9', border: 'none',
              borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', color: '#64748b',
            }}>✕</button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1F44', marginBottom: 4 }}>
              {selectedTask.title}
            </h3>
            <div style={{ color: '#2563eb', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              {selectedTask.serviceCategory} · {selectedTask.clientName}
            </div>

            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
              <div style={{ marginBottom: 6 }}><b>Due Date:</b> {selectedTask.dueDate || 'Standard'}</div>
              <div style={{ marginBottom: 6 }}><b>Priority:</b> {selectedTask.priority}</div>
              <div style={{ marginBottom: 8 }}><b>Current Status:</b> {selectedTask.status}</div>
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 8, color: '#475569' }}>
                <b>Admin Instructions:</b>
                <p style={{ margin: '4px 0 0', lineHeight: 1.6 }}>{selectedTask.description || 'Proceed with standard filing verification and notify Admin once completed.'}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { handleUpdateStatus(selectedTask.id, 'Completed'); setSelectedTask(null); }} className="btn btn-green" style={{ flex: 1, justifyContent: 'center' }}>
                <i className="fas fa-check" /> Mark as Completed
              </button>
              <button onClick={() => setSelectedTask(null)} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
