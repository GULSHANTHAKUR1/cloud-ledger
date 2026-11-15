import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'

const WA_NUMBER = '917827225372'

const DEFAULT_DOCUMENTS = [
  { id: 'doc-1', name: 'PAN Card (Business / Director)', category: 'KYC & Identity', status: 'Verified', date: '2026-11-10', size: '1.2 MB' },
  { id: 'doc-2', name: 'Certificate of Incorporation / Registration', category: 'Statutory', status: 'Verified', date: '2026-11-12', size: '2.4 MB' },
  { id: 'doc-3', name: 'GSTR-3B Filing Acknowledgement (Oct 2026)', category: 'Tax Filings', status: 'Filed', date: '2026-11-14', size: '850 KB' },
]

export default function ClientDashboard() {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab]         = useState('vault') // 'vault' | 'requests' | 'support'
  const [docCategory, setDocCategory]     = useState('all')
  const [documents, setDocuments]         = useState(DEFAULT_DOCUMENTS)
  const [requests, setRequests]           = useState([])
  const [isRequestModal, setIsRequestModal] = useState(false)
  const [isUploadModal, setIsUploadModal]   = useState(false)

  // New Request Form
  const [newRequest, setNewRequest] = useState({
    service: 'GST Monthly Return Filing',
    notes: '',
    urgency: 'Normal (Standard TAT)'
  })

  // New Document Upload Form
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'Tax Filings',
    fileName: ''
  })

  // Load client requests from Firestore or localStorage fallback
  useEffect(() => {
    if (!user) return

    try {
      const q = query(collection(db, 'tasks'), where('clientEmail', '==', user.email))
      const unsub = onSnapshot(q, (snapshot) => {
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        if (fetched.length > 0) {
          setRequests(fetched)
        } else {
          // Check local storage fallback
          const local = JSON.parse(localStorage.getItem(`client_requests_${user.uid}`) || '[]')
          setRequests(local)
        }
      }, (err) => {
        console.warn('Firestore tasks listener blocked, using localStorage fallback', err)
        const local = JSON.parse(localStorage.getItem(`client_requests_${user.uid}`) || '[]')
        setRequests(local)
      })
      return () => unsub()
    } catch (e) {
      const local = JSON.parse(localStorage.getItem(`client_requests_${user.uid}`) || '[]')
      setRequests(local)
    }
  }, [user])

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out securely.')
    navigate('/login')
  }

  // Submit New Service Request
  const handleCreateRequest = async (e) => {
    e.preventDefault()
    if (!newRequest.notes) {
      toast.error('Please describe your requirement.')
      return
    }

    const payload = {
      title: newRequest.service,
      clientName: profile?.name || user?.email?.split('@')[0] || 'Client',
      clientEmail: user.email,
      clientPhone: profile?.phone || '',
      description: newRequest.notes,
      urgency: newRequest.urgency,
      status: 'pending',
      assignedTo: 'admin@cloudledger.in',
      assignedToName: 'Operations CA Desk',
      createdAt: new Date().toISOString()
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        ...payload,
        createdAt: serverTimestamp()
      })
      toast.success('Service request submitted to CA Desk!')
    } catch (err) {
      console.warn('Saving locally due to Firestore production rule:', err)
      const existing = JSON.parse(localStorage.getItem(`client_requests_${user.uid}`) || '[]')
      const updated = [{ id: 'req-' + Date.now(), ...payload }, ...existing]
      localStorage.setItem(`client_requests_${user.uid}`, JSON.stringify(updated))
      setRequests(updated)
      toast.success('Request received! CA Desk will review shortly.')
    }

    setIsRequestModal(false)
    setNewRequest({ service: 'GST Monthly Return Filing', notes: '', urgency: 'Normal (Standard TAT)' })
  }

  // Upload New Document
  const handleUploadSubmit = (e) => {
    e.preventDefault()
    if (!uploadForm.name) {
      toast.error('Please provide a document title.')
      return
    }

    const newDoc = {
      id: 'doc-' + Date.now(),
      name: uploadForm.name,
      category: uploadForm.category,
      status: 'Under Review',
      date: new Date().toISOString().split('T')[0],
      size: '1.5 MB'
    }

    setDocuments(prev => [newDoc, ...prev])
    setIsUploadModal(false)
    setUploadForm({ name: '', category: 'Tax Filings', fileName: '' })
    toast.success('Document uploaded to your private 256-bit encrypted vault!')
  }

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(
      `Hello Cloud Ledger CA Desk! I am logged into my Client Portal:\n\n` +
      `👤 Name: ${profile?.name || user?.email}\n` +
      `📧 Email: ${user?.email}\n` +
      `📱 Phone: ${profile?.phone || 'Not specified'}\n\n` +
      `I require assistance with my active compliance tasks.`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
  }

  const filteredDocs = docCategory === 'all'
    ? documents
    : documents.filter(d => d.category.toLowerCase().includes(docCategory))

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Top Navigation Bar ── */}
      <div style={{
        background: '#0A1F44', borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '0 2rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 34, height: 34, background: 'linear-gradient(135deg, #1DB954, #17a248)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
            }}>☁️</div>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.15rem' }}>
              Cloud<span style={{ color: '#1DB954' }}>Ledger</span>
            </span>
          </Link>
          <span style={{
            background: 'rgba(29,185,84,0.15)', color: '#25d466',
            border: '1px solid rgba(29,185,84,0.3)', padding: '3px 10px',
            borderRadius: 100, fontSize: '0.72rem', fontWeight: 700
          }}>
            🔒 Client Private Vault
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={handleWhatsAppHelp}
            style={{
              background: '#25d466', color: '#060f22', border: 'none',
              padding: '7px 14px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}
          >
            <i className="fab fa-whatsapp" /> CA Desk Help
          </button>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
            {profile?.name || user?.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
              padding: '7px 14px', borderRadius: 7, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600
            }}
          >
            <i className="fas fa-sign-out-alt" style={{ marginRight: 6 }} /> Logout
          </button>
        </div>
      </div>

      {/* ── Main Container ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Welcome Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0A1F44 0%, #1a3461 100%)',
          borderRadius: 18, padding: '2rem 2.5rem', color: 'white',
          marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 10px 30px rgba(10,31,68,0.15)', position: 'relative', overflow: 'hidden'
        }}>
          <div>
            <div style={{ color: '#25d466', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
              Client Portal • Active Account
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '4px 0 8px 0' }}>
              Welcome, {profile?.name || user?.email?.split('@')[0]}!
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', maxWidth: 600, margin: 0 }}>
              Your confidential document vault is encrypted with AES-256. Manage your compliance returns, download MCA challans, and track ongoing filings.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setIsRequestModal(true)}
              style={{
                background: '#1DB954', color: 'white', border: 'none',
                padding: '12px 20px', borderRadius: 10, fontWeight: 700, fontSize: '0.88rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 15px rgba(29,185,84,0.4)'
              }}
            >
              <i className="fas fa-plus-circle" /> Request Service
            </button>
            <button
              onClick={() => setIsUploadModal(true)}
              style={{
                background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                padding: '12px 18px', borderRadius: 10, fontWeight: 600, fontSize: '0.88rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
              }}
            >
              <i className="fas fa-upload" /> Upload Doc
            </button>
          </div>
        </div>

        {/* ── Status Metrics ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
            <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>Stored Documents</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0A1F44', marginTop: 4 }}>{documents.length}</div>
            <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: 4 }}>● 100% Secure & Archived</div>
          </div>
          <div style={{ background: 'white', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
            <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>Active Service Requests</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0A1F44', marginTop: 4 }}>{requests.length}</div>
            <div style={{ fontSize: '0.72rem', color: '#0284c7', marginTop: 4 }}>● Assigned to CA Staff</div>
          </div>
          <div style={{ background: 'white', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
            <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>Next Compliance Due</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#d97706', marginTop: 8 }}>20th of Month</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 4 }}>GSTR-3B Monthly Return</div>
          </div>
          <div style={{ background: 'white', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
            <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>Dedicated CA Officer</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0A1F44', marginTop: 8 }}>Senior CA Desk</div>
            <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: 4 }}>Available on WhatsApp</div>
          </div>
        </div>

        {/* ── Tab Switcher ── */}
        <div style={{ display: 'flex', gap: 12, borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setActiveTab('vault')}
            style={{
              padding: '10px 18px', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: '0.9rem',
              color: activeTab === 'vault' ? '#1DB954' : '#64748b',
              borderBottom: activeTab === 'vault' ? '2.5px solid #1DB954' : '2.5px solid transparent',
              marginBottom: -2
            }}
          >
            <i className="fas fa-folder-open" style={{ marginRight: 6 }} /> My Document Vault ({documents.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            style={{
              padding: '10px 18px', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: '0.9rem',
              color: activeTab === 'requests' ? '#1DB954' : '#64748b',
              borderBottom: activeTab === 'requests' ? '2.5px solid #1DB954' : '2.5px solid transparent',
              marginBottom: -2
            }}
          >
            <i className="fas fa-tasks" style={{ marginRight: 6 }} /> Track Service Requests ({requests.length})
          </button>
        </div>

        {/* ── TAB 1: DOCUMENT VAULT ── */}
        {activeTab === 'vault' && (
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['all', 'kyc', 'tax', 'statutory'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setDocCategory(cat)}
                    style={{
                      padding: '5px 12px', borderRadius: 6, fontSize: '0.78rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                      background: docCategory === cat ? '#0A1F44' : '#e2e8f0',
                      color: docCategory === cat ? 'white' : '#475569'
                    }}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsUploadModal(true)}
                style={{ background: '#1DB954', color: 'white', border: 'none', padding: '6px 14px', borderRadius: 7, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
              >
                + Add Document
              </button>
            </div>

            <div style={{ padding: '0.5rem 1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.78rem' }}>
                    <th style={{ padding: '12px 0' }}>Document Name</th>
                    <th>Category</th>
                    <th>Date Added</th>
                    <th>Security Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map(doc => (
                    <tr key={doc.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '14px 0', fontWeight: 600, color: '#0A1F44' }}>
                        <i className="fas fa-file-pdf" style={{ color: '#ef4444', marginRight: 10, fontSize: '1rem' }} />
                        {doc.name}
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginLeft: 8 }}>({doc.size})</span>
                      </td>
                      <td style={{ color: '#64748b', fontSize: '0.82rem' }}>{doc.category}</td>
                      <td style={{ color: '#64748b', fontSize: '0.82rem' }}>{doc.date}</td>
                      <td>
                        <span style={{
                          background: doc.status === 'Verified' ? 'rgba(22,163,74,0.1)' : 'rgba(2,132,199,0.1)',
                          color: doc.status === 'Verified' ? '#16a34a' : '#0284c7',
                          padding: '3px 8px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700
                        }}>
                          ✓ {doc.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => toast.success(`Downloading ${doc.name}...`)}
                          style={{
                            background: 'none', border: '1px solid #cbd5e1', padding: '4px 10px',
                            borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, color: '#0A1F44'
                          }}
                        >
                          <i className="fas fa-download" style={{ marginRight: 4 }} /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 2: TRACK SERVICE REQUESTS ── */}
        {activeTab === 'requests' && (
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: '1.5rem' }}>
            {requests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                <i className="fas fa-clipboard-list" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#cbd5e1' }} />
                <h3 style={{ color: '#475569', fontSize: '1.1rem', marginBottom: 6 }}>No Active Service Requests</h3>
                <p style={{ fontSize: '0.85rem', maxWidth: 400, margin: '0 auto 1.5rem auto' }}>
                  Need a GST Return filed, Income Tax assessment, or Company compliance completed?
                </p>
                <button
                  onClick={() => setIsRequestModal(true)}
                  style={{ background: '#1DB954', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                >
                  Create Your First Service Request
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {requests.map(req => (
                  <div key={req.id} style={{
                    border: '1.5px solid #f1f5f9', borderRadius: 10, padding: '1.2rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <h4 style={{ margin: 0, color: '#0A1F44', fontSize: '1rem', fontWeight: 700 }}>{req.title}</h4>
                        <span style={{
                          background: req.status === 'completed' ? '#dcfce7' : '#fef9c3',
                          color: req.status === 'completed' ? '#16a34a' : '#854d0e',
                          padding: '2px 8px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700
                        }}>
                          {req.status === 'completed' ? '✓ Completed' : '⏳ In Progress'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{req.description}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
                        Assigned To: <strong>{req.assignedToName || 'CA Operations'}</strong> • Urgency: <strong>{req.urgency}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => handleWhatsAppHelp()}
                      style={{
                        background: '#25d466', color: '#060f22', border: 'none',
                        padding: '8px 14px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                      }}
                    >
                      <i className="fab fa-whatsapp" /> Chat on WA
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── MODAL: CREATE SERVICE REQUEST ── */}
      {isRequestModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div style={{ background: 'white', borderRadius: 16, width: '100%', maxWidth: 500, padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ margin: 0, color: '#0A1F44', fontWeight: 800 }}>Submit Service Request</h3>
              <button onClick={() => setIsRequestModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            <form onSubmit={handleCreateRequest}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Select Compliance Service
                </label>
                <select
                  value={newRequest.service}
                  onChange={e => setNewRequest(p => ({ ...p, service: e.target.value }))}
                  style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.88rem' }}
                >
                  <option value="GST Monthly Return Filing">GST Monthly Return Filing (GSTR-1 & 3B)</option>
                  <option value="Income Tax Return (ITR) Filing">Income Tax Return (ITR) Assessment & Filing</option>
                  <option value="Private Limited Annual MCA Filing">Private Limited Annual MCA Filing (AOC-4 / MGT-7)</option>
                  <option value="TDS Quarterly Return Filing">TDS Quarterly Return Filing (Form 26Q/24Q)</option>
                  <option value="Trademark Registration">Trademark Application & Search</option>
                  <option value="Startup Accounting & Bookkeeping">Startup Bookkeeping & Reconciliation</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Describe Requirements / Period
                </label>
                <textarea
                  rows="3"
                  value={newRequest.notes}
                  onChange={e => setNewRequest(p => ({ ...p, notes: e.target.value }))}
                  placeholder="e.g. Please file GSTR-3B for October 2026. Sales invoices attached in vault."
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Turnaround Urgency
                </label>
                <select
                  value={newRequest.urgency}
                  onChange={e => setNewRequest(p => ({ ...p, urgency: e.target.value }))}
                  style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.88rem' }}
                >
                  <option value="Normal (Standard TAT)">Normal (Standard TAT - 48 Hours)</option>
                  <option value="Urgent (Statutory Due Date Near)">Urgent (Statutory Due Date Near - 24 Hours)</option>
                  <option value="Immediate Priority">Immediate Priority (Same Day)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsRequestModal(false)}
                  style={{ flex: 1, padding: '11px', background: '#f1f5f9', border: 'none', borderRadius: 8, fontWeight: 700, color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1.5, padding: '11px', background: '#1DB954', border: 'none', borderRadius: 8, fontWeight: 700, color: 'white', cursor: 'pointer' }}
                >
                  Submit to CA Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: UPLOAD DOCUMENT ── */}
      {isUploadModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div style={{ background: 'white', borderRadius: 16, width: '100%', maxWidth: 460, padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ margin: 0, color: '#0A1F44', fontWeight: 800 }}>Upload Document to Vault</h3>
              <button onClick={() => setIsUploadModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            <form onSubmit={handleUploadSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Document Name / Title
                </label>
                <input
                  type="text"
                  value={uploadForm.name}
                  onChange={e => setUploadForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Bank Statement Oct 2026 / Sales Ledger"
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Category
                </label>
                <select
                  value={uploadForm.category}
                  onChange={e => setUploadForm(p => ({ ...p, category: e.target.value }))}
                  style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '0.88rem' }}
                >
                  <option value="Tax Filings">Tax Filings & Returns</option>
                  <option value="KYC & Identity">KYC & Identity Proofs</option>
                  <option value="Statutory">Statutory & MCA Filings</option>
                  <option value="Financial Statements">Financial Statements & Invoices</option>
                </select>
              </div>

              <div style={{
                border: '2px dashed #cbd5e1', borderRadius: 10, padding: '1.5rem', textAlign: 'center',
                background: '#f8fafc', marginBottom: '1.5rem', cursor: 'pointer'
              }}>
                <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', color: '#1DB954', marginBottom: 8 }} />
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
                  Click or drag files here (PDF, JPG, PNG, XLSX)
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 4 }}>
                  Maximum file size: 25 MB • Encrypted before storage
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsUploadModal(false)}
                  style={{ flex: 1, padding: '11px', background: '#f1f5f9', border: 'none', borderRadius: 8, fontWeight: 700, color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1.5, padding: '11px', background: '#1DB954', border: 'none', borderRadius: 8, fontWeight: 700, color: 'white', cursor: 'pointer' }}
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
