
import { Box, Breadcrumbs, Typography, Button, Snackbar, Stack, FormControl, FormLabel, Input } from "@mui/joy";
import { useState } from "react";
import { Link } from "react-router-dom";

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Add from '@mui/icons-material/Add';
import { useLoad } from "../../hooks/request";
import { collectionsList } from "../../constants/urls";
import { DrawerComp, TableComp } from "./components";
import { useForm } from "react-hook-form";


export default function Products() {

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
  const { response: collections, loading: collectionsLoading, request: reload } = useLoad({ url: collectionsList })

  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);


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


  const handleChangePage = (newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const getLabelDisplayedRowsTo = () => {
    return rowsPerPage === -1
      ? collections?.length
      : Math.min(collections?.length, (page + 1) * rowsPerPage);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - collections?.length) : 0;


  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link to={'/'} preventScrollReset={true}>
            <HomeRoundedIcon />
          </Link>
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
            collections
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography level="h3">
            collections
          </Typography>
          <Button
            size="sm"
            variant="solid"
            color="primary"
            startDecorator={<Add />}
            onClick={() => setOpen(true)}
          >Add</Button>
        </Box>

        <Box sx={{display: "flex", gap: 2}}>
          <Box sx={{width: "40%"}} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} p={2}>
              <Stack direction="row" spacing={2}>

                <FormControl sx={{ width: "100%" }} required>
                  <FormLabel>Name</FormLabel>
                  <Input {...register("name")} placeholder='Wallpaper name' type="text" name="name" />
                </FormControl>

              </Stack>
            <Button width="20%" loading={collectionsLoading} type='submit'>Add</Button>

            </Stack>

          </Box>

          <TableComp
            reload={reload}
            page={page}
            rowsPerPage={rowsPerPage}
            emptyRows={emptyRows}
            collections={collections}
            collectionsLoading={collectionsLoading}
            handleChangePage={handleChangePage}
            getLabelDisplayedRowsTo={getLabelDisplayedRowsTo} />

        </Box>

      </Box>

    </>
  )
}
