import { FC } from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import { Drawer } from '../DashboardStyled'
import * as React from 'react'

import ListRouter from './ListRouter'

interface PropsType {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const SidebarApp: FC<PropsType> = ({ isOpen, toggleDrawer }) => {
  return (
    <Drawer variant="permanent" open={isOpen}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <ListRouter />
    </Drawer>
  )
}

export default SidebarApp
