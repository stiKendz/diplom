import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/Footer.css'

export default function Footer() {
    return(
        <footer>
            <div className="footer-container">
                <p>2025 Все права защищены</p>
                <div className="contacts-container">
                    <div className="contact email-contact">mikhailsemenov47@yandex.ru</div>
                    <div className="contact github-contact">stiKendz</div>
                </div>
            </div>
        </footer>
    )
} 