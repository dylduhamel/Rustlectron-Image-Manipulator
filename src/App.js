import React, { useState } from 'react';
import ImageDisplay from './components/ImageDisplay';

const rustBindings = require('index.node');

function App() {
    const [originalImageSrc, setOriginalImageSrc] = useState(null); // Store the original image src
    const [imageSrc, setImageSrc] = useState(null); // This will now store the grayscale image
    const [selectedFormat, setSelectedFormat] = useState('png');  // Default format

    function applyGrayscale() {
        if (originalImageSrc) {
            const base64Image = rustBindings.grayscale(originalImageSrc, selectedFormat);
            setImageSrc('data:image/' + selectedFormat + ';base64,' + base64Image);

            console.log(base64Image);
        }
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const path = file.path
                setOriginalImageSrc(path);
            };
            reader.readAsDataURL(file); // Read as Data URL instead of ArrayBuffer
        }
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">Rust-Electron Photo Editor</h1>

            <div>
                <input 
                    type="file" 
                    className="mb-4" 
                    onChange={handleImageUpload} 
                />

                <select value={selectedFormat} onChange={e => setSelectedFormat(e.target.value)}>
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="bmp">BMP</option>
                    {/* Add other formats as needed */}
                </select>

                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={applyGrayscale}
                >
                    Apply Grayscale
                </button>
            </div>

            {/* Displaying both the original and the grayscale images */}
            {/* <h2>Original Image</h2>
            <ImageDisplay imageSrc={originalImageSrc} /> */}

            <h2>Grayscale Image</h2>
            <ImageDisplay imageSrc={imageSrc} />
        </div>
    );
}

export default App;
