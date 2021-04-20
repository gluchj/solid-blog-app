import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core'
import { getStringNoLocale, getUrl } from '@inrupt/solid-client'

const useStyles = makeStyles({
  root: {
    /*maxWidth: 285, */
    width: 285,
    height: 341,
    margin: 10,
  },
  media: {
    height: 185,
  },
});

/*
 * PostCard is a UI component displaying a card with a post headline,
 * title, image, and author received via props
 */
const PostCard = ({ index, post }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={getUrl(post, "https://schema.org/image")}
          title=""
        />
        <CardContent>
          <Typography variant="h5" component="h2" noWrap>
            {getStringNoLocale(post, "https://schema.org/headline")}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="p">
            by {getStringNoLocale(post, "http://www.w3.org/2006/vcard/ns#fn")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" noWrap>
            Keywords: {getStringNoLocale(post, "https://schema.org/keywords")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button component={Link} to={{pathname:'/post/' + index, post: post}} size="small" color="primary">
          Read
        </Button>
        <Button component={Link} to='/' size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default PostCard