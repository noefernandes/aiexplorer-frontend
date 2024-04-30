import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';

const animatedComponents = makeAnimated();

const MultiSelect = (props) => {

    const customStyles = {
        option: (provided) => ({
            ...provided,
            borderBottom: 'black',
            color: 'black',
        }),
        control: (styles, state) => ({
            ...styles,
            textAlign: 'left',
            boxShadow: 'none',
            borderColor: props.validated & props.selectedTags.length === 0 ? '#dc3545' : 'rgb(204, 204, 204)',
            '&:hover': {
                borderColor: props.validated & props.selectedTags.length === 0 ? '#dc3545' : 'rgb(204, 204, 204)',
            },
            '&:focus': {
                borderColor: props.validated & props.selectedTags.length === 0 ? '#dc3545' : 'rgb(204, 204, 204)',
            },
        }),
        multiValue: (styles, state) => {
            return ({
                ...styles,
                backgroundColor: state.data.value.color,
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

    const handleChange = (selectedOption) => {
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
        placeholder=''
        onChange={(item) => handleChange(item)}
    />
}

export default MultiSelect;