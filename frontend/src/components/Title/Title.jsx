import React from 'react'
import './title.css'

const Title = ({
  title,
  margin,
  isBold,
  textColor,
}) => {
  
  const divTitleStyles = {
    margin: margin ? margin : '0',
  };

  const titleStyle = {
    color: textColor ? textColor :'',
    fontWeight: isBold ? 'bold' : ''
  }

  return (
    <div className='headerTitle-container' style={divTitleStyles}>
      <h1 className='headerTitle' style={titleStyle}>{title}</h1>
    </div>
  )
}

export default Title