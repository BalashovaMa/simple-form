import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isComfirmed, setConfirmed]=useState(false);

  const closeDialog = () => setConfirmationOpen(false);

  const confirm = () => {
    closeDialog();
    setConfirmed(true);
  }

  const confirmUserData = (data) => {
    setUser(data);
    setConfirmationOpen(true);
  }
  
  return (
    <>
      <main>
        {isComfirmed ? (
          `Congratulations user ${user.name}`
        ) : (
          <RegisterForm onSubmit={confirmUserData} />
        )}
        
      </main>
      <ConfirmDialog 
          title="Please confirm registration" 
          cancel={closeDialog}
          open={confirmationOpen}
          confirm={confirm}>
        <p>Please confirm your email: {user.email}</p>
      </ConfirmDialog>
    </>
  )
}

function RegisterForm({ onSubmit }) {
  const [user, setUserData] = useState({ email: '', password: '', name: '' });
  const setUserEmail = (e) => {
    const email = e.target.value;
    setUserData({ ...user, email });
  }
  const setUserPassword = (e) => {
    const password = e.target.value;
    setUserData({ ...user, password });
  }
  const setUserName = (e) => {
    const name = e.target.value;
    setUserData({ ...user, name });
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { email, password, name } = user;
    
    if (!email.includes('@')) {
      return;
    }
    if (!password.trim()) {
      console.log('Error')
      return;
    }
    onSubmit(user);
  }
  return (
    <>
      <h1>Please, register</h1>
      <form onSubmit={handleFormSubmit} className='app__form'>
        <AppInput
          name="email"
          label="Email"
          type="email"
          onChange={setUserEmail}
          value={user.email}
          required={true}
        />
        <AppInput
          name="pwd"
          label="Password"
          type="password"
          onChange={setUserPassword}
          value={user.password}
          required={true}
        />
        <AppInput
          name="name"
          label="Name"
          type="text"
          onChange={setUserName}
          value={user.name}
          required={true}
        />
        {/* {JSON.stringify(user)} */}
        <button>Submit</button>
      </form>
    </>
  )
}

const AppInput = ({ label, name, ...rest }) => {
  return (
    <div className='appInput'>
      <label htmlFor={name}>{label}</label>
      <input id={name} {...rest} />
    </div>
  )
}

function ConfirmDialog({title, children, confirm, cancel, open}) {
  return(
    <dialog open={open}>
      <div>{title}</div>
      <div>{children}</div>
      <div>
        <button type='button' onClick={confirm}>Confirm</button>
        <button type='button' onClick={cancel}>Cancel</button>
      </div>
    </dialog>
  )
}

export default App
