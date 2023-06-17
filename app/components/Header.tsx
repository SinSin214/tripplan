import { BottomNavigation, BottomNavigationAction, } from '@mui/material';
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const pathName = usePathname();
    return (
        <BottomNavigation
            className="bg-stone-800 fixed w-full z-10"
            sx={{ '.MuiBottomNavigationAction-label': {
                fontSize: '1.25rem',
                color: 'white'
            }}}
            showLabels
            onChange={(event, value) => {
                router.push(value);
            }}>
            <BottomNavigationAction 
                className={`${pathName === '/' && "nav_item_active"} nav_items `}
                label="Home" 
                value="/" />
            <BottomNavigationAction 
                className={`${pathName === '/destination' && "nav_item_active"} nav_items`}
                label="Destination" 
                value="/destination" />
            <BottomNavigationAction 
                className={`${pathName === '/planning' && "nav_item_active"} nav_items`}
                label="Planning" 
                value="/planning" />
            <BottomNavigationAction 
                className={`${pathName === '/user/register' && "nav_item_active"} nav_items`}
                label="Register" 
                value="/user/register" />
            <BottomNavigationAction 
                className={`${pathName === '/user/login' && "nav_item_active"} nav_items`}
                label="Login" 
                value="/user/login" />
        </BottomNavigation>
    )
}