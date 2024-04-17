import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const customStyles = {
    /* option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
    }),
    control: (provided, state) => ({
        ...provided,
        height: 'auto',
        backgroundColor: '#f2f2f2',
        fontSize: 20,
        textAlign: 'left',
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: '#808080',
        color: 'white',
        height: 30
    }), */
}

const MultiSelect = (props) => {

    const handleChange = (selectedOption) => {
        props.setSelectedTags(selectedOption);
    };

    return <Select
        defaultValue={[]}
        components={animatedComponents}
        isMulti
        options={props.options}
        styles={customStyles}
        className="select"
        placeholder='Tipo...'
        onChange={(item) => handleChange(item)}
    />
}

export default MultiSelect;