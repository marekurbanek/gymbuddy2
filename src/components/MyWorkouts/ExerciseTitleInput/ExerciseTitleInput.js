import React from 'react';
import Input from '../../Input/Input';
import classes from './ExerciseTitleInput.css';

const ExerciseTitleInput = (props) => {
    return (
        <div className="row">
                    <div className="col-md-10">
                        <Input
                            type='input'
                            value={props.exerciseTitle}
                            changed={props.exerciseTitleChanged}
                            placeholder="Exercise name">
                        </Input>
                    </div>
                    <div className="col-md-2">
                        <button
                            className={"btn btn-success " + classes.AddTitleBtn}
                            onClick={() => props.saveExerciseTitle(props.workoutId, props.exerciseId)}>+
                    </button>
                    </div>
                </div>
    )
}

export default ExerciseTitleInput;