import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import styles from './address.module.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/types";
import { addAddress, deleteAddress } from "../../redux/user/slice";

const Address = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((rootReducer: RootState) => rootReducer.user);
  const [addressName, setAddressName] = useState(user?.address?.location ?? "");
  const [addressNumber, setAddressNumber] = useState(user?.address?.number ?? "");

  function handleRegisterAddress() {
    dispatch(addAddress({
      location: addressName,
      number: addressNumber,
    }));
  }

  function handleDeleteAddress() {
    dispatch(deleteAddress());
    setAddressName("");
    setAddressNumber("");
    toast.success("Endereço deletado com sucesso!");
  }

  return (
    <>
      <Header />
      <div className={styles.container}>

        <main className={styles.content}>
          <div>
            <Link to="/panel" className={styles.link}>
              Voltar para o painel
            </Link>

            {user && user?.address && (
              <button className={styles.deleteButton} onClick={handleDeleteAddress}>
                Deletar Endereço
              </button>
            )}
          </div>

          <section className={styles.address}>
            <h2>Meu endereço:</h2>

            <input
              type="text"
              className={styles.input}
              placeholder="Ex: Rua centro, x"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Numero"
              value={addressNumber}
              onChange={(e) => setAddressNumber(e.target.value)}
            />

            <button className={styles.button} onClick={handleRegisterAddress}>
              Salvar Alteração
            </button>

          </section>
        </main>
      </div>
    </>
  )
}

export default Address