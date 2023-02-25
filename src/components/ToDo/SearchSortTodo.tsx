import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Paper from '@mui/material/Paper'
import * as React from 'react'
import { ChangeEvent, FC } from 'react'

type PropsType = {
  search: string,
  sortPosts: string,
  handleSorting: (e: SelectChangeEvent) => void,
  onClickSearch: () => void,
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void,
}

const SearchSortTodo: FC<PropsType> = ({
  handleSorting,
  onClickSearch,
  onChangeSearch,
  search,
  sortPosts,
}) => {
  return (
    <Paper
      component="form"
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 180,
      }}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortPosts}
          label="Sort"
          onChange={handleSorting}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="body">Body</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ marginTop: 3 }}>
        <TextField
          value={search}
          onChange={onChangeSearch}
          label="Search"
          variant="standard"
          sx={{ width: 220 }}
        />
        <IconButton
          onClick={onClickSearch}
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default SearchSortTodo
