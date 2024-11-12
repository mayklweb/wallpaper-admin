import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


export const sidebarItems = [
  {
    slug: '/',
    icon: <HomeRoundedIcon />,
    label: "Home",
  },
  {
    slug: '/products',
    icon: <Inventory2RoundedIcon />,
    label: "Products",
  },
  {
    slug: '/categories',
    icon: <CategoryRoundedIcon/>,
    label: "Categories",
  },
  {
    slug: '/banner',
    icon: <ViewCarouselRoundedIcon/>,
    label: "Banner"
  },
  {
    slug: '/content',
    icon: <SubscriptionsRoundedIcon />,
    label: "Content"
  }
]