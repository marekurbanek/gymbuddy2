import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
const NewSetForm = (props) => {
    return (
        <Row between="xs">
            <Col xs={3}>
                <IconButton onClick={props.saveNewSet} tooltip="Save set" style={{ padding: '0', marginTop: '-15px', marginLeft: '22px' }}>
                    <SaveIcon />
                </IconButton>
            </Col>
            <Col xs={3}>
                <input className="new-set-input" type="text" value={props.weight} onChange={props.weightChanged} />
            </Col>
            <Col xs={3}>
                <input className="new-set-input" type="text" value={props.repetitions} onChange={props.repetitionsChanged} />
            </Col>
            <Col xs={3}>
                <input className="new-set-input" type="text" value={props.comments} onChange={props.commentsChanged} />
            </Col>
        </Row>
    );
}

export default NewSetForm;