import { Drawer, Autocomplete, Box, Divider, FormControl, FormLabel, IconButton, Input, Sheet, Typography, Stack, Button, SvgIcon } from '@mui/joy'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { NumericFormat } from 'react-number-format';
import { useForm } from "react-hook-form"
import { collectionsPatch, collectionsPost, wallpapersPatch, wallpapersPost } from '../../../constants/urls';
import { usePatchRequest, usePostRequest } from '../../../hooks/request';
import { styled } from '@mui/joy';




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

function DrawerComp({ open, setOpen, collections, wallpapersLoading, reload }) {

  const patchRequest = usePatchRequest()
  const postRequest = usePostRequest({ url: collectionsPost })

  const [croppedImage, setCroppedImage] = useState(null);

  const handleCropComplete = (croppedImage) => {
    setCroppedImage(croppedImage);
  };


  const { register, handleSubmit, reset } = useForm(
    {
      defaultValues: {
        name: '',
        price: '',
        image: '',
        collections_id: '',
      },
    }
  )
  const [isUpdate, setIsUpdate] = useState(null);


  const onSubmit = async (data) => {
    console.log(data);
    const { success } = isUpdate ? await patchRequest.request({ url: collectionsPatch(isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      // setOpenModal(false)
      setIsUpdate(null)
      reload()
      setOpen(false)
      reset()
    }
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      slotProps={{
        content: {
          sx: {
            bgcolor: 'transparent',
            p: 2,
            boxShadow: 'none',
            width: { xs: "100%", md: "50%", }
          },
        },
      }}>
      <Sheet
        sx={{
          borderRadius: 'md',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Box sx={{ p: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography>Add Wallpaper</Typography>
          <IconButton variant="plain" onClick={() => setOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Divider orientation="horizontal" />

       

      </Sheet>
    </Drawer>
  )
}

export default DrawerComp