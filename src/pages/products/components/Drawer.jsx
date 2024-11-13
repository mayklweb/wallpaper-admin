import { Drawer, Autocomplete, Box, Divider, FormControl, FormLabel, IconButton, Input, Sheet, Typography, Stack, Button, SvgIcon } from '@mui/joy'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { NumericFormat } from 'react-number-format';
import { useForm } from "react-hook-form"
import { wallpapersPatch, wallpapersPost } from '../../../constants/urls';
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
  const postRequest = usePostRequest({ url: wallpapersPost })

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
    // const { success } = isUpdate ? await patchRequest.request({ url: wallpapersPatch(isUpdate), data }) : await postRequest.request({ data })
    // if (success) {
    //   // setOpenModal(false)
    //   setIsUpdate(null)
    //   reload()
    //   setOpen(false)
    //   reset()
    // }
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

        <form onSubmit={handleSubmit(onSubmit)}>

          <Stack spacing={4} p={2}>
            <Stack direction="row" spacing={2}>

              <FormControl sx={{ width: "50%" }} required>
                <FormLabel>Name</FormLabel>
                <Input {...register("name")} placeholder='Wallpaper name' type="text" name="name" />
              </FormControl>


              <FormControl sx={{ width: "50%" }} required>
                <FormLabel>Price</FormLabel>
                <Input
                  {...register("price")}
                  name='price'
                  type='number'
                  placeholder="Wallpaper price"
                />
              </FormControl>

            </Stack>

            <Stack direction="row" spacing={2}>

              <FormControl sx={{ width: "50%" }}  >
                <FormLabel>Collections</FormLabel>
                <Autocomplete
                  {...register("collections_id")}
                  placeholder="Select Collections"
                  options={collections || []}
                  getOptionLabel={(option) => option.name}
                />
              </FormControl>

              <FormControl sx={{ width: "50%" }} required>

                <FormLabel>Image</FormLabel>

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
                  <VisuallyHiddenInput {...register("image")} type="file" />
                </Button>

                {/* <ImageUploaderAndCropper /> */}

              </FormControl>




            </Stack>

            <Stack direction="row" spacing={2}>




            </Stack>
          </Stack>

          <Button loading={wallpapersLoading} type='submit'>Add</Button>
        </form>

      </Sheet>
    </Drawer>
  )
}

export default DrawerComp