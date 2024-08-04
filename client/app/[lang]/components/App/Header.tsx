'use client';
import { usePathname } from "next/navigation";
import { Fragment, SyntheticEvent, useContext, useRef, useState } from 'react';
import { AuthContext, defaultProfile } from '../../context/authContext';
import { Avatar, Button, ClickAwayListener, Grow, ListItemIcon, MenuItem, MenuList, Paper, Popper, Stack } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { AppContext } from "../../context/appContext";
import { useTranslations } from 'next-intl';
import { RequestMethod } from "@/types/globalType";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
    const pathName = usePathname();
    const { profile, setProfile } = useContext(AuthContext);
    const { navigation, requestAPI } = useContext(AppContext);
    const t = useTranslations();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const signOut = async () => {
        await requestAPI('/auth/sign_out', RequestMethod.Get);
        setProfile(defaultProfile);
        navigation('/');
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
      const handleClose = (event: Event | SyntheticEvent) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }
    
        setOpen(false);
      };

      const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === 'Escape') {
          setOpen(false);
        }
      }

    return (
        <div className="header">
            <div className="container-navbar-part w-full">
                <Button
                    className={`${pathName === '/' ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/')}>{t('Home')}</Button>
                <Button
                    className={`${pathName.includes('/thread') ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/thread')}>{t('Thread')}</Button>
                <Button
                    className={`${pathName.includes('/destination') ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/destination')}>{t('Destination')}</Button>
                <Button
                    className={`${pathName.includes('/planning') ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/planning')}>{t('Planning')}</Button>
            </div>
            {profile ?
                <div className="container-navbar-part">
                    <Button className="btn-custom min-w-max"
                        startIcon={<CreateIcon />}
                        hidden
                        onClick={() => navigation('/thread/write')}>
                        {t('NewThread')}
                    </Button>
                </div>
                : ''}
            <div className="container-navbar-part mx-3">
                {profile ?
                    <Fragment>
                        <Stack direction="row" spacing={2}>
                            <div>
                                <Button
                                className="btn-custom"
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                >
                                    <Avatar className="mr-2" alt="avatar" src={profile.avatarPath} />
                                    Hi, {profile.username}
                                </Button>
                                <Popper
                                className="rounded"
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                                >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                    className="rounded"
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                    >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            className="background-color p-0 w-[120%] rounded"
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem className="btn-custom rounded py-3" onClick={handleClose}>
                                                <SettingsIcon className="mr-4" />
                                                Profile
                                            </MenuItem>
                                            <MenuItem className="btn-custom rounded py-3" onClick={signOut}>
                                                <LogoutIcon className="mr-4" />
                                                {t('SignOut')}
                                            </MenuItem>
                                        </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                    </Grow>
                                )}
                                </Popper>
                            </div>
                            </Stack>
                    </Fragment>
                    :
                    <Fragment>
                        <Button
                            className="btn-custom" 
                            onClick={() => navigation('/auth/sign-in')}>{t('SignIn')}</Button>
                        <Button 
                            className="btn-custom"
                            onClick={() => navigation('/auth/sign-up')}>{t('SignUp')}</Button>
                    </Fragment>
                }
            </div>
        </div>
    )
}