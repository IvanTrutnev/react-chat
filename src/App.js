import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';

class App extends Component {
  render() {
    return (
      <div>
         <Button variant="contained" color="primary">
            Hello World
        </Button>
        <NotificationsIcon />
      </div>
    );
  }
}

export default App;
