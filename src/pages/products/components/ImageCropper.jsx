import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button, Stack, styled, SvgIcon } from '@mui/joy';
import getCroppedImg from './getCroppedImg';


const VisuallyHiddenInput = styled('input')`
clip: rect(0 0 0 0);
clip-path: inset(50%);
height: 1px;
overflow: hidden;
position: absolute;
bottom: 0;
left: 0;
white-space: nowrap;
width: 1px;
`;

const ImageUploaderAndCropper = () => {
  const [imageSrc, setImageSrc] = useState(null); // Holds uploaded image
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // Handle file upload and read as data URL
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage); // Display cropped image preview
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);




  return (
    <div>

      {/* File upload button */}
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
      >
        Upload a file
        <VisuallyHiddenInput onChange={handleImageUpload} type="file" />
      </Button>

      <Stack direction="row" spacing={2}>
        {/* Show Cropper if an image is uploaded */}
        {imageSrc && (
          <div>
            <div style={{ position: 'relative', width: 300, height: 300 }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}

              />
            </div>
            <Button onClick={handleCropImage} variant="contained" color="primary" style={{ marginTop: 16 }}>
              Crop Image
            </Button>
          </div>
        )}

        {/* Display cropped image preview */}
        {croppedImage && (
          <div>
            <h3>Cropped Image:</h3>
            <img src={croppedImage} alt="Cropped result" style={{ maxWidth: '100px' }} />
          </div>
        )}
      </Stack>
    </div>
  );
};

export default ImageUploaderAndCropper;
