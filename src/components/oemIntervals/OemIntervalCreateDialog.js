import React, { Component } from 'react'
import vehiclesApi from '../../services/vehicles'

import ErrorsContainer from '../shared/ErrorsContainer'
import UnitsSelect from '../shared/UnitsSelect'
import ServiceItemSelect from '../shared/ServiceItemSelect'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class OemIntervalCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceItemId: '',
      units: '',
      distance: '',
      errors: null,
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const oemInterval = {
      service_item_id: this.state.serviceItemId,
      units: this.state.units,
      distance: this.state.distance,
    }
    vehiclesApi.createVehicleOemInterval(this.props.vehicle.id, oemInterval)
    .then(response => {
      this.props.addNewOemInterval(response.data)
      this.resetForm()
    })
    .catch(error => {
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  updateUnits = (units) => {
    this.setState({ units: units })
  }

  updateServiceItem = (serviceItem) => {
    this.setState({
      serviceItemId: serviceItem.id,
      units: serviceItem.units,
      distance: serviceItem.distance
    })
  }

  resetForm = () => {
    this.setState({
      serviceItemId: '',
      units: '',
      distance: '',
      errors: null,
      open: false
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" aria-label="add" onClick={this.handleClickOpen}>
          Add
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Oem Interval</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add an OEM interval for this vehicle.
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <ServiceItemSelect
              serviceItemId={this.state.serviceItemId}
              updateServiceItem={this.updateServiceItem}
              serviceItems={this.props.serviceItems}
            />
            <UnitsSelect units={this.state.units} updateUnits={this.updateUnits}/>
            <TextField
              margin="dense"
              name="distance"
              label="Distance"
              type="text"
              fullWidth
              value={this.state.distance}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default OemIntervalCreateDialog;
