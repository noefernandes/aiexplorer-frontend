import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';

const animatedComponents = makeAnimated();

const customStyles = {
    option: (provided) => ({
        ...provided,
        borderBottom: 'black',
        color: 'black',
    }),
    control: (styles, state) => ({
        ...styles,
        height: 'auto',
        backgroundColor: state.isSelected ? state.data.value.color : '#FFF',
        fontSize: 20,
        textAlign: 'left',
    }),
    multiValue: (styles, state) => {
        return ({
            ...styles,
            backgroundColor: state.data.value.color,
            color: '#FFF',
            height: 30
        })
    },
    multiValueLabel: (styles) => ({
        ...styles,
        color: '#FFF',
    }),
    multiValueRemove: (styles, state) => {
        const color = chroma(state.data.value.color);
        return ({
            ...styles,
            color: '#FFF',
            ':hover': {
                backgroundColor: '#ff3045',
                color: '#FFF',
            },
        })
    }
}

const MultiSelect = (props) => {

    const handleChange = (selectedOption) => {
        console.log(selectedOption)
        props.setSelectedTags(selectedOption);
        props.setAitool({
            ...props.aitool,
            tags: selectedOption.map(tag => tag.value)
        })
    };

    return <Select
        defaultValue={props.selectedTags}
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