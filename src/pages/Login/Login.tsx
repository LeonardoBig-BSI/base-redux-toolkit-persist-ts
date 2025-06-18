import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { createUser } from '../../redux/user/slice'
import type { AppDispatch } from '../../redux/types'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleLogin(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    
    if(name === '' || email === '') {
      toast.error('Bloqueado: Digite os dados do usuário.');
      return;
    }

    dispatch(createUser({
      name: name,
      email: email,
    }));

    toast.success(`${name}, seja bem-vindo à aplicação React + Redux!`);
    console.log(name);
    console.log(email);
    navigate('/panel');
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link to="/panel">
          <h1 className={styles.title}>
            Dev <span style={{ color: '#FFF' }}>Login</span>
          </h1>
        </Link>

        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder='Digite seu nome....'
          />
          <input
            type="text"
            className={styles.input}
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='Digite seu email...'
          />

          <button type="submit">Acessar</button>
        </form>
      </main>
    </div>
  )
}

export default Login