import React, { Component } from 'react';
import Exercise from '../Exercise/Exercise';
import { connect } from 'react-redux';
import * as actionTypes from '../../../actions/actions';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Paper from 'material-ui/Paper/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/done';
import DeleteWorkout from 'material-ui/svg-icons/content/clear';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class Workout extends Component {
    state = {
        showingNewExercise: false,
        open: false
    }

    openNewExerciseForm = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            showingNewExercise: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            showingNewExercise: false,
        });
    };

    addExerciseWithTitle = (workoutId) => {
        this.handleRequestClose();
        this.props.addExerciseWithTitle(workoutId)
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        let allExercises = this.props.exercises.map((exercise, index) => {
            return (
                <Exercise
                    key={exercise.id}
                    name={exercise.name}
                    sets={exercise.sets}
                    exerciseId={exercise.id}
                    workoutId={this.props.workoutId}
                    onMouseEnter={this.props.onMouseEnter}
                    onMouseLeave={this.props.onMouseLeave}
                    showingNewSet={this.props.showingNewSet}
                    addNewSet={this.props.addNewSet}
                    saveExerciseTitle={this.props.saveExerciseTitle}
                    exerciseTitle={exercise.name}
                    exerciseTitleChanged={this.props.exerciseTitleChanged}
                />
            );
        });

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={() => this.props.removeWorkout(this.props.workoutId)}
            />,
        ];

        let workoutName = null
        if(this.props.date){
            workoutName = this.props.date.toLocaleString();
            if(workoutName.length > 9){
                workoutName = workoutName.slice(0, workoutName.indexOf(','))
            }
        }

        return (
            <Paper zDepth={2} style={{ marginBottom: '30px', padding: '20px' }}>
                <Grid fluid >
                    <Row>
                        <Col xs={3}>
                            <FloatingActionButton mini={true} onClick={this.openNewExerciseForm} style={{ float: 'left' }}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </Col>
                        <Col xs={7} className="text-center"><p style={{fontSize: '130%'}}>{workoutName}</p></Col>
                        <Col xs={2}>
                            <FloatingActionButton onClick={this.handleOpen} mini={true} backgroundColor="#DD2C00" style={{ float: 'right' }}>
                                <DeleteWorkout />
                            </FloatingActionButton>
                        </Col>
                        <Dialog
                            title="Are you sure you want to delete workout?"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                        </Dialog>
                        <Popover
                            open={this.state.showingNewExercise}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            onRequestClose={this.handleRequestClose}
                            style={{ padding: '10px' }}
                        >
                            <TextField
                                hintText="Exercise Name"
                                onChange={this.props.exerciseTitleChanged}
                            />
                            <IconButton onClick={() => this.addExerciseWithTitle(this.props.workoutId)}>
                                <ActionHome />
                            </IconButton>
                        </Popover>
                    </Row>
                    <Row>
                        {allExercises}
                    </Row>
                </Grid>
            </Paper>
        );
    }

};

const mapStateToProps = state => {
    return {
        workouts: state.workouts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        exerciseTitleChanged: (event) => dispatch({
            type: actionTypes.TITLE_CHANGED,
            newTitle: event.target.value
        }),
        addExercise: (id) => dispatch({
            type: actionTypes.ADD_EXERCISE,
            workoutId: id
        }),

        addSet: (workoutId, exerciseId) => dispatch({
            type: actionTypes.ADD_SET,
            workoutId: workoutId,
            exerciseId: exerciseId
        }),
        removeWorkout: (workoutId) => dispatch({
            type: actionTypes.REMOVE_WORKOUT,
            workoutId: workoutId
        }),
        addExerciseWithTitle: (workoutId) => dispatch({
            type: actionTypes.ADD_EXERCISE_WITH_TITLE,
            workoutId: workoutId
        })
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Workout);