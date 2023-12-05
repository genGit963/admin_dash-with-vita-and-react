import React, { useState } from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  Card,
  LinearProgress,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { MediaServices } from 'src/services/mediaServices';
import ImageUploader from './ImageUploader';
import { useQuery } from '@tanstack/react-query';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0,
};

const ImageSelectionModal: React.FC = () => {
  const baseUrl = import.meta.env.VITE_API_URL + '/media/asset/';
  const imagesQuery = useQuery<Notification[], Error>({
    queryKey: ['image_loader'],
    queryFn: () => MediaServices.getAll().then((res) => res),
    staleTime: 0,
  });
  const [open, setOpen] = useState(false);

  const imageSize = 100;
  if (imagesQuery.isLoading) {
    return <LinearProgress />;
  }
  if (imagesQuery.error) {
    return <span>Error</span>;
  }
  return (
    <div>
      <Button onClick={() => setOpen(true)}>{'Select Images'}</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={'Media Library'}>
        <Card sx={style}>
          <Box
            color={'primary'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: 50,
              bgcolor: 'primary.main',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" color={'#fff'}>
              Image Selector
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, overflow: 'auto', padding: 2 }}>
            <Grid container sx={{ flexGrow: 1 }}>
              <Grid item key={0} xs={12} sm={4} sx={{ p: 2 }}>
                <ImageUploader />
              </Grid>
              <Grid
                container
                spacing={2}
                xs={12}
                sm={8}
                md={7}
                sx={{ borderLeft: '1px dotted #aaa', p: 2, height: '100%' }}
              >
                <Grid item xs={12}>
                  <Typography variant="h6" component="h1">
                    Or Select from Available Images
                  </Typography>
                </Grid>
                {imagesQuery.data?.map((image) => (
                  <Grid
                    item
                    key={image.id}
                    onClick={() => handleImageClick(image)}
                  >
                    <div>
                      <IconButton sx={{ float: 'right', marginLeft: -20 }}>
                        {image.selected ? (
                          <CancelIcon color="secondary" />
                        ) : (
                          <AddCircleOutlineIcon />
                        )}
                      </IconButton>
                      <img
                        src={`${baseUrl}${image.Id}`}
                        alt={image.Name}
                        height={imageSize}
                      />
                    </div>
                  </Grid>
                ))}

                {/*images && images.filter((x) => x.selected).length > 0 && (
                  <Grid
                    container
                    spacing={2}
                    sx={{ height: 120, padding: 2, marginBottom: 2 }}
                  >
                    <Divider />
                    <Grid item xs={12}>
                      <Typography variant="h6" component="h1">
                        Selected Images
                      </Typography>
                    </Grid>
                    <ImageList
                      sx={{
                        marginLeft: 2,
                        display: 'grid',
                        gridAutoFlow: 'column',
                        gridTemplateColumns: `repeat(auto-fill,minmax(${selectedImageSize}px,1fr)) !important'`,
                        gridAutoColumns: `minmax(${selectedImageSize}px, 1fr)`,
                      }}
                    >
                      {images
                        .filter((x) => x.selected)
                        .map((image) => (
                          <Grid item key={image.id}>
                            <img
                              src={image.src}
                              alt={image.alt}
                              height={selectedImageSize}
                            />
                          </Grid>
                        ))}
                    </ImageList>
                  </Grid>
                )*/}
              </Grid>
            </Grid>
          </Box>

          <Box
            color={'primary'}
            sx={{
              height: 70,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              p: 2,
            }}
            alignContent={'flex-end'}
          >
            <Button color="primary" variant="contained" size="small">
              Submit Changes
            </Button>
            <Button color="secondary" variant="contained" size="small">
              Add Images
            </Button>
            <Button size="small">Cacnel</Button>
          </Box>
        </Card>
      </Modal>
    </div>
  );
};

export default ImageSelectionModal;
