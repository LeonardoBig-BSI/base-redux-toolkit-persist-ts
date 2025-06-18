import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/types';
import { logoutUser } from '../../redux/user/slice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { user } = useSelector((rootReducer: RootState) => rootReducer.user);

    function handleLogin() {
        navigate("/");
    }

    function handleLogout() {
        dispatch(logoutUser());
        navigate("/");
    }
    
  return (
    <header>
        <div className={styles.content}>
            <Link to="/panel">
                <h1 style={{ color: '#229e0c' }}>Dev<span>Redux</span></h1>
            </Link>

            {user ? (
                <button className={styles.logout} onClick={handleLogout}>
                    Sair
                </button>
            ) : (
                <button className={styles.login} onClick={handleLogin}>
                    Fazer Login
                </button>   
            )}
        </div>
    </header>
  )
}

export default Header