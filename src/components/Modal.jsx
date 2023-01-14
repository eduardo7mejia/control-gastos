import React, { useState } from 'react'
import { categorias } from '../assets/data/Categorias'
import CerrarBtn from '../assets/img/cerrar.svg'
import Message from './Message'
const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto }) => {
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const ocultarModal = () => {
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 600);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }
        guardarGasto({ nombre, cantidad, categoria })
    }

    return (
        <div className='modal'>
            <div className="cerrar-modal">
                <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
            </div>
            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                {mensaje && <Message tipo='error'>{mensaje}</Message>}
                <legend>Nuevo Gasto</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Ingresa nombre Gasto: ej. Fiesta'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id='cantidad'
                        type="number"
                        placeholder='Ingresa nombre Gasto: ej. 5000'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}>
                        <option disabled value="">-- Seleccione --</option>
                        {categorias.map(({ value, categoria }, index) => (
                            <option key={index} value={value}>{categoria}</option>
                        ))}
                    </select>
                </div>
                <input type="submit" value='Añadir Gasto' />
            </form>
        </div>
    )
}

export default Modal