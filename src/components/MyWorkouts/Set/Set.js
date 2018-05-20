import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

const Set = (props) => {
    let removeSetBtn = props.setIndex+1
    if(props.isEditing){
        removeSetBtn = <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => props.removeSet(props.workoutId, props.exerciseId, props.setId)}>-
                       </button>
    }
    return(
        <Row between="xs" className="text-center">
            <Col xs={3}>{removeSetBtn}</Col>
            <Col xs={3}>{props.weight}</Col>
            <Col xs={3}>{props.repetitions}</Col>
            <Col xs={3}>{props.comment}</Col>
        </Row>
    );
}

export default Set;