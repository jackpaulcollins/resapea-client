import React from 'react';
import MinusIcon from '../icons/minusIcon'

const InstructionsInputItem = (props) => {
  const { position, 
          length, 
          instruction, 
          removeInstructionFromInstructionsArray, 
          updateInstructionInInstructionsArray } = props;
  const maybeRenderDeleteIcon = () => {
    if (position === (length -1)) {
      return (
        <button className="ml-2 text-red-400"  onClick={(e) => removeInstructionFromInstructionsArray()}><MinusIcon/></button>
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
        defaultValue={instruction.content}
        onChange={(e) => updateInstructionInInstructionsArray(position, e.target.value)}
      />
      {maybeRenderDeleteIcon()}
    </div>
  )
}

const InstructionsInputList = (props) => {
  const { instructions, removeInstructionFromInstructionsArray, updateInstructionInInstructionsArray } = props;
  const renderInstructionsItems = () => {
    if (instructions) {
      return instructions.map((instruction, index) => {
        return <InstructionsInputItem
                  key={index} 
                  position={index}
                  length={instructions.length}
                  instruction={instruction}
                  removeInstructionFromInstructionsArray={removeInstructionFromInstructionsArray}
                  updateInstructionInInstructionsArray={updateInstructionInInstructionsArray}
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