//jshint esversion:9
import { Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { NoteCard } from '../components/NoteCard';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await axios.get('http://localhost:8000/notes');
      setNotes(response.data);
    })();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete('http://localhost:8000/notes/' + id);
    let newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div>
      {/* GRID SYSTEM */}

      {/* <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>1</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>2</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>4</Paper>
        </Grid>
      </Grid> */}

      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
