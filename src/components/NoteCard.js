// jshint esversion:9

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardActions, Collapse, IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue, green, pink, yellow } from '@mui/material/colors';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const NoteCard = ({ note, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const getCategoryColor = (category) => {
    if (category === 'work') {
      return yellow[700];
    }
    if (category === 'money') {
      return green[500];
    }
    if (category === 'todos') {
      return pink[500];
    }
    return blue[500];
  };

  const myStyleClasses = {
    avatar: {
      backgroundColor: getCategoryColor(note.category),
    },
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={<Avatar sx={myStyleClasses.avatar}>{note.title[0].toUpperCase()}</Avatar>}
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
          sx={{ paddingBottom: 0 }}
        />

        {/* <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {note.details}
          </Typography>
        </CardContent> */}

        <CardActions disableSpacing sx={{ paddingTop: 0, paddingBottom: 0 }}>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent sx={{ paddingTop: 0 }}>
            <Typography variant='body2' color='textSecondary'>
              {note.details}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
