import { Box, Button, IconButton, Sheet, Typography, Table, Snackbar, Stack } from '@mui/joy'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import { collectionsDelete } from '../../../constants/urls';
import { useDeleteRequest } from '../../../hooks/request';

function TableComp({ reload, page, rowsPerPage, emptyRows, collections, collectionsLoading, getLabelDisplayedRowsTo, handleChangePage }) {

  const [deleteId, setDeleteId] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const deleteRequest = useDeleteRequest()

  const handleDelete = async (deleteUrl, reload) => {
    await deleteRequest.request({ url: deleteUrl })
    reload()
    setDeleteModal(false)
  }

  return (
    <>
      <Sheet variant="outlined" sx={{ width: '60%', boxShadow: 'sm', borderRadius: 'sm' }}>
        <Table hoverRow borderAxis="bothBetween" >
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "20%" }}>Image</th>
              <th style={{ width: "30%" }}>Name</th>
              <th style={{ width: "20%" }}>Price</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {collections?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((collection) => (
                <tr key={collection.id}>
                  <td >{collection.id}</td>
                  <td>{collection.image}</td>
                  <td>{collection.name}</td>
                  <td>{collection.price}</td>
                  <td >
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: "center" }}>
                      <Button title="Edit" size="sm" variant="soft" color="neutral">
                        Edit
                      </Button>
                      <Button onClick={() => {setDeleteModal(true), setDeleteId(collection.id)}} title="Delete" size="sm" variant="soft" color="danger">
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
                    {page * rowsPerPage + 1}–{getLabelDisplayedRowsTo()} of {collections?.length}
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
                      disabled={page >= Math.ceil(collections?.length / rowsPerPage) - 1}
                      onClick={() => handleChangePage(page + 1)}
                      sx={{ bgcolor: 'background.surface' }}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Box>
                </Box>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>

      <Snackbar
        // autoHideDuration={2000}
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
            <Button loading={collectionsLoading} variant="solid" color="danger" onClick={() => handleDelete(collectionsDelete(deleteId), reload)}>
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
    </>
  )
}

export default TableComp