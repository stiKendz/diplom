import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './AddPhoto.css';

export default function AddPhoto() {
    const [image, setImage] = useState(null);
    const [carId, setCarId] = useState('');
    const [carModelName, setCarModelName] = useState('');
    
    async function AddPhotoToCar() {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('carId', carId);
        formData.append('carModelName', carModelName);
    
        // консольный вывод для проверки
        console.log(image, carId, carModelName);
    
        const response = await fetch('http://localhost:3000/uploadimage', {
            method: 'POST',
            // headers: {
            //     'Content-type': 'multipart/form-data'
            // },
            body: formData
        })
            
        const data = await response.json();

        if (data.emptyInputError) {
            alert('Все поля в окне загрузкифотографии должны быть запонены');
        }
        console.log(data);
    }

    return(
        <>
            <div className="add-photo-container">
                <h2>Добавить фотографию</h2>
                <div className="add-photo-window" encType="multipart/form-data">
                    <img className="uploaded-image" encType="" />
                    <input type="file" accept='image/*' className="add-image-input" encType="" 
                        onChange={e => setImage(e.target.files[0])}
                    />
                    <input type="number" className="car-id-input" placeholder="ID автомобиля" 
                        onChange={e => setCarId(e.target.value)}
                    />
                    <input type="text" className="car-model-name" placeholder="Введите название номера модели" 
                        onChange={e => setCarModelName(e.target.value)}
                    />
                    <button type="button" className="upload-image-button" onClick={AddPhotoToCar}>Загрузить изображение</button>
                </div>
            </div>
        </>
    )
}