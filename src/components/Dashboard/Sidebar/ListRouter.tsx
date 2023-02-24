import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import * as React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref
) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />
})

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

const ListRouter = () => {
  return (
    <List component="nav">
      <ListItemLink to="/to-do" primary="To-Do" />
      <Divider sx={{ my: 1 }} />
    </List>
  )
}

export default ListRouter
