import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiFrown } from 'react-icons/fi'
import Swal from 'sweetalert2'
import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            if (response.data.length > 0) {
                setIncidents(response.data)
            } else {
                setIncidents(response.data)
            }
        })
    }, [ongId])

    function handleDeleteIncident(id) {
        try {
            api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            Swal.fire('Oops...', 'Erro ao deletar caso, tente novamente.', 'error')
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vinda, { ongName }</span>

                <Link className="button" 
                to="/incidents/new">Cadastrar novo caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            { (incidents.length > 0) ?
                <ul>
                { incidents.map((incident) => (
                    <li key={incident.id}>
                        <strong>Caso: </strong>
                        <p>{incident.title}</p>
    
                        <strong>Descrição</strong>
                        <p>{incident.description}</p>
    
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
    
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} />
                        </button>
                    </li>
                )) }
                </ul>
            :
                <h2 className="NotFound">
                    <FiFrown size={32} />
                    Nenhum Caso Cadastrado!
                </h2>
            }
        </div>
    );
}
