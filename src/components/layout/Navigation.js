import React from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemIcon } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider'
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import DirectionsCar from 'material-ui-icons/DirectionsCar';

const styles = theme => ({
  drawerHeader: {
    'text-align': 'center',
    height: '56px',
    [theme.breakpoints.up('sm')]: {
      height: '64px;'
    },
  },
});

class Navigation extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.drawerHeader} >
          <Typography type="display1" component="h2" noWrap>
            TrackR
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button component={NavLink} to='/'>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            Home
          </ListItem>
          <ListItem button component={NavLink} to="/garage">
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            Garage
          </ListItem>
          <ListItem button component={NavLink} to="/contact">
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            Contact
          </ListItem>
          <Divider />
          <ListItem>
            Admin
          </ListItem>
          <ListItem button component={NavLink} to="/vehicles">
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            Vehicles
          </ListItem>
          <ListItem button component={NavLink} to="/service-items">
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            Service Items
          </ListItem>
        </List>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navigation);