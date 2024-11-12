import { Drawer, Autocomplete, Box, Divider, FormControl, FormLabel, IconButton, Input, Sheet, Typography, Stack, Button } from '@mui/joy'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useForm } from "react-hook-form"
import {  wallpapersPatch, wallpapersPost } from '../../../constants/urls';
import {  usePatchRequest, usePostRequest } from '../../../hooks/request';


const NumericFormatAdapter = React.forwardRef(function NumericFormatAdapter(props, ref) {
  const { onChange, name, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        if (onChange) {
          onChange({
            target: {
              name: name,
              value: values.value,
            },
          });
        }
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});


function DrawerComp({ open, setOpen, collections, wallpapersLoading, reload }) {

  const patchRequest = usePatchRequest()
  const postRequest = usePostRequest({ url: wallpapersPost })

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
    const { success } = isUpdate ? await patchRequest.request({ url: wallpapersPatch(isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      // setOpenModal(false)
      setIsUpdate(null)
      reload()
      setOpen(false)
      reset()
    }
  }

  // const onSubmit = (data) => {
  //   console.log(data);
  // }

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
                <Input {...register("image",)} type="text" name="image" />
              </FormControl>

            </Stack>
          </Stack>

          <Button loading={wallpapersLoading} type='submit'>Add</Button>
        </form>

      </Sheet>
    </Drawer>
  )
}

export default DrawerComp