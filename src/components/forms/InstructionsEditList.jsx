import React, { useEffect } from 'react';
import MinusIcon from '../icons/minusIcon'
import { API_ROOT } from '../../apiRoot';

const InstructionsEditItem = (props) => {

  async function handleInstructionDelete(e, instruction) {
    e.preventDefault();

    const body = { 
      recipe: {
        instruction_id: instruction.id
      }
    }

    fetch(`${API_ROOT}/api/destroy_instruction`, {
      headers: {'Content-Type': 'application/json'},
      method: 'delete',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        props.removeInstructionFromInstructionsArray()
      }
    });
  }

  const maybeRenderDeleteIcon = () => {
    if (props.position === (props.length -1)) {
      //since only an instruction with an id
      //requires AJAX we will only remove the JS
      //if no id present
      if (props.instruction.id) {
        return (
          <button className="ml-2 text-red-400"  onClick={(e) => handleInstructionDelete(e, props.instruction)}><MinusIcon/></button>
        )
      } else {
        return (
          <button className="ml-2 text-red-400"  onClick={(e) => props.removeInstructionFromInstructionsArray()}><MinusIcon/></button>
        )
      }
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

const InstructionsEditList = (props) => {
  const renderInstructionsItems = () => {
    if (props.instructions) {
      props.instructions.sort((a, b) => {
        if (a.position > b.position) {
          return 1
        } else {
          return -1
        }
      })
      return props.instructions.map((instruction, index) => {
        return <InstructionsEditItem
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

export default InstructionsEditList;