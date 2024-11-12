// import React, { useState } from 'react'
// import { Button, Card, Form, Image, Input, Modal, Space, Table } from 'antd'
// import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';
// import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
// import { bannerList, bannerPost, bannerDelete, bannerPatch } from '../../constants/urls'
// import useDeleteModal from '../../hooks/useDeleteModal'
// import { isUrlValid } from '../../utils/helpers';


import { AspectRatio, Box, Breadcrumbs, Button, CardContent, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Card from '@mui/joy/Card';
import Add from "@mui/icons-material/Add";


// function Banner() {
//   const [form] = Form.useForm()
//   const postRequest = usePostRequest({ url: bannerPost })
//   const patchRequest = usePatchRequest()
//   const [isUpdate, setIsUpdate] = useState(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const deleteModal = useDeleteModal()

//   const { response: banners, loading, request: reload } = useLoad({ url: bannerList })


//   const handleCancel = () => {
//     setIsModalOpen(false)
//     setIsUpdate(null)
//     form.resetFields()
//   }

//   const handleAdd = () => {
//     setIsModalOpen(true)
//   }

//   const handleSubmit = () => {
//     form.submit()
//   }

//   const handleFinish = async (data) => {
//     const { success } = isUpdate ? await patchRequest.request({ url: bannerPatch(isUpdate), data }) : await postRequest.request({ data })
//     if (success) {
//       reload()
//       handleCancel()
//     }
//   }

//   const handleEdit = (item) => {
//     setIsUpdate(item.id)
//     form.setFieldsValue(item)
//     setIsModalOpen(true)
//   }

//   const columns = [
//     {
//       title: 'Image',
//       dataIndex: 'image',
//       render: (image) => <Image src={image} width={80} height={80} style={{ objectFit: 'contain' }} />
//     },
//     {
//       title: 'Title',
//       dataIndex: 'title',
//     },
//     {
//       title: 'Subtitle',
//       dataIndex: 'toptitle',
//     },
//     {
//       title: 'Actions',
//       render: (item) => (
//         <Space>
//           <Button icon={<EditOutlined />} onClick={() => handleEdit(item)} />
//           <Button icon={<DeleteOutlined />} danger onClick={() => deleteModal(bannerDelete(item.id), reload )} />
//         </Space>
//       )
//     }
//   ]



//   return (
//     <>
//       <Card title='Banner' extra={<Button onClick={handleAdd} >+ Add</Button>}>
//         <Table dataSource={banners} columns={columns} loading={loading} rowKey='id' ></Table>
//       </Card>

//       <Modal
//         maskClosable={false}
//         title={isUpdate ? 'Update' : 'Add'}
//         open={isModalOpen}
//         onCancel={handleCancel}
//         okText={isUpdate ? 'Update' : 'Add'}
//         onOk={handleSubmit}>
//         <Form form={form} onFinish={handleFinish}>
//           <Form.Item label="Toptitle" name='toptitle' rules={[{ type: 'string', required: true, message: 'maydon bosh' }]} >
//             <Input placeholder='Toptitle' />
//           </Form.Item>
//           <Form.Item label="Title" name='title' rules={[{ type: 'string', required: true, message: 'maydon bosh' }]} >
//             <Input placeholder='Title' />
//           </Form.Item>
//           <Form.Item label="Image url" name='image' rules={[{
//             type: 'string',
//             required: true,
//             validator: (_, value) => {
//               if (isUrlValid(value)) {
//                 return Promise.resolve()
//               }
//               return Promise.reject(new Error('Is not URL!'))
//             },
//           }]} >
//             <Input type='url' placeholder='Image' />
//           </Form.Item>

//         </Form>
//       </Modal>
//     </>
//   )
// }

// export default Banner


export default function Banner() {
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

        <Card>
          <AspectRatio minHeight="120px" maxHeight="520px">
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent orientation="horizontal" sx={{display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>Lorem Ipsum is simply dummy text of the printing</Typography>
            </div>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: "center" }}>
              <Button title="Edit" size="sm" variant="soft" color="neutral">
                Edit
              </Button>
              <Button title="Delete" size="sm" variant="soft" color="danger">
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>



      </Box>
    </>
  )
}