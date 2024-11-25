import React, { useState } from 'react';
import './contact.css';


function ContactForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!formData.nombre || !formData.correo || !formData.mensaje) {
            alert('Por favor, completa todos los campos');
            return;
        }
    };

    return (
        <section id="contacto">
            <h2>Contacto</h2>
            <p>¿Tienes preguntas o dudas? Contáctanos:</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required />

                <label htmlFor="correo">Correo Electrónico:</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required />

                <label htmlFor="mensaje">Mensaje:</label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                ></textarea>

                <button type="submit">Enviar</button>
            </form>
        </section>
    );
}

export default ContactForm;
