import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    'zIndex':'10',
    position: 'fixed',
    top: '70%',
    'fontSize': '1.67em',
    color: '#f7f7de',
    'textShadow': '2px 2px 3px #1a5e25',
    right: '4%',
    'opacity':'0.7'

};

const NextButton = (props) => {

    const {checkEnds, index, onChangeIndex} = props;
    const handleClick = () => {
        (checkEnds - 1) === index
            ? onChangeIndex(index)
            : onChangeIndex(index + 1);
    };

    return (
        <div className="nextButton" style={styles}>
            <i className="fa fa-chevron-right" onClick={handleClick}></i>
        </div>
    );
}

NextButton.propTypes = {
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired,
    checkEnds: PropTypes.number.isRequired
};

export default NextButton;