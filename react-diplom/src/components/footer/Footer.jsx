import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/Footer.css'
import github from '../../images/github-white.png'

export default function Footer() {
    return(
        <footer>
            <div className="footer-container">
                <p>2025 Все права защищены</p>
                <div className="contacts-container">
                    <div className="email">mikhailsemenov47@yandex.ru</div>
                    <a href={'https://github.com/stiKendz'}><img className="github" src={github}/></a>
                </div>
            </div>
        </footer>
    )
} 