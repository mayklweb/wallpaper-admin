import { AspectRatio, Box, Breadcrumbs, Button, Card, CardContent, CardOverflow, Divider, Grid, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Add from "@mui/icons-material/Add";


export default function Content() {
  return (
    <Box >
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
            Content
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography level="h3">
          Content
        </Typography>
        <Box>
          <Button
            size="sm"
            variant="solid"
            color="primary"
            startDecorator={<Add />}
          // onClick={() => setOpen(true)}
          >Add</Button>
          
        </Box>

      </Box>

      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
          {Array.from(Array(19)).map((_, index) => (
            <Grid key={index} >
              <Card sx={{ width: "340px" }}>
                <AspectRatio ratio="2">
                  <img
                    src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                    srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>

                <CardContent>
                  <Typography level="title-md">Yosemite National Park</Typography>
                  <Typography level="body-sm">California</Typography>
                </CardContent>

                <CardOverflow variant="soft">
                  <Divider inset="context" />
                  <CardContent orientation="horizontal">
                    <Box sx={{ width: '100%', display: 'flex', gap: 2, justifyContent: "space-between" }}>
                      <Box sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button title="Edit" size="sm" variant="solid" color="neutral">
                          Edit
                        </Button>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button title="Delete" size="sm" variant="solid" color="danger">
                          Delete
                        </Button>
                      </Box>
                    </Box>

                  </CardContent>
                </CardOverflow>


              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}