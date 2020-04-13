import React from "react";
import "typeface-roboto";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// import { Feed, Item, Divider, Segment } from "semantic-ui-react";

const classes = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  avatar: {
    borderRadius: "50px",
    border: "1px solid #444",
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

export const FeedItem = ({ nps, store, comment, avatar, date }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar style={classes.avatar} alt="Remy Sharp" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={date}
          secondary={
            <React.Fragment>
              {comment === "" ? "Sem comentários" : comment}
              <Typography
                component="p"
                variant="body2"
                // className={classes.inline}
                color="textPrimary"
              >
                NPS: {nps}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
    // <>
    //   <Segment color={avatar} key={store}>
    //     <Item>
    //       <Item.Content>
    //         <Item.Description style={{ fontSize: "14px", color: "#000" }}>
    //           {comment === "" ? "Sem Comentários" : comment}
    //         </Item.Description>
    //         <Item.Meta>
    //           <Item.Header style={{ fontSize: "12px", color: "#777" }}>
    //             NPS: {nps}
    //           </Item.Header>
    //         </Item.Meta>
    //       </Item.Content>
    //       {/* <span className="price"></span> */}
    //       <Item.Extra style={{ fontSize: "12px", color: "#999" }}>
    //         {date}
    //       </Item.Extra>
    //     </Item>
    //   </Segment>
    // </>
  );
};

export default FeedItem;
