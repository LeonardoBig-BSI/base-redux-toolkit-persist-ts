import { toast } from 'react-toastify';
import styles from './home.module.css';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/types';
import { deleteAddress, fetchUserById, fetchUsersFromApi } from '../../redux/user/slice';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, users, userById } = useSelector((rootReducer: RootState) => rootReducer.user);

  console.log(user);

  function handleDeleteAddress() {
    dispatch(deleteAddress());
    toast.success("Endereço deletado com sucesso!");
  }

  function handleFetchUsers() {
    dispatch(fetchUsersFromApi());
  }

  function handleFetchUserById() {
    const userId = 5;
    dispatch(fetchUserById(userId));
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Login
          </Link>
          <Link to="/painel" className={styles.link}>
            Painel
          </Link>
          <Link to="/address" className={styles.link}>
            Meus endereços
          </Link>
        </nav>

        <main className={styles.content}>
          <div className={styles.message}>
            <h1 className={styles.title}>
              Olá {user ? user.name : 'Visitante'}, bem vindo!
            </h1>

            {user && (
              <span>Email: {user.email}</span>
            )}


            {user && user.address && (
              <>
                <strong className={styles.addressLabel}>Endereço atual:</strong>
                <div className={styles.address}>
                  <p>{user.address.location}, nº {user.address.number}</p>

                  <button onClick={handleDeleteAddress}>Deletar endereço</button>
                </div>
              </>
            )}

            <br /><br /> <hr /> 

            <h2 className={styles.h2}>Lista de Usuários</h2>
            <button onClick={handleFetchUsers} className={styles.buttonSearch} >Buscar usuários</button>

            <br />

            {!loading && users.map((currUser) => (
              <div key={currUser.id} style={{ marginTop: '8px' }}>
                <p>ID: {currUser.id} | {currUser.name}</p>
              </div>
            ))}

            <br /><br />

            <h2 className={styles.h2}>Lista de Usuários</h2>
            <button onClick={handleFetchUserById} className={styles.buttonSearchById}>Buscar usuário pelo ID</button>            

            {!loading && userById && (
              <div style={{ marginTop: '12px' }}>
                <strong>Usuário encontrado:</strong>
                <p>ID: {userById.id}</p>
                <p>Nome: {userById.name}</p>
              </div>
            )}

            {loading && <strong style={{ marginTop: '8px' }}>Carregando usuários...</strong>}
          </div>

        </main>
      </div>
    </>
  )
}

export default Home