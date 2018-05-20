import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 'auto',
    padding: '30px'
}

const NewWorkout = (props) => {
    let addBtnDisabled = true
    if(props.workoutDate){
        addBtnDisabled = false
    }

    if (props.shouldDisplay) {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={4} mdOffset={4}>
                        <Paper style={style} zDepth={3}>
                            <DatePicker hintText="Pick a date"  onChange={props.workoutDateChanged} autoOk={true}/>
                            <RaisedButton label="Add Workout" disabled={addBtnDisabled} primary={true} onClick={props.addNewWorkout}/>
                            <RaisedButton label="Cancel" secondary={true} onClick={props.cancelAddingNewWorkout} style={{float: 'right'}}/>
                        </Paper>
                    </Col>
                </Row>
            </Grid>
        );
    } else {
        return null;
    }
};

export default NewWorkout;