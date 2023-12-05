import React, { ChangeEvent, useState } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import { MediaServices } from 'src/services/mediaServices';

interface ImagePreviewProps {
  src: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => (
  <Paper elevation={2} style={{ margin: '10px', padding: '10px' }}>
    <img
      src={src}
      alt="Preview"
      style={{ maxWidth: '100%', maxHeight: '150px' }}
    />
  </Paper>
);

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles);

      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviews(previewUrls);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    const imageData = { Type: 'IMAGE', Active: 1, Name: images[0].name };
    formData.append('file', images[0]);
    formData.append('document', JSON.stringify(imageData));
    MediaServices.addNew(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="outlined" component="span">
          Select Images
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        style={{ marginLeft: '10px' }}
        disabled={previews.length === 0}
      >
        Upload
      </Button>
      <Grid container>
        {previews.map((src, index) => (
          <Grid item xs={3} key={index}>
            <ImagePreview src={src} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageUploader;
