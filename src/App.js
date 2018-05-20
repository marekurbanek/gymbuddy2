import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyWorkouts from './components/MyWorkouts/MyWorkouts';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Wrap from './components/hoc/Wrap';
class App extends Component {
  state = {
    sideBarOpen: false,
    showingNewWorkoutForm: false,
  }
  sideBarToggle = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

  handleClose = () => this.setState({ sideBarOpen: false });

  showNewWorkoutForm = () => this.setState({ showingNewWorkoutForm: true, sideBarOpen: false })

  hideNewWorkoutForm = () => this.setState({ showingNewWorkoutForm: false })

  render() {
    return (
      <MuiThemeProvider>
        <Wrap>
          <AppBar title="GymBuddy"
            onLeftIconButtonClick={this.sideBarToggle} />
          <Drawer
            docked={false}
            width={300}
            open={this.state.sideBarOpen}
            onRequestChange={(sideBarOpen) => this.setState({ sideBarOpen })}
          >
            <MenuItem onClick={this.showNewWorkoutForm}>Add new workout</MenuItem>
          </Drawer>
          <MyWorkouts sideBarOpen={this.state.sideBarOpen}
            showingNewWorkoutForm={this.state.showingNewWorkoutForm}
            hideNewWorkoutForm={this.hideNewWorkoutForm} />
        </Wrap>
      </MuiThemeProvider>
    );
  }
}

export default App;
