//jshint esversion: 9
import React from 'react';
import { useState } from 'react';
import { Button, ButtonGroup, Container, FormControlLabel, FormLabel, TextField, Typography } from '@mui/material';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import SendIcon from '@mui/icons-material/Send';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Create() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('money');
  const history = useHistory();

  const myStyleClasses = {
    btn2: {
      backgroundColor: '#F00',
      '&:hover': {
        backgroundColor: '#00F',
      },
      color: 'white',
    },
    field: {
      marginTop: 5,
      marginBottom: 5,
      display: 'block',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    title === '' ? setTitleError(true) : setTitleError(false);
    details === '' ? setDetailsError(true) : setDetailsError(false);

    if (title && details) {
      //console.log(title, details, category);
      let response = await axios.post('http://localhost:8000/notes', { title, details, category });
      history.push('/');
    }
  };

  return (
    <div>
      {/* TYPOGRAPHY */}
      <Typography variant='h6' component='h2' gutterBottom color='textSecondary'>
        Create a new note
      </Typography>
      <Typography color='secondary' noWrap>
        By default typography outputs a 'p' and the 'secondary' color used here is this pink.
      </Typography>
      {/* BUTTONS */}
      <Button variant='contained'>Contained</Button>
      <Button variant='contained' size='small'>
        Small
      </Button>
      <Button variant='contained' disabled>
        Disabled
      </Button>
      <Button variant='contained' href='#contained-buttons'>
        Link
      </Button>
      <Button variant='contained' color='success'>
        success
      </Button>
      <Button variant='contained' color='warning'>
        warning
      </Button>
      <ButtonGroup color='secondary' variant='contained'>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <Button variant='outlined' type='submit' color='secondary' onClick={() => console.log('You clicked me!')}>
        click Submit
      </Button>
      <br />
      {/* ICONS */}
      <AcUnitOutlinedIcon color='secondary' fontSize='small' /> <br />
      <AcUnitOutlinedIcon color='action' fontSize='medium' /> <br />
      <AcUnitOutlinedIcon color='secondary' fontSize='large' /> <br />
      <Button startIcon={<SendIcon />}>Button with icons</Button> <br />
      <Button endIcon={<SendIcon />}>Button with icons</Button> <br />
      {/* CUSTOMIZED COMPONENTS */}
      <Button sx={{ backgroundColor: '#F00' }} type='submit' color='secondary'>
        Custom btn
      </Button>
      <Button sx={myStyleClasses.btn2} type='submit' color='secondary'>
        Custom btn 2
      </Button>
      {/* RADIO BUTTONS */}
      <FormControl sx={myStyleClasses.field}>
        <FormLabel>Note Category</FormLabel>
        <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)} row>
          <FormControlLabel control={<Radio />} label='Money' value='money' />
          <FormControlLabel control={<Radio />} label='Todos' value='todos' />
          <FormControlLabel control={<Radio />} label='Reminders' value='reminders' />
          <FormControlLabel control={<Radio />} label='Work' value='work' />
        </RadioGroup>
      </FormControl>
      {/* TEXT FIELDS */}
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField label='Note Title' variant='outlined' color='secondary' fullWidth required sx={myStyleClasses.field} onChange={(e) => setTitle(e.target.value)} error={titleError} />
        <TextField
          label='Details'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          sx={myStyleClasses.field}
          multiline
          rows={5}
          onChange={(e) => setDetails(e.target.value)}
          error={detailsError}
        />
        <Button variant='outlined' type='submit' color='secondary'>
          Submit
        </Button>
      </form>
    </div>
  );
}
