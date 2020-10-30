import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    'zIndex':'10',
    position: 'fixed',
    top: '70%',
    'fontSize': '1.67em',
    color: '#f7f7de',
    'textShadow': '2px 2px 3px #1a5e25',
    left: '4%',
    'opacity':'0.7'

};

const PrevButton = (props) => {

    const {index, onChangeIndex} = props;
    const handleClick = () => {
        0 === index
            ? onChangeIndex(index)
            : onChangeIndex(index - 1);
    };

    return (
        <div className="nextButton" style={styles} onClick={handleClick}>
            <i className="fa fa-chevron-left"></i>
        </div>
    );
}

PrevButton.propTypes = {
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired
};

export default PrevButton;