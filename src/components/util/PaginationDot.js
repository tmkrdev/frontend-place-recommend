import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    root: {
        height: 18,
        width: 18,
        cursor: 'pointer',
        border: 0,
        background: 'none',
        padding: 0
    },
    dot: {
        backgroundColor: '#e4e6e7',
        height: 12,
        width: 12,
        borderRadius: 6,
        margin: 3
    },
    active: {
        backgroundColor: '#319fd6'
    }
};

const PaginationDot = (props) => {

    const {index} = props;
    const handleClick = (e) => {
        props.onClick(e, index);
    };

    const {active} = props;

    let styleDot;

    if (active) {
        styleDot = Object.assign({}, styles.dot, styles.active);
    } else {
        styleDot = styles.dot;
    }

    return (
        <button style={styles.root} onClick={handleClick}>
            <div style={styleDot}/>
        </button>
    );
}

PaginationDot.propTypes = {
    active: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default PaginationDot;