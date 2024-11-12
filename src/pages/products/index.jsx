
import { Box, Breadcrumbs, Typography, Button } from "@mui/joy";
import { useState } from "react";
import { Link } from "react-router-dom";

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Add from '@mui/icons-material/Add';
import { useLoad } from "../../hooks/request";
import { collectionsList, wallpapersList } from "../../constants/urls";
import { DrawerComp, TableComp } from "./components";


export default function Products() {

  const { response: collections, loading: collectionsLoading } = useLoad({ url: collectionsList })
  const { response: wallpapers, loading: wallpapersLoading, request: reload } = useLoad({ url: wallpapersList })

  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangePage = (newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const getLabelDisplayedRowsTo = () => {
    return rowsPerPage === -1
      ? wallpapers?.length
      : Math.min(wallpapers?.length, (page + 1) * rowsPerPage);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - wallpapers?.length) : 0;


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
            Wallpapers
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography level="h3">
            Wallpapers
          </Typography>
          <Button
            size="sm"
            variant="solid"
            color="primary"
            startDecorator={<Add />}
            onClick={() => setOpen(true)}
          >Add</Button>
        </Box>

        <TableComp page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} wallpapers={wallpapers} handleChangePage={handleChangePage} getLabelDisplayedRowsTo={getLabelDisplayedRowsTo}  />

        <DrawerComp open={open} setOpen={setOpen} collections={collections} />


      </Box>

    </>
  )
}
