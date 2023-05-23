import React, { useState } from 'react';
import { useEffect } from 'react';
import './checkbox.css';

const Checkbox = ({
    formType, // IMPORTANTE: Si es formulario de creación o edición
    onlyCheckboxes, // IMPORTANTE: Solo checkboxes (sino no aparece nada)
    withText, // IMPORTANTE: Checkbox y text (sino no aparece nada)
    nameProp, // IMPORTANTE: Es el name y es necesaria para diferenciar los inputs checkbox
    options, // IMPORTANTE: Las opciones
    onChange, // IMPORTANTE: Para el input texto (withText)
    onChangeOnlyBoxes, // IMPORTANTE: Para cambio de checkbox (onlyCheckboes)
    colorLabel,
    hasLabel, // Si tiene o no label
    labelTitle,
    isLabelCenter, // Label centrado
    value, // Para el input texto o cuando son varios checkbox que envían el texto de su label
    placeholder, // Para el input texto
    isRequired,
    isDisabled
}) => {
    
    const [activeOptions, setActiveOptions] = useState(false);
    const [checkValue, setCheckValue] = useState(false);

    useEffect(() => {
        if(formType === 'new') {
            if(value === undefined || value === null) setActiveOptions(true);
            if(value !== undefined || value!== null) setCheckValue(value);
        } else {
            if(value === '' || value === null) handleYesOrNo(value === '' ? 'yes' : 'no')
            if(value !== '' || value!== null) handleYesOrNo(value !== '' ? 'yes' : 'no')
        }
    }, [value, formType])

    const handleText = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
    }

    const handleYesOrNo = (value) => {
        if(value === 'yes') {
            setActiveOptions(true);
        } else if(value === 'no') {
            setActiveOptions(false);
        } else {}
    }

    const changeCheckValue = (value) => {
        onChangeOnlyBoxes(value);
        setCheckValue(value)
    }

    const labelStyles = {
        color: colorLabel ? colorLabel : 'var(--skyblue-bg)',
        textAlign: isLabelCenter ? 'center' : ''
    }
    const inputStyles = {
        backgroundColor: isDisabled ? 'var(--gray-bg)' : '',
        pointerEvents: isDisabled ? 'none' : '',
    }

    return (
        <>
        {/* CHECKBOXES BOOLEANOS QUE ACTIVAN UN INPUT */}
        {
            withText && 
            <div className="checkboxesAndText">
                { // Si tiene label
                    hasLabel && <label style={labelStyles} className="label-checkbox">{ labelTitle }</label>
                }
                <div className="checkboxQuestion">
                    { // Si debe desactivar el input al ser el valor "no"
                        <div className="yesOrNoCheckboxes">
                            <label className='labelWithText'>{withText}</label>
                            <div className="yesOrNoCheckBox">
                                <label className='labelYesOrNo'> Sí </label>
                                <input
                                    style={inputStyles} 
                                    name={`yesOrNo` + nameProp} 
                                    type="radio" 
                                    checked={activeOptions}
                                    onChange={() => handleYesOrNo('yes')} 
                                    className="checkbox-input" 
                                    required={isRequired ? true : false}
                                />
                            </div>
                            <div className="yesOrNoCheckBox">
                                <label className='labelYesOrNo'> No </label>
                                <input
                                    style={inputStyles} 
                                    name={`yesOrNo` + nameProp} 
                                    checked={!activeOptions}
                                    type="radio" 
                                    onChange={() => handleYesOrNo('no')} 
                                    className="checkbox-input" 
                                    required={isRequired ? true : false}
                                />
                            </div>
                        </div>
                    }
                    <input
                        style={inputStyles} 
                        className={`text-for-checkbox ${!activeOptions && 'disabled'}`} 
                        placeholder={placeholder} 
                        type='text' 
                        value={activeOptions ? value : ''} 
                        onChange={handleText} 
                        required={isRequired ? true : false}
                    />
                </div>
            </div>
        }

        {/* SOLO CHECKBOXES */}
        {
            onlyCheckboxes &&
            <div className="checkbox">
                <label style={labelStyles} className="label-checkbox">{ labelTitle }</label>
                <div className='option-box'>
                    {
                        options.map((option, idx) => {
                            return <label key={option} className="checkbox-label">
                                <span className="checkbox-text">{option}</span>
                                <input
                                    style={inputStyles}
                                    type={'radio'}
                                    name={`${nameProp}`}
                                    checked={option === checkValue}
                                    onChange={() => changeCheckValue(option)}
                                    className="checkbox-input"
                                />
                            </label>
                        })
                    }
                </div>
            </div>
        }
        </>
    );
};

export default Checkbox;