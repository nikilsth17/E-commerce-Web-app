import { Avatar, Badge, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, Stack, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { isSeller } from '../utilis/user.role';
import { useQuery } from 'react-query';
import { $axios } from '../lib/axios';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getUserShortName } from '../utilis/userShortName';
import { deepOrange } from '@mui/material/colors';
import LogoutDialog from './LogoutDialog';
import HeroSection from './HeroSection';



const drawerWidth = 240;

const navItems = [
  {
    id: 1,
    name: "Home",
    path: "/home",
  },
  {
    id: 2,
    name: "Product",
    path: "/product",
  },
  {
    id: 3,
    name: "About",
    path: "/about",
  }
];

const Navbar = () => {
  const [stickyClass, setStickyClass] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);

  useEffect(() => {
    // Update stickyClass whenever pathname changes
    stickNavbar();
  }, [pathname]);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 ? setStickyClass('sticky-nav') : setStickyClass('');
    }
  };

  // Conditional rendering based on pathname
  const renderMainContent = () => {
    if (pathname === '/home') {
      return (
        <HeroSection/>
      );
    } else {
      return null; // Render nothing for other paths
    }
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  //get cart count query
  const isUserSeller = isSeller();
  const { data, isError, error } = useQuery({
    queryKey: ["cart-count"],
    queryFn: async () => {
      return await $axios.get("/cart/count");
    },
    enabled: !isUserSeller,     //in network cart count isnot hit 
  })

  const cardItemCount = data?.data?.count;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', color: "black" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        NepMart
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <NavLink to={item.path}
                className={({ isActive }) =>
                  isActive ? "navlink-active" : "navlink-pending"
                }
              >
                <Typography sx={{ color: pathname === `${item.path}` ? "green" : "black", textDecoration: "none" }}>
                  {item.name}
                </Typography>
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container = typeof window !== 'undefined' ? () => document.body : undefined;

  return (
    <Box>
      <div className={`navbar ${stickyClass}`}>
        <Toolbar sx={{ display: "flex", flexDirection: "center", spacing: 4 }}>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.3, justifyContent: "center", display: { xs: 'none', sm: 'flex' }, color: "black" }}
          >
            NepMart
          </Typography>
          <Box sx={{ flexGrow: 0.7, display: { xs: 'none', sm: "flex" }, justifyContent: "center", alignItems: "center" }}>
            {navItems.map((item) => (
              <Button key={item.id} sx={{ color: '#0f0f0f', textDecoration: "none" }}>
                <NavLink to={item.path}
                  className={({ isActive }) =>
                    isActive ? "navlink-active" : "navlink-pending"
                  }
                >
                  <Typography sx={{ color: pathname === `${item.path}` ? "green" : "black", textDecoration: "none" }}>
                    {item.name}
                  </Typography>
                </NavLink>
              </Button>
            ))}
          </Box>
          <Stack
            flexGrow={{ xs: 1, sm: 0 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            {!isSeller() && (
              <Badge badgeContent={cardItemCount} color="primary">
                <AiOutlineShoppingCart
                  style={{ cursor: "pointer", color: pathname === "/cart" ? "green" : "black" }}
                  size={30}
                  onClick={() => navigate("/cart")} />
              </Badge>
            )}
            <Avatar
              sx={{ bgcolor: deepOrange[400] }}
            >
              {getUserShortName()}
            </Avatar>
            <LogoutDialog />
          </Stack>
        </Toolbar>
      </div>
      <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            color:"black"
          }}
        >
          {drawer}
        </Drawer>
      {renderMainContent()}
    </Box>
  );
};

export default Navbar;
