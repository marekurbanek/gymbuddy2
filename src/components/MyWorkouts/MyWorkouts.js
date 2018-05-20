import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './MyWorkouts.css';
import Workout from './Workout/Workout';
import NewWorkout from './Forms/NewWorkout';
import * as actionTypes from '../../actions/actions';

import { Grid, Row, Col } from 'react-flexbox-grid';



class MyWorkouts extends Component {
    state = {
    }

    addNewWorkoutAndHideForm = () => {
        this.props.hideNewWorkoutForm();
        this.props.addNewWorkout(this.props.workoutName, this.props.workoutDate);
        this.props.clearWorkoutInputs();
    }

    cancelAddingNewWorkout = () =>{
        this.props.hideNewWorkoutForm();
    }

    render() {
        
        const allWorkouts = this.props.workouts.map(workout => {
            return (
                <Workout
                    key={workout.id}
                    date={workout.date}
                    exercises={workout.exercises}
                    workoutId={workout.id}
                    addExercise={() => this.props.addExercise(workout.id)}
                />
            );
        });
        allWorkouts.reverse()
        return (

            <Grid fluid>
                <Row>
                    <Col md={10} sm={12} mdOffset={1}>
                        <h2 style={{textAlign: 'center'}}>My Workouts</h2>
                        <NewWorkout
                            shouldDisplay={this.props.showingNewWorkoutForm}
                            workoutNameChanged={this.props.workoutNameChanged}
                            workoutDateChanged={this.props.workoutDateChanged}
                            workoutName={this.props.workoutName}
                            workoutDate={this.props.workoutDate}
                            addNewWorkout={this.addNewWorkoutAndHideForm}
                            cancelAddingNewWorkout={this.cancelAddingNewWorkout}
                        />
                        <div className={classes.MyWorkouts} style={{marginTop: '20px'}}>
                            {allWorkouts}
                        </div>
                    </Col>
                </Row>
            </Grid>



        );
    }
};

const mapStateToProps = state => {
    return {
        workouts: state.workouts,
        workoutDate: state.workoutDate,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addNewWorkout: (name, date) => dispatch({
            type: actionTypes.ADD_WORKOUT,
            name: name,
            date: date
        }),
        workoutDateChanged: (event, date) => dispatch({
            type: actionTypes.WORKOUT_DATE_CHANGED,
            value: date
        }),
        clearWorkoutInputs: () => dispatch({
            type: actionTypes.CLEAR_WORKOUT_INPUT
        }),
        removeWorkout: (workoutId) => dispatch({
            type: actionTypes.REMOVE_WORKOUT,
            workoutId: workoutId
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWorkouts);