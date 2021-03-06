import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

class ServiceRow extends Component {
  render () {
    return (
      <TableRow>
        <TableCell>
          <Link className="no-decoration" to={'/service-items/' + this.props.serviceItem.id}>
            {this.props.serviceItem.name}
          </Link>
        </TableCell>
        <TableCell numeric>
          <Moment
            date={this.props.service.date}
            format="MM/DD/YYYY"
          />
        </TableCell>
        <TableCell numeric>{this.props.service.odometer}</TableCell>
        <TableCell numeric>{this.props.service.price}</TableCell>
        <TableCell numeric>{this.props.service.note}</TableCell>
        <TableCell numeric>
          <Button dense color="primary">Edit</Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default ServiceRow;
