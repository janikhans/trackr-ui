import React, { Component } from 'react';
import organizationsApi from '../../services/organizations'
import ErrorsContainer from '../shared/ErrorsContainer'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';


class RideCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicleId: '',
      name: '',
      startingOdometer: '',
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

  handleSelect = (name) => (event) => {
    this.setState({[name]: event.target.value });
  };

  handleSubmit = (e) => {
    const ride = {
      vehicle_id: this.state.vehicleId,
      name: this.state.name,
      starting_odometer: this.state.startingOdometer
    }

    organizationsApi.createOrganizationRide(this.props.organization.id, ride)
    .then(response => {
      this.props.addOrganizationRide(response.data)
      this.resetForm()
    })
    .catch(error => {
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  resetForm = () => {
    this.setState({
      open: false,
      vehicleId: null,
      name: '',
      startingOdometer: '',
      errors: null
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" className="pull-right" aria-label="add" onClick={this.handleClickOpen}>
          Add
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Add to Garage</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`By adding a new ride to your garage, you'll be able to track mileage, get
              updates on maintenance and other goodness.`}
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <FormControl style={{minWidth: '100%'}}>
              <InputLabel htmlFor="vehicle-id">Vehicle</InputLabel>
              <Select value={this.state.vehicleId}
                autoWidth
                placeholder="Select Vehicle"
                name="vehicleId"
                onChange={this.handleSelect('vehicleId')}
                input={<Input id="vehicle-id" />}
              >
                {this.props.vehicles.map((vehicle) => {
                  return (
                    <MenuItem key={vehicle.id} value={vehicle.id}>{vehicle.year + " " + vehicle.make + " " + vehicle.model}</MenuItem>
                  )}
                )}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Ride Name"
              type="text"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              name="startingOdometer"
              label="Starting Odometer"
              type="number"
              fullWidth
              value={this.state.startingOdometer}
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
    );
  }
}

export default RideCreateDialog;
