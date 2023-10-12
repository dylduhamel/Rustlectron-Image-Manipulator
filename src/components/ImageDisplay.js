import React from 'react';

function ImageDisplay({ imageSrc }) {
    return (
        <div>
            {imageSrc && <img src={imageSrc} alt="Processed" />}
        </div>
    );
}

export default ImageDisplay;
