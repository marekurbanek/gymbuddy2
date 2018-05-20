import React, { Component } from 'react';
import Set from '../Set/Set';
import { connect } from 'react-redux';
import * as actionTypes from '../../../actions/actions';
import { Col, Row } from 'react-flexbox-grid';

import Paper from 'material-ui/Paper/Paper';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import ModifyIcon from 'material-ui/svg-icons/action/settings';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import NewSetForm from '../NewSetForm/NewSetForm';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class Exercise extends Component {
    state = {
        editing: false,
        addingNewSet: false,
        open: false
    }

    editExercise = () => {
        this.setState({ editing: !this.state.editing })
    }

    showNewSetForm = () => {
        this.setState({ addingNewSet: true })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    removeSet = (wId, exId, setId) => {
        this.props.removeSet(wId, exId, setId)
        this.setState({editing: false})
    }


    render() {
        let newSetForm = null;
        let allSets = null;
        let newSetBtn = null;

        if (this.props.newSet.isVisible && this.props.workoutId === this.props.newSet.workoutId && this.props.exerciseId === this.props.newSet.exerciseId) {
            newSetForm = <NewSetForm
                weight={this.props.newSet.weight}
                weightChanged={this.props.weightChanged}
                repetitions={this.props.newSet.repetitions}
                repetitionsChanged={this.props.repetitionsChanged}
                comments={this.props.newSet.comments}
                commentsChanged={this.props.commentsChanged}
                saveNewSet={this.props.saveNewSet} />
        }

        if (this.props.sets) {
            allSets = this.props.sets.map((set, index) => {
                return (
                    <Set
                        key={set.id}
                        setIndex={index}
                        setId={set.id}
                        weight={set.weight}
                        repetitions={set.repetitions}
                        comment={set.comment}
                        workoutId={this.props.workoutId}
                        exerciseId={this.props.exerciseId}
                        removeSet={this.removeSet}
                        isEditing={this.state.editing}
                    />
                );
            });
        };

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={() => this.props.removeExercise(this.props.workoutId, this.props.exerciseId)}
            />,
        ];

        

        return (
            <Col md={4} sm={12} style={{ marginBottom: '10px' }}>
                <Paper zDepth={3} style={{ padding: '15px 5px' }}>
                    <Row className="text-center">
                        <IconButton onClick={this.editExercise} tooltip="Modify exercise" className="exercise-icon" style={{ float: 'left', padding: 0 }}>
                            <ModifyIcon className="exercise-icon" />
                        </IconButton>
                        <p style={{ margin: 'auto', textDecoration: 'underline', fontSize: '120%'}}>{this.props.name}</p>
                        <IconButton onClick={this.handleOpen} tooltip="Delete exercise" className="exercise-icon" style={{ float: 'right', padding: 0, marginRight: '10px'}}>
                            <DeleteIcon className="exercise-icon" />
                        </IconButton>
                    </Row>
                    <Dialog
                        title="Are you sure you want to delete exercise?"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                    </Dialog>
                    <Row between="xs" className="text-center">
                        <Col xs={3} >No.</Col>
                        <Col xs={3} >Weight</Col>
                        <Col xs={3} >Reps.</Col>
                        <Col xs={3} >Info</Col>
                    </Row>

                    {allSets}

                    {newSetForm}
                    <Row>
                        <Col sm={2} >
                            <IconButton onClick={() => this.props.showNewSetForm(this.props.workoutId, this.props.exerciseId)} tooltip="Add new set" className="exercise-icon" style={{ float: 'left' }}>
                                <AddIcon className="exercise-icon" />
                            </IconButton>
                        </Col>
                    </Row>
                    {newSetBtn}
                </Paper>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        newSet: state.newSet
    }
}

const mapDispatchToProps = dispatch => {
    return {
        weightChanged: event => dispatch({
            type: actionTypes.WEIGHT_CHANGED,
            newWeight: event.target.value
        }),
        repetitionsChanged: event => dispatch({
            type: actionTypes.REPETITIONS_CHANGED,
            newRepetitions: event.target.value
        }),
        commentsChanged: event => dispatch({
            type: actionTypes.COMMENT_CHANGED,
            newComment: event.target.value
        }),
        showNewSetForm: (workoutId, exerciseId) => dispatch({
            type: actionTypes.SHOW_SET_FORM,
            workoutId: workoutId,
            exerciseId: exerciseId
        }),
        saveNewSet: () => dispatch({
            type: actionTypes.SAVE_NEW_SET
        }),
        removeExercise: (workoutId, exerciseId) => dispatch({
            type: actionTypes.REMOVE_EXERCISE,
            workoutId: workoutId,
            exerciseId: exerciseId
        }),
        removeSet: (workoutId, exerciseId, setId) => dispatch({
            type: actionTypes.REMOVE_SET,
            workoutId: workoutId,
            exerciseId: exerciseId,
            setId: setId
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);