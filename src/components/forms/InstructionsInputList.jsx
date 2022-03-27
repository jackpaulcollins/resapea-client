import React from 'react';
import MinusIcon from '../icons/minusIcon'

const InstructionsInputItem = (props) => {

  const maybeRenderDeleteIcon = () => {
    if (props.position === (props.length -1)) {
      return (
        <button className="ml-2 text-red-400"  onClick={(e) => props.removeInstructionFromInstructionsArray()}><MinusIcon/></button>
      )
    }
  }

  return (
    <div className="mt-1 flex">
      <input
        required
        type="text"
        name="instruction"
        id="instruction"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        defaultValue={props.instruction.content}
        onChange={(e) => props.updateInstructionInInstructionsArray(props.position, e.target.value)}
      />
      {maybeRenderDeleteIcon()}
    </div>
  )
}

const InstructionsInputList = (props) => {
  const renderInstructionsItems = () => {
    if (props.instructions) {
      return props.instructions.map((instruction, index) => {
        return <InstructionsInputItem
                  key={index} 
                  position={index}
                  length={props.instructions.length}
                  instruction={instruction}
                  removeInstructionFromInstructionsArray={props.removeInstructionFromInstructionsArray}
                  updateInstructionInInstructionsArray={props.updateInstructionInInstructionsArray}
                />;
      });
    } else {
      return ""
    }
  };

  return (
    <div>
      {renderInstructionsItems()}
    </div>
  )
}

export default InstructionsInputList;