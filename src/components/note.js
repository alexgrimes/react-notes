import React from "react";
import clsx from "clsx";
import {
  Typography,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Card,
  makeStyles,
  Button,
} from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 450,
    marginBottom: 25,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  }
}));

export default function Note(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { id, title, description, completed } = props.note;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEdit = (id) => {
    props.history.push(`/notes/${id}/edit`);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          variant='h4'
          color='textSecondary'
          style= {{ fontSize: '18px' }}
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="delete" onClick={() => props.handleDelete(id)}>
          <DeleteIcon fontSize= '15px' />
        </IconButton>
        {
          done ? (
            <Button
              onClick={() => props.handleDone(props.note)}
              variant="contained"
              style={{ fontSize: '12px' }}
            >
              Complete
            </Button>
          ) : (
            <Button 
              onClick={() => props.handleDone(props.note)}
              variant="contained"
              style={{ fontSize: '12px'}}
            >
              Mark as complete
            </Button>
          )}
          
          <Button 
            onClick={() => handleEdit(id)}
            variant="contained"
            style={{ fontSize: '12px', marginLeft: '10px'}}
          >
            Edit
          </Button>

          <IconButton 
            className={clsx(classes.expand, { 
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
      </CardActions>
      <Collapse 
        in={expanded} 
        timeout="auto" 
        unmountOnExit
      >
        <CardContent>
            <Typography
              color="textPrimary"
              style={{ fontSize: "15px" }}
              paragraph
            >
              {description}
            </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}