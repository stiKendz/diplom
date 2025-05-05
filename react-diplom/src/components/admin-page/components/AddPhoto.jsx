import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './AddPhoto.css';

export default function AddPhoto() {
    const [image, SetCarImage] = useState('');
    const [carId, SetCarId] = useState('');
    const [carModelName, SetCarModelName] = useState('');
    
    async function AddPhotoToCar() {
        const formData = new FormData();
            formData.append('image', image);
            formData.append('carId', carId);
            formData.append('carModelName', carModelName);
    
            // интересно, что выводится в консоль
            console.log(image, carId, carModelName);
    
            const response = await fetch('http://localhost:3000/uploadimage', {
                method: 'POST',
                // headers: {
                //     'Content-type': 'multipart/form-data'
                // },
                body: formData
            })
            
            const data = await response.json();

            console.log(data);
    }

    return(
        <>
            <div className="add-photo-container">
                <div className="add-photo-window" encType="multipart/form-data">
                    <img className="uploaded-image" encType="" />
                    <input type="file" name="file" className="add-image-input" encType="" 
                        onChange={SetCarImage}
                    />
                    <input type="number" className="car-id-input" placeholder="id автомобиля для добавления к нему фотографии" 
                        onChange={SetCarId}
                    />
                    <input type="text" className="car-model-name" placeholder="Введите название номера модели" 
                        onChange={SetCarModelName}
                    />
                    <button type="button" className="upload-image-button" onClick={AddPhotoToCar}>Загрузить изображение</button>
                </div>
            </div>
        </>
    )
}