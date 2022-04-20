import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const DropDown = (props) => {
  const { options, isMulti, handleChange , defaultValue } = props;
  const [ defaultValueFromProps, setdefaultValueFromProps ] = useState(undefined)

  useEffect(() => {
    if (defaultValue) {
      setdefaultValueFromProps(defaultValue)
    }
  }, [props])
  
  const maybeRenderDefaultValue = () => {
    if (defaultValue) {
      return { label: defaultValueFromProps, value: defaultValueFromProps }
    }
  }

  const renderTags = () => {
    if (defaultValue && isMulti) {
      console.log(isMulti, defaultValue)
      return defaultValue.map((d) => {
        return { label: d, value: d }
      })
    }
  }

  return (
    <div>
      <Select 
        width='200px'
        menuColor='red'
        isMulti={isMulti} 
        options={options} 
        value={isMulti ? renderTags() : maybeRenderDefaultValue()}
        clearIndicator
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export default DropDown;