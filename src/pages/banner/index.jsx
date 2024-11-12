import { AspectRatio, Box, Breadcrumbs, Button, CardContent, Snackbar, Stack, Typography, Card } from "@mui/joy";
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Add from "@mui/icons-material/Add";
import { bannerDelete, bannerList, bannerPost } from "../../constants/urls";
import { useDeleteRequest, useLoad, usePatchRequest, usePostRequest } from "../../hooks/request";
import { useEffect, useState } from "react";

export default function Banner() {

  //onClick={() => deleteModal(bannerDelete(item.id), reload )}
  const [deleteUrl, setDeleteUrl] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const deleteRequest = useDeleteRequest()
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const { response: banners, loading, request: reload } = useLoad({ url: bannerList })
  const postRequest = usePostRequest({ url: bannerPost })

  console.log(banners);


  const handleCancel = () => {
    setIsModalOpen(false)
    setIsUpdate(null)
    form.resetFields()
  }

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = () => {

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

          {banners?.map((banner) => (
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
          ))}



        </Box>





      </Box>
    </>
  )
}