import React from 'react';
import './components.css';
import arno from '../resources/photodot/drawing.svg'


function HeaderComponent() {
    return (
        <div className = "header">
            <header>
                <img src = {arno} className = "photo"/>  
                <div></div>
            </header>
        </div>
    )
}

export default HeaderComponent
