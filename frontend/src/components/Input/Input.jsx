import React from 'react'
import './input.css'
import magnifyingGlass from '../../assets/icons/magnifying-glass-solid.svg'

const Input = ({
  hasLabel, // Tiene label o no
  labelTitle,
  isLabelCenter, // Está centrado o no
  type,
  nameProp,
  placeholder,
  isSearcheable, // Tiene lupa o no
  colorLabel, // Color del label
  value,
  isRequired, // Es requerido o no
  isDisabled, // Está habilitado o no
  onChange,
  limitNumber // Máximo de número para input number
}) => {

  const labelStyles = {
    color: colorLabel ? colorLabel : 'var(--skyblue-bg)',
    textAlign: isLabelCenter ? 'center' : ''
  }

  const inputStyles = {
    backgroundImage: isSearcheable ? `url(${magnifyingGlass})` : '',
    backgroundRepeat: isSearcheable ? `no-repeat` : '',
    backgroundSize: isSearcheable ? `18px` : '',
    backgroundPosition: isSearcheable ? '95% 50%' : '',
    backgroundColor: isDisabled ? 'var(--gray-bg)' : '',
    pointerEvents: isDisabled ? 'none' : '',
  }



  return (
    <>
      {/* INPUT TEXTAREA */}
      {
        type === 'textarea' &&
        <div className="input-container">
          {
            hasLabel && <label style={labelStyles} className="label-el">{ labelTitle }</label>
          }
          <textarea
            disabled={isDisabled ? true : false}
            className="input-el-textarea"
            name={nameProp ? nameProp : ''}
            value={value ? value : ''}
            onChange={onChange}
            placeholder={placeholder}
            style={inputStyles}
            required={isRequired ? true : false}
          />
        </div>
      }
      {/* INPUT TEXT */}
      {
        (!type || type === 'text') &&
          <div className="input-container">
          {
            hasLabel && <label style={labelStyles} className="label-el">{ labelTitle }</label>
          }
          <input
            value={value ? value : ''}
            disabled={isDisabled ? true : false}
            className="input-el"
            onChange={onChange}
            type={type} 
            name={nameProp ? nameProp : ''}
            placeholder={placeholder}
            style={inputStyles}
            required={isRequired ? true : false}
          />
        </div>
      }
      {/* INPUT EMAIL */}
      {
        (type === 'email') &&
          <div className="input-container">
          {
            hasLabel && <label style={labelStyles} className="label-el">{ labelTitle }</label>
          }
          <input
            value={value ? value : ''}
            disabled={isDisabled ? true : false}
            className="input-el"
            onChange={onChange}
            type={type} 
            name={nameProp ? nameProp : ''}
            placeholder={placeholder}
            style={inputStyles}
            required={isRequired ? true : false}
            title='No puede usar símbolos.'
          />
        </div>
      }
      {/* INPUT PASSWORD */}
      {
        (type === 'password') &&
          <div className="input-container">
          {
            hasLabel && <label style={labelStyles} className="label-el">{ labelTitle }</label>
          }
          <input
            value={value ? value : ''}
            disabled={isDisabled ? true : false}
            className="input-el"
            onChange={onChange}
            type={type} 
            name={nameProp ? nameProp : ''}
            placeholder={placeholder}
            style={inputStyles}
            required={isRequired ? true : false}
          />
        </div>
      }
      {/* INPUT NUMBER */}
      {
        (type === 'number') &&
          <div className="input-container">
          {
            hasLabel && <label style={labelStyles} className="label-el">{ labelTitle }</label>
          }
          <input
            value={value ? value : ''}
            disabled={isDisabled ? true : false}
            className="input-el"
            onChange={onChange}
            type={type} 
            name={nameProp ? nameProp : ''}
            placeholder={placeholder}
            style={inputStyles}
            min={0}
            max={limitNumber ? limitNumber : null}
            required={isRequired ? true : false}
          />
        </div>
      }
      {/* INPUT TIME */}
      {
        (type === 'time') &&
          <div className="input-container">
          {
            hasLabel && <label style={labelStyles} className="label-el">{ labelTitle }</label>
          }
          <input
            value={value ? value : ''}
            disabled={isDisabled ? true : false}
            className="input-el"
            onChange={onChange}
            type={type} 
            name={nameProp ? nameProp : ''}
            placeholder={placeholder}
            style={inputStyles}
            required={isRequired ? true : false}
          />
        </div>
      }
      {/* INPUT DATE */}
      {
        (type === 'date') &&
          <div className="input-container">
          {
            hasLabel && <label style={labelStyles} className="label-el">{ labelTitle }</label>
          }
          <input
            value={value ? value : ''}
            disabled={isDisabled ? true : false}
            className="input-el"
            onChange={onChange}
            type={type} 
            name={nameProp ? nameProp : ''}
            placeholder={placeholder}
            style={inputStyles}
            required={isRequired ? true : false}
          />
        </div>
      }
    </>
  )
}

export default Input