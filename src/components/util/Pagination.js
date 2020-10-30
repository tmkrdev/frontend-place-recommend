import React from 'react';
import PropTypes from 'prop-types';
import PaginationDot from './PaginationDot';

const styles = {
    root: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        display: 'flex',
        flexDirection: 'row'
    }
};

const Pagination = (props) => {

  const handleClick = (event, index) => {
        props.onChangeIndex(index);
    };

    const {index, dots} = props;

    const children = [];

    for (let i = 0; i < dots; i += 1) {
        children.push(
            <PaginationDot
              key={i}
              index={i}
              active={i === index}
              onClick={handleClick}/> );
    }
    if(dots <= 6){ // 길이가 5개 이하일 때만 보여주기 
        return <div style={styles.root}>{children}</div>;
    }
    else {
        return null;
    }
}

Pagination.propTypes = {
    dots: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired
};

export default Pagination;