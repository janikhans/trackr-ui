import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class ServiceItemDeleteDialog extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleDelete = (e) => {
    this.props.deleteServiceItem(this.props.serviceItem.id)
  }

  render() {
    return (
      <div>
        <Button raised color="accent" onClick={this.handleClickOpen}>Delete</Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{"Delete this Service Item?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this service item? This deletes all records associated with it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Nevermind
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Yes Please
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ServiceItemDeleteDialog;
