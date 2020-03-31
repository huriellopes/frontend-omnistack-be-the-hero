import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import Swal from 'sweetalert2'
import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'

function Logon() {
    const [id, setId] = useState('')

    const history = useHistory();

    async function handlelogin(e) {
        e.preventDefault();

        try {
            const resp = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', resp.data.name);

            history.push('/profile');
        } catch (err) {
            Swal.fire('Oops...','Falha no Login, tente novamente!', 'error')
            //.alert();
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handlelogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={herosImg} alt="Heros"/>
        </div>
    );
}

export default Logon;