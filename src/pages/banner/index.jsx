import { AspectRatio, Box, Breadcrumbs, Button, CardContent, Snackbar, Stack, Typography, Card, SvgIcon, styled, FormControl, FormLabel, Input } from "@mui/joy";
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Add from "@mui/icons-material/Add";
import { bannerDelete, bannerList, bannerPost } from "../../constants/urls";
import { useDeleteRequest, useLoad, usePatchRequest, usePostRequest } from "../../hooks/request";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



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

export default function Banner() {

  //onClick={() => deleteModal(bannerDelete(item.id), reload )}
  const [deleteUrl, setDeleteUrl] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const deleteRequest = useDeleteRequest()
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const { response: banners, loading, request: reload } = useLoad({ url: bannerList })
  const postRequest = usePostRequest({ url: bannerPost })

  const { register, handleSubmit, reset } = useForm(
    {
      defaultValues: {
        title: '',
        videao: '',
      },
    }
  )


  const onSubmit = async (data) => {
    console.log(data);
    const { success } = isUpdate ? await patchRequest.request({ url: (isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      // setOpenModal(false)
      setIsUpdate(null)
      reload()
      setOpen(false)
      reset()
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setIsUpdate(null)
    form.resetFields()
  }

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  const handleFinish = async (data) => {
    const { success } = isUpdate ? await patchRequest.request({ url: bannerPatch(isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      reload()
      handleCancel()
    }
  }



  const handleEdit = (item) => {
    // console.log(item);
    // setIsUpdate(item.id)
    // setIsModalOpen(true)
  }
  const handleDelete = async (deleteUrl, reload) => {
    await deleteRequest.request({ url: deleteUrl })
    reload()
  }

  useEffect(() => {

  }, []);



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
            Banner
          </Typography>
        </Breadcrumbs>

      </Box>

      <Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography level="h3">
            Banner
          </Typography>
          <Button size="sm" startDecorator={<Add />}>Add</Button>
        </Box>

        <Box>

          {
            banners ?
              <Box component="form" onSubmit={handleSubmit(handleFinish)}>
                <FormControl sx={{ width: "50%" }} required>
                  <FormLabel>Title</FormLabel>
                  <Input
                    {...register("title")}
                    name='title'
                    type='text'
                    placeholder="Wallpaper price"
                  />
                </FormControl>
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
                    </SvgIcon>}
                >
                  Upload a file
                  <VisuallyHiddenInput type="file" />
                </Button>
                <Button >Submit</Button>
              </Box>

              :

              banners?.map((banner) => (
                <Card key={banner.id}>
                  <AspectRatio minHeight="120px" maxHeight="520px">
                    <img
                      src={banner.image}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent orientation="horizontal" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>{banner.title}</Typography>
                    </div>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: "center" }}>
                      <Button onClick={handleEdit(banner)} title="Edit" size="sm" variant="solid" color="neutral">
                        Edit
                      </Button>
                      <Button onClick={() => setDeleteModal(true)} title="Delete" size="sm" variant="solid" color="danger">
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                  <Snackbar
                    autoHideDuration={5000}
                    variant="outlined"
                    color="neutral"
                    size="lg"
                    invertedColors
                    open={deleteModal}
                    onClose={() => setDeleteModal(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}

                  >
                    <div>
                      <Typography level="title-lg">Hey, Wait!!</Typography>
                      <Typography sx={{ mt: 1, mb: 2 }}>
                        Are you sure, you want to leave this page without confirming your order?
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{
                        justifyContent: "flex-end",
                      }}>
                        <Button loading={loading} variant="solid" color="danger" onClick={() => handleDelete(bannerDelete(banner.id), reload)}>
                          Yes
                        </Button>

                        <Button
                          variant="solid"
                          color="neutral"
                          onClick={() => setDeleteModal(false)}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </div>
                  </Snackbar>
                </Card>
              ))
          }
        </Box>
      </Box >
    </>
  )
}