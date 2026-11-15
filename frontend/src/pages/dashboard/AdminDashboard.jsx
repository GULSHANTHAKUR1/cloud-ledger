import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { initializeApp, deleteApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'
import { db, auth } from '../../firebase'
import toast from 'react-hot-toast'

const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC1zSnVq7s1WzwxAhmY_6Kjh-Ag3V4nt3c",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cloud-ledger-832a4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cloud-ledger-832a4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cloud-ledger-832a4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "340145833955",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:340145833955:web:b141a1b58ac2f6e031c2d6",
}

export default function AdminDashboard() {
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('enquiries')
  const [enquiries, setEnquiries] = useState([])
  const [usersList, setUsersList] = useState([])
  const [tasksList, setTasksList] = useState([])
  const [loading, setLoading]     = useState(true)

  // Create Staff Modal State
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [creatingUser, setCreatingUser]       = useState(false)
  const [createdUserInfo, setCreatedUserInfo] = useState(null)
  const [newStaffForm, setNewStaffForm]       = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'staff',
    department: 'GST & Indirect Taxation'
  })

  // Assign Task Modal State
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [creatingTask, setCreatingTask]   = useState(false)
  const [assignedTaskInfo, setAssignedTaskInfo] = useState(null)
  const [newTaskForm, setNewTaskForm]     = useState({
    title: '',
    clientName: '',
    serviceCategory: 'GST & Indirect Taxation',
    assignedStaffEmail: '',
    priority: 'High',
    dueDate: '',
    description: ''
  })

  // Daily Blog / Knowledge Updates State
  const [articlesList, setArticlesList]         = useState([])
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [creatingArticle, setCreatingArticle]   = useState(false)
  const [newArticleForm, setNewArticleForm]     = useState({
    title: '',
    cat: 'GST',
    excerpt: '',
    content: '',
    author: 'Senior CA Desk'
  })

  // Change Password Modal
  const [passwordModalUser, setPasswordModalUser] = useState(null)

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out.')
    navigate('/login')
  }

  // Load Enquiries
  const loadEnquiries = async () => {
    setLoading(true)
    let list = []

    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data(), source: 'Firestore Cloud' })
      })
    } catch (err) {
      console.warn('Firestore fetch notice:', err.code)
    }

    try {
      const local = JSON.parse(localStorage.getItem('cl_enquiries') || '[]')
      local.forEach((item, index) => {
        const exists = list.some(e => e.email === item.email && e.phone === item.phone && e.message === item.message)
        if (!exists) {
          list.push({ id: `local-${index}`, ...item, source: 'Local Storage' })
        }
      })
    } catch (e) {}

    setEnquiries(list)
    setLoading(false)
  }

  // Load Users from Firestore & local backup
  const loadUsers = async () => {
    let list = []
    try {
      const snap = await getDocs(collection(db, 'users'))
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() })
      })
    } catch (err) {
      console.warn('Users fetch notice:', err.code)
    }

    try {
      const localStaff = JSON.parse(localStorage.getItem('cl_staff_members') || '[]')
      localStaff.forEach((item, index) => {
        const exists = list.some(u => u.email === item.email)
        if (!exists) {
          list.push({ id: `local-staff-${index}`, ...item })
        }
      })
    } catch (e) {}

    setUsersList(list)
  }

  // Load Tasks
  const loadTasks = async () => {
    let list = []
    try {
      const snap = await getDocs(collection(db, 'tasks'))
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() })
      })
    } catch (err) {
      console.warn('Tasks fetch notice:', err.code)
    }

    try {
      const localTasks = JSON.parse(localStorage.getItem('cl_assigned_tasks') || '[]')
      localTasks.forEach((item, index) => {
        const exists = list.some(t => t.title === item.title && t.clientName === item.clientName)
        if (!exists) {
          list.push({ id: `local-task-${index}`, ...item })
        }
      })
    } catch (e) {}

    setTasksList(list)
  }

  // Load Articles / Daily Updates
  const loadArticles = async () => {
    let list = []
    try {
      const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data(), source: 'Firestore Cloud' })
      })
    } catch (err) {
      console.warn('Firestore articles load notice:', err.code)
    }

    try {
      const local = JSON.parse(localStorage.getItem('cl_custom_articles') || '[]')
      local.forEach((item, index) => {
        const exists = list.some(a => a.title === item.title)
        if (!exists) {
          list.push({ id: item.id || `local-art-${index}`, ...item, source: 'Local Storage' })
        }
      })
    } catch (e) {}

    setArticlesList(list)
  }

  // Create & Publish Daily Article
  const handleCreateArticle = async (e) => {
    e.preventDefault()
    if (!newArticleForm.title || !newArticleForm.excerpt) {
      toast.error('Please enter a title and summary.')
      return
    }

    setCreatingArticle(true)

    const catColors = {
      'GST': '#16a34a',
      'Income Tax': '#2563eb',
      'Company Law': '#d97706',
      'Labour Laws': '#7c3aed',
      'MSME': '#ea580c',
      'Accounting': '#059669',
    }

    const payload = {
      title: newArticleForm.title.trim(),
      cat: newArticleForm.cat,
      catColor: catColors[newArticleForm.cat] || '#16a34a',
      accentColor: catColors[newArticleForm.cat] || '#1DB954',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      excerpt: newArticleForm.excerpt.trim(),
      content: newArticleForm.content.trim(),
      author: newArticleForm.author.trim() || 'Senior CA Desk',
      createdAt: new Date().toISOString()
    }

    try {
      const docRef = await addDoc(collection(db, 'articles'), payload)
      payload.id = docRef.id
      toast.success('Daily update published to website!')
    } catch (err) {
      console.warn('Firestore direct write notice, caching locally:', err)
      const existing = JSON.parse(localStorage.getItem('cl_custom_articles') || '[]')
      payload.id = 'art-' + Date.now()
      localStorage.setItem('cl_custom_articles', JSON.stringify([payload, ...existing]))
      toast.success('Daily update published to website feed!')
    }

    setShowArticleModal(false)
    setCreatingArticle(false)
    setNewArticleForm({ title: '', cat: 'GST', excerpt: '', content: '', author: 'Senior CA Desk' })
    loadArticles()
  }

  // Delete Published Article
  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Are you sure you want to remove this published update from the website?')) return
    try {
      await deleteDoc(doc(db, 'articles', id))
    } catch (e) {}

    try {
      const local = JSON.parse(localStorage.getItem('cl_custom_articles') || '[]')
      const updated = local.filter(a => a.id !== id)
      localStorage.setItem('cl_custom_articles', JSON.stringify(updated))
    } catch (e) {}

    toast.success('Article removed from feed.')
    loadArticles()
  }

  useEffect(() => {
    loadEnquiries()
    loadUsers()
    loadTasks()
    loadArticles()
  }, [])

  // Auto-generate strong random password
  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$'
    let pass = ''
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewStaffForm(prev => ({ ...prev, password: pass }))
  }

  // Handle Create Staff/Client
  const handleCreateStaff = async (e) => {
    e.preventDefault()
    if (!newStaffForm.name || !newStaffForm.email || !newStaffForm.password) {
      toast.error('Please fill in Name, Email and Password.')
      return
    }

    setCreatingUser(true)

    try {
      const secondaryAppName = `SecondaryApp_${Date.now()}`
      const secondaryApp = initializeApp(FIREBASE_CONFIG, secondaryAppName)
      const secondaryAuth = getAuth(secondaryApp)

      const cred = await createUserWithEmailAndPassword(
        secondaryAuth,
        newStaffForm.email.trim(),
        newStaffForm.password
      )

      const uid = cred.user.uid

      const userPayload = {
        name: newStaffForm.name.trim(),
        email: newStaffForm.email.trim(),
        phone: newStaffForm.phone.trim(),
        role: newStaffForm.role,
        department: newStaffForm.department,
        createdAt: new Date().toISOString()
      }

      try {
        await setDoc(doc(db, 'users', uid), userPayload)
      } catch (dbErr) {
        console.warn('Firestore setDoc notice:', dbErr.message)
      }

      try {
        const local = JSON.parse(localStorage.getItem('cl_staff_members') || '[]')
        local.push({ id: uid, ...userPayload })
        localStorage.setItem('cl_staff_members', JSON.stringify(local))
      } catch (e) {}

      await signOut(secondaryAuth)
      await deleteApp(secondaryApp)

      toast.success(`${newStaffForm.role === 'staff' ? 'Staff' : 'Client'} account created!`)
      
      setCreatedUserInfo({
        ...userPayload,
        password: newStaffForm.password
      })

      loadUsers()
      setNewStaffForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'staff',
        department: 'GST & Indirect Taxation'
      })
      setShowCreateModal(false)

    } catch (err) {
      console.error(err)
      toast.error(err.code === 'auth/email-already-in-use' ? 'This email is already registered.' : (err.message || 'Error creating user.'))
    } finally {
      setCreatingUser(false)
    }
  }

  // Handle Delete / Deactivate User
  const handleDeleteUser = async (u) => {
    if (u.email === 'admin@cloudledger.in') {
      toast.error('Cannot delete the primary Super Admin account!')
      return
    }

    if (!window.confirm(`Are you sure you want to remove user "${u.name}" (${u.email})?`)) {
      return
    }

    try {
      if (u.id && !u.id.startsWith('local-')) {
        await deleteDoc(doc(db, 'users', u.id))
      }

      // Also remove from localStorage backup
      try {
        const local = JSON.parse(localStorage.getItem('cl_staff_members') || '[]')
        const filtered = local.filter(x => x.email !== u.email)
        localStorage.setItem('cl_staff_members', JSON.stringify(filtered))
      } catch (e) {}

      toast.success(`User ${u.name} removed successfully.`)
      loadUsers()
    } catch (err) {
      toast.error('Could not delete user: ' + err.message)
    }
  }

  // Handle Send Password Reset to Staff
  const handleSendResetEmail = async (staffEmail) => {
    try {
      await sendPasswordResetEmail(auth, staffEmail)
      toast.success(`Password reset link sent to ${staffEmail}!`)
    } catch (err) {
      toast.error('Error sending reset link: ' + err.message)
    }
  }

  // Handle Assign Task
  const handleAssignTask = async (e) => {
    e.preventDefault()
    if (!newTaskForm.title || !newTaskForm.clientName || !newTaskForm.assignedStaffEmail) {
      toast.error('Please fill in Task Title, Client Name and Select Staff.')
      return
    }

    setCreatingTask(true)

    const selectedStaff = usersList.find(u => u.email === newTaskForm.assignedStaffEmail)
    const staffName = selectedStaff ? selectedStaff.name : newTaskForm.assignedStaffEmail
    const staffPhone = selectedStaff?.phone || '7827225372'

    const taskPayload = {
      title: newTaskForm.title.trim(),
      clientName: newTaskForm.clientName.trim(),
      serviceCategory: newTaskForm.serviceCategory,
      assignedStaffEmail: newTaskForm.assignedStaffEmail.trim(),
      assignedStaffName: staffName,
      staffPhone: staffPhone,
      priority: newTaskForm.priority,
      dueDate: newTaskForm.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      description: newTaskForm.description.trim(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    }

    try {
      const taskDocId = `task_${Date.now()}`
      await setDoc(doc(db, 'tasks', taskDocId), taskPayload)
    } catch (err) {
      console.warn('Firestore task write notice:', err.message)
    }

    try {
      const local = JSON.parse(localStorage.getItem('cl_assigned_tasks') || '[]')
      local.unshift(taskPayload)
      localStorage.setItem('cl_assigned_tasks', JSON.stringify(local))
    } catch (e) {}

    setCreatingTask(false)
    toast.success('Task successfully created and assigned to staff!')

    setAssignedTaskInfo(taskPayload)
    loadTasks()

    setNewTaskForm({
      title: '',
      clientName: '',
      serviceCategory: 'GST & Indirect Taxation',
      assignedStaffEmail: '',
      priority: 'High',
      dueDate: '',
      description: ''
    })
    setShowTaskModal(false)
  }

  // Quick Staff filter options
  const staffMembers = usersList.filter(u => u.role === 'staff' || u.role === 'admin')

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Header */}
      <div style={{ background: '#0A1F44', padding: '0 2rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: '#1DB954', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>☁️</div>
          <div style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>
            Cloud<span style={{ color: '#1DB954' }}>Ledger</span>
          </div>
          <span style={{ background: 'rgba(29,185,84,0.15)', color: '#25d466', padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
            {role ? role.replace('_', ' ') : 'Super Admin'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="/" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="fas fa-external-link-alt" /> Public Website
          </a>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 500 }}>
            {user?.email || 'admin@cloudledger.in'}
          </span>
          <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
            <i className="fas fa-sign-out-alt" /> Logout
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ padding: '2.5rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Title Bar & Quick Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0A1F44', margin: 0 }}>
              Operations & Management Master Dashboard
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 4 }}>
              Assign tasks to staff, manage login credentials, and handle incoming client leads.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => setShowArticleModal(true)} className="btn btn-navy" style={{ padding: '9px 18px', fontSize: '0.85rem' }}>
              <i className="fas fa-feather-alt" /> Post Daily Update
            </button>
            <button onClick={() => setShowTaskModal(true)} className="btn btn-navy" style={{ padding: '9px 18px', fontSize: '0.85rem' }}>
              <i className="fas fa-plus-circle" /> Assign New Task
            </button>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-green" style={{ padding: '9px 18px', fontSize: '0.85rem' }}>
              <i className="fas fa-user-plus" /> Create Staff Account
            </button>
            <button onClick={() => { loadEnquiries(); loadUsers(); loadTasks(); loadArticles(); }} className="btn btn-outline" style={{ padding: '9px 16px', fontSize: '0.85rem' }}>
              <i className="fas fa-sync-alt" /> Refresh
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { label: 'Website Enquiries', value: enquiries.length, icon: '📩', color: '#ecfdf5', text: '#16a34a' },
            { label: 'Assigned Work Tasks', value: tasksList.length, icon: '📋', color: '#eff6ff', text: '#2563eb' },
            { label: 'Daily Blog Updates', value: articlesList.length, icon: '📰', color: '#fef3c7', text: '#d97706' },
            { label: 'Staff & Team Users', value: staffMembers.length, icon: '👨‍💼', color: '#fdf4ff', text: '#9333ea' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', border: '1.5px solid #f1f5f9', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                <span style={{ background: s.color, color: s.text, fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>Active</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0A1F44', lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: 10, borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
          {[
            { key: 'tasks',     label: `Assigned Tasks (${tasksList.length})`, icon: 'fa-tasks' },
            { key: 'blogs',     label: `Daily Blog & Updates (${articlesList.length})`, icon: 'fa-newspaper' },
            { key: 'users',     label: `Staff & Team (${staffMembers.length})`, icon: 'fa-users-cog' },
            { key: 'enquiries', label: `Client Enquiries (${enquiries.length})`, icon: 'fa-inbox' },
          ].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              background: 'none', border: 'none', padding: '12px 18px',
              borderBottom: activeTab === t.key ? '3px solid #0A1F44' : '3px solid transparent',
              color: activeTab === t.key ? '#0A1F44' : '#64748b',
              fontWeight: activeTab === t.key ? 700 : 500, fontSize: '0.9rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
            }}>
              <i className={`fas ${t.icon}`} /> {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: Assigned Tasks Table ── */}
        {activeTab === 'tasks' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, color: '#0A1F44', fontSize: '1rem' }}>
                  Work Distribution & Assigned Tasks
                </div>
                <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: 2 }}>
                  Admin assigns client files to specific staff members with due dates and WhatsApp notifications.
                </div>
              </div>
              <button onClick={() => setShowTaskModal(true)} className="btn btn-navy" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                <i className="fas fa-plus" /> Assign Task
              </button>
            </div>

            {tasksList.length === 0 ? (
              <div style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📋</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569' }}>No Tasks Assigned Yet</div>
                <div style={{ fontSize: '0.85rem', marginTop: 4 }}>
                  Click <b>"Assign New Task"</b> above to assign a filing or client file to a staff member.
                </div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '1px solid #e2e8f0', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '12px 18px' }}>Task Title</th>
                      <th style={{ padding: '12px 18px' }}>Client / Company</th>
                      <th style={{ padding: '12px 18px' }}>Assigned Staff</th>
                      <th style={{ padding: '12px 18px' }}>Due Date</th>
                      <th style={{ padding: '12px 18px' }}>Priority</th>
                      <th style={{ padding: '12px 18px' }}>Status</th>
                      <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasksList.map((t, idx) => {
                      const waNotifyText = encodeURIComponent(`Hello ${t.assignedStaffName}! Update on assigned task:\n\n📋 Task: ${t.title}\n🏢 Client: ${t.clientName}\n📅 Due Date: ${t.dueDate}\nStatus: ${t.status}\n\nLogin to view details: http://localhost:3000/login`)
                      const waUrl = `https://wa.me/${t.staffPhone ? t.staffPhone.replace(/[^0-9]/g, '') : '917827225372'}?text=${waNotifyText}`

                      return (
                        <tr key={t.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ fontWeight: 700, color: '#0A1F44' }}>{t.title}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.serviceCategory}</div>
                          </td>
                          <td style={{ padding: '14px 18px', fontWeight: 600, color: '#0A1F44' }}>
                            {t.clientName}
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ fontWeight: 600, color: '#2563eb' }}>{t.assignedStaffName}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.assignedStaffEmail}</div>
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
                            <span style={{
                              background: t.status === 'Completed' ? '#ecfdf5' : '#eff6ff',
                              color: t.status === 'Completed' ? '#16a34a' : '#2563eb',
                              padding: '3px 10px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 700
                            }}>
                              {t.status || 'Pending'}
                            </span>
                          </td>
                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ padding: '5px 12px', fontSize: '0.75rem' }} title="Ping staff on WhatsApp">
                              <i className="fab fa-whatsapp" /> Remind
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 4: Daily Blog & Knowledge Updates ── */}
        {activeTab === 'blogs' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 800, color: '#0A1F44', fontSize: '1rem' }}>
                  Daily Regulatory Briefs & Blog Publications
                </div>
                <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: 2 }}>
                  Publish tax notifications, circular summaries, and advisory articles directly to the website Knowledge Centre in real-time.
                </div>
              </div>
              <button onClick={() => setShowArticleModal(true)} className="btn btn-green" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                <i className="fas fa-feather-alt" /> + Post Daily Update
              </button>
            </div>

            {articlesList.length === 0 ? (
              <div style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📰</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569' }}>No Custom Updates Published Yet</div>
                <div style={{ fontSize: '0.85rem', marginTop: 4, maxWidth: 450, margin: '4px auto 1rem auto' }}>
                  The website is currently displaying the 6 default statutory guides. Click <b>"+ Post Daily Update"</b> to publish your first live regulatory brief!
                </div>
                <button onClick={() => setShowArticleModal(true)} className="btn btn-navy" style={{ padding: '9px 18px', fontSize: '0.85rem' }}>
                  Publish First Article
                </button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.78rem' }}>
                      <th style={{ padding: '12px 18px' }}>Category</th>
                      <th style={{ padding: '12px 18px' }}>Article Title</th>
                      <th style={{ padding: '12px 18px' }}>Published Date</th>
                      <th style={{ padding: '12px 18px' }}>Desk Author</th>
                      <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articlesList.map(art => (
                      <tr key={art.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            background: `${art.catColor || '#16a34a'}15`, color: art.catColor || '#16a34a',
                            padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase'
                          }}>
                            {art.cat}
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0A1F44', maxWidth: 360 }}>
                          <div>{art.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {art.excerpt}
                          </div>
                        </td>
                        <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.8rem' }}>
                          {art.date}
                        </td>
                        <td style={{ padding: '14px 18px', color: '#475569', fontWeight: 600 }}>
                          {art.author || 'Senior CA Desk'}
                        </td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                            <button
                              onClick={() => handleDeleteArticle(art.id)}
                              style={{
                                background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)',
                                padding: '6px 12px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer'
                              }}
                            >
                              <i className="fas fa-trash-alt" style={{ marginRight: 4 }} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: Staff & Accounts Management ── */}
        {activeTab === 'users' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, color: '#0A1F44', fontSize: '1rem' }}>
                  Staff Team & Permissions Control
                </div>
                <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: 2 }}>
                  Admin can create staff, reset passwords, change credentials, or remove accounts.
                </div>
              </div>
              <button onClick={() => setShowCreateModal(true)} className="btn btn-green" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                <i className="fas fa-user-plus" /> + Add Staff Account
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '1px solid #e2e8f0', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '12px 18px' }}>Staff Name</th>
                    <th style={{ padding: '12px 18px' }}>Login Email</th>
                    <th style={{ padding: '12px 18px' }}>Department</th>
                    <th style={{ padding: '12px 18px' }}>Mobile / WhatsApp</th>
                    <th style={{ padding: '12px 18px' }}>Role</th>
                    <th style={{ padding: '12px 18px', textAlign: 'right' }}>Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Super Admin */}
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fefce8' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 800, color: '#0A1F44' }}>
                      Super Admin (Primary Account)
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600, color: '#0A1F44' }}>admin@cloudledger.in</td>
                    <td style={{ padding: '14px 18px', color: '#64748b' }}>Master Control</td>
                    <td style={{ padding: '14px 18px', color: '#64748b' }}>7827225372</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ background: '#fef3c7', color: '#b45309', padding: '3px 10px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 700 }}>
                        Super Admin
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.78rem' }}>Master Key</span>
                    </td>
                  </tr>

                  {/* Staff Accounts */}
                  {usersList.filter(u => u.email !== 'admin@cloudledger.in').map((u, idx) => {
                    const waShareMsg = encodeURIComponent(`Hello ${u.name}! Your Cloud Ledger login credentials are:\n\nPortal: http://localhost:3000/login\nEmail: ${u.email}\nDepartment: ${u.department || 'General'}`)
                    const waUrl = `https://wa.me/${u.phone ? u.phone.replace(/[^0-9]/g, '') : '917827225372'}?text=${waShareMsg}`

                    return (
                      <tr key={u.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0A1F44' }}>
                          {u.name}
                        </td>
                        <td style={{ padding: '14px 18px', color: '#0A1F44' }}>
                          {u.email}
                        </td>
                        <td style={{ padding: '14px 18px', color: '#64748b' }}>
                          {u.department || 'Operations'}
                        </td>
                        <td style={{ padding: '14px 18px', color: '#64748b' }}>
                          {u.phone || '—'}
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            background: u.role === 'staff' ? '#eff6ff' : '#ecfdf5',
                            color: u.role === 'staff' ? '#2563eb' : '#16a34a',
                            padding: '3px 10px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize'
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                            <button
                              onClick={() => handleSendResetEmail(u.email)}
                              className="btn btn-outline"
                              style={{ padding: '5px 10px', fontSize: '0.75rem', borderColor: '#cbd5e1' }}
                              title="Send password reset link to staff email"
                            >
                              <i className="fas fa-key" /> Reset Pass
                            </button>

                            <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ padding: '5px 10px', fontSize: '0.75rem' }} title="Send credentials on WhatsApp">
                              <i className="fab fa-whatsapp" />
                            </a>

                            <button
                              onClick={() => handleDeleteUser(u)}
                              style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', padding: '5px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                              title="Delete staff account"
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 3: Enquiries Table ── */}
        {activeTab === 'enquiries' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1.5px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800, color: '#0A1F44', fontSize: '1rem' }}>
                All Received Enquiries & Leads
              </div>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Showing {enquiries.length} enquiry record(s)
              </span>
            </div>

            {loading ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.8rem', marginBottom: 10 }} />
                <div>Loading enquiries...</div>
              </div>
            ) : enquiries.length === 0 ? (
              <div style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📭</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569' }}>No Enquiries Received Yet</div>
                <div style={{ fontSize: '0.85rem', marginTop: 4 }}>
                  Submit a test form on the public website and it will appear here immediately!
                </div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '1px solid #e2e8f0', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '12px 18px' }}>Applicant</th>
                      <th style={{ padding: '12px 18px' }}>Phone / WhatsApp</th>
                      <th style={{ padding: '12px 18px' }}>Service Requested</th>
                      <th style={{ padding: '12px 18px' }}>Requirement Note</th>
                      <th style={{ padding: '12px 18px' }}>Submitted Time</th>
                      <th style={{ padding: '12px 18px', textAlign: 'right' }}>Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq, idx) => {
                      const cleanPhone = enq.phone ? enq.phone.replace(/[^0-9]/g, '') : ''
                      const waReplyText = encodeURIComponent(`Hello ${enq.name}! Thank you for reaching out to Cloud Ledger regarding ${enq.service || 'your service enquiry'}. How can we assist you today?`)
                      const waReplyUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${waReplyText}`

                      return (
                        <tr key={enq.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ fontWeight: 700, color: '#0A1F44' }}>{enq.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{enq.email}</div>
                          </td>
                          <td style={{ padding: '14px 18px', color: '#0A1F44', fontWeight: 600 }}>
                            {enq.phone}
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <span style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 10px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 700 }}>
                              {enq.service || 'General Enquiry'}
                            </span>
                          </td>
                          <td style={{ padding: '14px 18px', color: '#64748b', maxWidth: 280 }}>
                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {enq.message || 'No additional note provided.'}
                            </div>
                          </td>
                          <td style={{ padding: '14px 18px', color: '#94a3b8', fontSize: '0.78rem' }}>
                            {enq.createdAt?.toDate ? enq.createdAt.toDate().toLocaleString('en-IN') : (enq.timestamp ? new Date(enq.timestamp).toLocaleString('en-IN') : 'Just now')}
                          </td>
                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                              <a href={waReplyUrl} target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                                <i className="fab fa-whatsapp" /> Chat
                              </a>
                              <a href={`tel:${enq.phone}`} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.78rem', borderColor: '#cbd5e1' }}>
                                <i className="fas fa-phone" /> Call
                              </a>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── MODAL: Post Daily Article / News Update ── */}
      {showArticleModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(6, 15, 34, 0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        }}>
          <div style={{
            background: 'white', borderRadius: 20, maxWidth: 640, width: '100%',
            padding: '2.5rem', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <button onClick={() => setShowArticleModal(false)} style={{
              position: 'absolute', top: 20, right: 20, background: '#f1f5f9', border: 'none',
              borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', color: '#64748b',
            }}>✕</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
              <div style={{ width: 40, height: 40, background: 'rgba(29,185,84,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                📰
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1F44', margin: 0 }}>
                  Publish Daily Regulatory Update
                </h3>
                <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
                  This article will immediately display live in the website Knowledge Centre.
                </div>
              </div>
            </div>

            <form onSubmit={handleCreateArticle} style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                    Article / Circular Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CBDT Notification: Tax Audit Due Date Update"
                    value={newArticleForm.title}
                    onChange={e => setNewArticleForm(p => ({ ...p, title: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #cbd5e1', borderRadius: 9, fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                    Statutory Category *
                  </label>
                  <select
                    value={newArticleForm.cat}
                    onChange={e => setNewArticleForm(p => ({ ...p, cat: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #cbd5e1', borderRadius: 9, fontSize: '0.88rem' }}
                  >
                    <option value="GST">GST & Indirect Tax</option>
                    <option value="Income Tax">Income Tax & TDS</option>
                    <option value="Company Law">Company Law & MCA</option>
                    <option value="Labour Laws">Labour Laws (PF/ESIC)</option>
                    <option value="MSME">MSME Schemes</option>
                    <option value="Accounting">Accounting & Audit</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                  Summary / Excerpt (Visible on website cards) *
                </label>
                <textarea
                  rows="2"
                  required
                  placeholder="Short 2-line summary explaining the key takeaway of the regulatory change."
                  value={newArticleForm.excerpt}
                  onChange={e => setNewArticleForm(p => ({ ...p, excerpt: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #cbd5e1', borderRadius: 9, fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                  Full Article Content & Circular Guidelines
                </label>
                <textarea
                  rows="6"
                  placeholder="Detailed breakdown, bullet points, applicability dates, forms to file, and practical recommendations for taxpayers."
                  value={newArticleForm.content}
                  onChange={e => setNewArticleForm(p => ({ ...p, content: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #cbd5e1', borderRadius: 9, fontSize: '0.85rem', lineHeight: 1.6 }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                  Author / Desk Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior CA Advisory Desk / Rahul Sharma, FCA"
                  value={newArticleForm.author}
                  onChange={e => setNewArticleForm(p => ({ ...p, author: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #cbd5e1', borderRadius: 9, fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: 10, fontWeight: 700, color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingArticle}
                  style={{
                    flex: 1.5, padding: '12px', background: 'linear-gradient(135deg, #1DB954, #17a248)',
                    border: 'none', borderRadius: 10, fontWeight: 700, color: 'white', cursor: creatingArticle ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 15px rgba(29,185,84,0.4)'
                  }}
                >
                  {creatingArticle ? <i className="fas fa-spinner fa-spin" /> : <><i className="fas fa-paper-plane" style={{ marginRight: 6 }} /> Publish Live to Website</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Assign Task to Staff ── */}
      {showTaskModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(6, 15, 34, 0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        }}>
          <div style={{
            background: 'white', borderRadius: 20, maxWidth: 540, width: '100%',
            padding: '2.5rem', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          }}>
            <button onClick={() => setShowTaskModal(false)} style={{
              position: 'absolute', top: 20, right: 20, background: '#f1f5f9', border: 'none',
              borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', color: '#64748b',
            }}>✕</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
              <div style={{ width: 40, height: 40, background: '#eff6ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                📋
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1F44', margin: 0 }}>
                  Assign Work Task to Staff
                </h3>
                <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
                  Distribute client filings and notify staff via WhatsApp.
                </div>
              </div>
            </div>

            <form onSubmit={handleAssignTask} style={{ marginTop: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>Task Title *</label>
                <input
                  type="text"
                  value={newTaskForm.title}
                  onChange={e => setNewTaskForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Prepare GSTR-3B for October 2026"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>Client / Company Name *</label>
                  <input
                    type="text"
                    value={newTaskForm.clientName}
                    onChange={e => setNewTaskForm(p => ({ ...p, clientName: e.target.value }))}
                    placeholder="e.g. Apex Tech Pvt Ltd"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>Assign To Staff Member *</label>
                  <select
                    value={newTaskForm.assignedStaffEmail}
                    onChange={e => setNewTaskForm(p => ({ ...p, assignedStaffEmail: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none', background: 'white' }}
                    required
                  >
                    <option value="">Select Staff Member</option>
                    {staffMembers.map(s => (
                      <option key={s.email} value={s.email}>{s.name} ({s.email})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>Priority</label>
                  <select
                    value={newTaskForm.priority}
                    onChange={e => setNewTaskForm(p => ({ ...p, priority: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none', background: 'white' }}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Standard</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>Statutory Due Date</label>
                  <input
                    type="date"
                    value={newTaskForm.dueDate}
                    onChange={e => setNewTaskForm(p => ({ ...p, dueDate: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>Task Instructions</label>
                <textarea
                  value={newTaskForm.description}
                  onChange={e => setNewTaskForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Specify client documents, portal details, or specific filing instructions..."
                  rows={3}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" disabled={creatingTask} className="btn btn-navy" style={{ flex: 1, justifyContent: 'center', padding: '12px' }}>
                  {creatingTask ? <><i className="fas fa-spinner fa-spin" /> Assigning...</> : <><i className="fas fa-check" /> Assign Task</>}
                </button>
                <button type="button" onClick={() => setShowTaskModal(false)} className="btn btn-outline" style={{ padding: '12px 20px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Task Assigned Confirmation & WhatsApp Dispatch ── */}
      {assignedTaskInfo && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10001,
          background: 'rgba(6, 15, 34, 0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        }}>
          <div style={{
            background: 'white', borderRadius: 20, maxWidth: 460, width: '100%',
            padding: '2.5rem', position: 'relative', textAlign: 'center'
          }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🚀</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A1F44', marginBottom: 6 }}>
              Task Assigned!
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Assigned to <b>{assignedTaskInfo.assignedStaffName}</b>.
            </p>

            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
              <div style={{ marginBottom: 6 }}><b>Task:</b> {assignedTaskInfo.title}</div>
              <div style={{ marginBottom: 6 }}><b>Client:</b> {assignedTaskInfo.clientName}</div>
              <div style={{ marginBottom: 6 }}><b>Due Date:</b> {assignedTaskInfo.dueDate}</div>
              <div><b>Priority:</b> <span style={{ color: '#b91c1c', fontWeight: 700 }}>{assignedTaskInfo.priority}</span></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href={`https://wa.me/${assignedTaskInfo.staffPhone ? assignedTaskInfo.staffPhone.replace(/[^0-9]/g, '') : '917827225372'}?text=${encodeURIComponent(`Hello ${assignedTaskInfo.assignedStaffName}! A new task has been assigned to you by Admin:\n\n📋 Task: ${assignedTaskInfo.title}\n🏢 Client: ${assignedTaskInfo.clientName}\n📅 Due Date: ${assignedTaskInfo.dueDate}\n⚡ Priority: ${assignedTaskInfo.priority}\n\nPlease sign in to review instructions: http://localhost:3000/login`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ justifyContent: 'center', padding: '12px' }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Notify Staff on WhatsApp
              </a>

              <button onClick={() => setAssignedTaskInfo(null)} className="btn btn-outline" style={{ justifyContent: 'center', padding: '10px' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Create New User / Staff ── */}
      {showCreateModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(6, 15, 34, 0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        }}>
          <div style={{
            background: 'white', borderRadius: 20, maxWidth: 520, width: '100%',
            padding: '2.5rem', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          }}>
            <button onClick={() => setShowCreateModal(false)} style={{
              position: 'absolute', top: 20, right: 20, background: '#f1f5f9', border: 'none',
              borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', color: '#64748b',
            }}>✕</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
              <div style={{ width: 40, height: 40, background: '#ecfdf5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                👤
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1F44', margin: 0 }}>
                  Create New Staff Account
                </h3>
                <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
                  Admin generates login credentials without logging out.
                </div>
              </div>
            </div>

            <form onSubmit={handleCreateStaff} style={{ marginTop: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                  Account Role *
                </label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['staff', 'client'].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setNewStaffForm(p => ({ ...p, role: r }))}
                      style={{
                        flex: 1, padding: '9px 12px', borderRadius: 8, border: '1.5px solid',
                        borderColor: newStaffForm.role === r ? '#0A1F44' : '#e2e8f0',
                        background: newStaffForm.role === r ? '#0A1F44' : 'white',
                        color: newStaffForm.role === r ? 'white' : '#64748b',
                        fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', textTransform: 'capitalize'
                      }}
                    >
                      {r === 'staff' ? '👨‍💼 Staff Member' : '🏢 Client Account'}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>Full Name *</label>
                  <input
                    type="text"
                    value={newStaffForm.name}
                    onChange={e => setNewStaffForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Priya Sharma"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    value={newStaffForm.phone}
                    onChange={e => setNewStaffForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="e.g. 7827225372"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>Login Email Address *</label>
                <input
                  type="email"
                  value={newStaffForm.email}
                  onChange={e => setNewStaffForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="e.g. priya@cloudledger.in"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Temporary Password *</label>
                  <button type="button" onClick={generatePassword} style={{ background: 'none', border: 'none', color: '#16a34a', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}>
                    ⚡ Generate Password
                  </button>
                </div>
                <input
                  type="text"
                  value={newStaffForm.password}
                  onChange={e => setNewStaffForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Minimum 6 characters"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none', fontFamily: 'monospace' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 5 }}>
                  {newStaffForm.role === 'staff' ? 'Department / Specialty' : 'Company / Entity Name'}
                </label>
                <select
                  value={newStaffForm.department}
                  onChange={e => setNewStaffForm(p => ({ ...p, department: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none', background: 'white' }}
                >
                  <option>GST & Indirect Taxation</option>
                  <option>Income Tax & Direct Taxation</option>
                  <option>Company Incorporation & MCA</option>
                  <option>Accounting & Bookkeeping</option>
                  <option>Audit & Assurance</option>
                  <option>NGO, Trust & Society</option>
                  <option>General Operations</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" disabled={creatingUser} className="btn btn-green" style={{ flex: 1, justifyContent: 'center', padding: '12px' }}>
                  {creatingUser ? <><i className="fas fa-spinner fa-spin" /> Creating Account...</> : <><i className="fas fa-check" /> Create Account</>}
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-outline" style={{ padding: '12px 20px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Account Created Success + WhatsApp Dispatch ── */}
      {createdUserInfo && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10001,
          background: 'rgba(6, 15, 34, 0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        }}>
          <div style={{
            background: 'white', borderRadius: 20, maxWidth: 460, width: '100%',
            padding: '2.5rem', position: 'relative', textAlign: 'center'
          }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A1F44', marginBottom: 6 }}>
              Account Created!
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Credentials for <b>{createdUserInfo.name}</b> have been generated.
            </p>

            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
              <div style={{ marginBottom: 6 }}><b>Login Email:</b> {createdUserInfo.email}</div>
              <div style={{ marginBottom: 6 }}><b>Password:</b> <span style={{ fontFamily: 'monospace', background: '#e2e8f0', padding: '2px 6px', borderRadius: 4 }}>{createdUserInfo.password}</span></div>
              <div style={{ marginBottom: 6 }}><b>Role:</b> {createdUserInfo.role}</div>
              <div><b>Login URL:</b> http://localhost:3000/login</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href={`https://wa.me/${createdUserInfo.phone ? createdUserInfo.phone.replace(/[^0-9]/g, '') : '917827225372'}?text=${encodeURIComponent(`Hello ${createdUserInfo.name}! Your Cloud Ledger staff login credentials are:\n\n🌐 Portal: http://localhost:3000/login\n📧 Email: ${createdUserInfo.email}\n🔑 Password: ${createdUserInfo.password}\n\nPlease sign in to view your assigned tasks.`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ justifyContent: 'center', padding: '12px' }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Send Credentials via WhatsApp
              </a>

              <button onClick={() => setCreatedUserInfo(null)} className="btn btn-outline" style={{ justifyContent: 'center', padding: '10px' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
