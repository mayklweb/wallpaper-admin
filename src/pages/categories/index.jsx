// import React, { useEffect, useState } from 'react'
// import { Button, Card, Col, Form, Input, Row, Space, Switch, Table, Typography } from 'antd'
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
// import { categoriesDelete, categoriesList, categoriesPatch, categoriesPost } from '../../constants/urls'
// import { slugify } from '../../utils/helpers'
// import useDeleteModal from '../../hooks/useDeleteModal'
// import Item from 'antd/es/list/Item';
// function Categories() {

import { Box, Breadcrumbs, Button, Drawer, IconButton, Sheet, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import { FavoriteBorder } from "@mui/icons-material";

import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Table from '@mui/joy/Table';
import { useState } from "react";

import Add from '@mui/icons-material/Add';
import  FavoriteBorder  from "@mui/icons-material/FavoriteBorder";

function createData(name, calories, fat, carbs, protein, action) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    action
  };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];



//   const [form] = Form.useForm()
//   const title = Form.useWatch('title', form)
//   const postRequest = usePostRequest({ url: categoriesPost })
//   const patchRequest = usePatchRequest()
//   const [isUpdate, setIsUpdate] = useState(null)
//   const deleteModal = useDeleteModal()

//   const { response: categories, loading, request: reload } = useLoad({ url: categoriesList })



//   const columns = [
//     {
//       title: 'Id',
//       dataIndex: 'id',
//     },
//     {
//       title: 'Title',
//       dataIndex: 'title',
//     },
//     {
//       title: 'Slug',
//       dataIndex: 'slug',
//     },
//     {
//       title: 'Is Recommended',
//       render: (isRecommended) => (
//         <Switch checkedChildren='True' unCheckedChildren="False" defaultChecked={isRecommended} onChange={(e) => handleRecommended(e, Item.id)} />
//       )
//     },
//     {
//       title: 'Actions',
//       render: (item) => (
//         <Space>
//           <Button icon={<EditOutlined />} disabled={isUpdate} onClick={() => handleEdit(item)} />
//           <Button icon={<DeleteOutlined />} disabled={isUpdate} danger onClick={() => deleteModal(categoriesDelete(item.id), reload)} />
//         </Space>
//       )
//     }
//   ]

//   const handleRecommended = async (e, id) => {
//     const { success } = await patchRequest.request({ url: categoriesPatch(id), data : {isRecommended: e} })
//     if (success) {
//       reload()
//     }
//   }

//   const handleEdit = (item) => {
//     form.setFieldsValue(item)
//     setIsUpdate(item.id)
//   }

//   const handleFinish = async (data) => {
//     const { success } = isUpdate ? await patchRequest.request({ url: categoriesPatch(isUpdate), data }) : await postRequest.request({ data })
//     if (success) {
//       reload()
//       form.resetFields()
//       setIsUpdate(null)
//     }
//   }

//   const handleCanel = () => {
//     setIsUpdate(null)
//     form.resetFields()
//   }

//   useEffect(() => {
//     if (title && title.length) {
//       form.setFieldValue('slug', slugify(title))
//     }
//   }, [title])



export default function Categories(){

  const [open, setOpen] = useState(false);
  const [type, setType] = useState('Guesthouse');
  const [amenities, setAmenities] = useState([0, 6]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangePage = (newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const getLabelDisplayedRowsTo = () => {
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



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
          Collections
        </Typography>
      </Breadcrumbs>
    </Box>

    <Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography level="h3">
          Collections
        </Typography>
        <Button
          size="sm"
          variant="solid"
          color="primary"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >Add</Button>
      </Box>

      <Sheet variant="outlined" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}>
        <Table aria-labelledby="tableTitle" hoverRow borderAxis="bothBetween" >
          <thead>
            <tr>
              <th >Dessert (100g serving)</th>
              <th>Calories</th>
              <th>Fat (g)</th>
              <th>Carbs (g)</th>
              <th>Protein (g)</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.calories}</td>
                  <td>{row.fat}</td>
                  <td>{row.carbs}</td>
                  <td>{row.protein}</td>
                  <td >
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: "center" }}>
                      <Button title="Edit" size="sm" variant="soft" color="neutral">
                        Edit
                      </Button>
                      <Button title="Delete" size="sm" variant="soft" color="danger">
                        Delete
                      </Button>
                    </Box>
                  </td>
                </tr>
              ))}
            {emptyRows > 0 && (
              <tr style={{ height: `calc(${emptyRows} * 40px)`, '--TableRow-hoverBackground': 'transparent' }}>
                <td colSpan={6} aria-hidden />
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>

                  <Typography sx={{ textAlign: 'center', minWidth: 80 }}>
                    {page * rowsPerPage + 1}–{getLabelDisplayedRowsTo()} of {rows.length}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={page === 0}
                      onClick={() => handleChangePage(page - 1)}
                      sx={{ bgcolor: 'background.surface' }}
                    >
                      <KeyboardArrowLeftIcon />
                    </IconButton>

                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                      onClick={() => handleChangePage(page + 1)}
                      sx={{ bgcolor: 'background.surface' }}
                    >
                      <KeyboardArrowRightIcon/>
                    </IconButton>
                  </Box>
                </Box>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>


      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        
        variant="solid"
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: { md: 3, sm: 2 },
              boxShadow: 'none',
              width: "60%"
            },
          },
        }}>
        <Sheet
          sx={{
            borderRadius: 'md',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Box>
            <Typography></Typography>
            <IconButton variant="plain">
              <FavoriteBorder />
            </IconButton>
          </Box>

        </Sheet>
      </Drawer>

    </Box>

  </>
  )
}