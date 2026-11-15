# Cloud Ledger — React + Firebase

## Stack
- **Frontend**: React 18 + Vite + React Router
- **Auth**: Firebase Authentication (email/password)
- **Database**: Firestore (enquiries, clients, tasks, documents)
- **Storage**: Firebase Storage (client files)
- **Hosting**: Firebase Hosting

## Project Structure
```
Ledger/
├── frontend/
│   └── src/
│       ├── firebase.js          ← Firebase init
│       ├── context/AuthContext  ← Auth state + role
│       ├── components/          ← Public website
│       └── pages/
│           ├── LoginPage.jsx    ← Firebase Auth login
│           └── dashboard/       ← Role-gated dashboards
├── firestore.rules              ← Firestore security rules
├── firebase.json                ← Hosting config
└── .firebaserc                  ← Project ID
```

## Setup

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com
2. Create project → name it `cloud-ledger`
3. Enable **Authentication** → Sign-in method → **Email/Password**
4. Enable **Firestore Database** → Start in production mode
5. Enable **Storage**

### 2. Get Config
- Project Settings → General → Your apps → Web → Register
- Copy `firebaseConfig`

### 3. Create .env
```
cp frontend/.env.example frontend/.env
# paste your Firebase values
```

### 4. Run Locally
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### 5. Create First User (Super Admin)
In Firebase Console → Authentication → Users → Add user
Then in Firestore → users collection → add doc with same UID:
```json
{ "role": "super_admin", "name": "Your Name", "email": "you@email.com" }
```

### 6. Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
cd frontend && npm run build
firebase deploy
```
→ Your site goes live at `https://your-project.web.app`

## Roles in Firestore
Each user document in `users/{uid}` must have a `role` field:
- `super_admin` → full access
- `admin`       → CRM, tasks, documents, enquiries
- `staff`       → own assigned tasks only
- `client`      → own documents and requests only

