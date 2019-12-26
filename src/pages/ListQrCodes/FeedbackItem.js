import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import { CardMedia, Fade } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import styles from '../../App.css'

// export const FeedHeader = ({ nps, avatar, date }) => {
//   return (
//     // <div className="feed-header">


//   );
// }

const stylesS = muiBaseTheme => ({
  card: {
    flex: 1,
    flexDirection: 'row',
    minWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  avatar: {
    margin: '10px',
    backgroundColor: '#fff'

  },
  media: {
    paddingTop: "56.25%",
    // width: '50px'
  },
  content: {

    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});

export const FeedItem = ({ nps, store, comment, avatar, date }) => {
  return (
    <Fade in={true}>
      <Card style={{ marginBottom: 16, width: '100%' }} >

        <CardContent className={stylesS.content}>
          <Avatar src={avatar} />
          <Typography
            className={"caption"}
            variant={"caption"}
            gutterBottom
          ><td><tr><strong>Loja: {store}</strong></tr>
              <tr>NPS: <strong>{nps}</strong></tr>
              <tr><span> {date}</span></tr></td>



          </Typography>
          <Typography
            className={"MuiTypography--heading"}
            variant={"body1"}
          >
            {comment}

          </Typography>

        </CardContent>
      </Card>
    </Fade>

  );
}

export default FeedItem;