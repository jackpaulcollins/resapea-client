import React from "react";
import MinusIcon from "../icons/minusIcon";
import { API_ROOT } from "../../apiRoot";

const InstructionsEditItem = (props) => {
  const {
    instruction,
    removeInstructionFromInstructionsArray,
    position,
    length,
    updateInstructionInInstructionsArray,
  } = props;
  async function handleInstructionDelete(e, instruction) {
    e.preventDefault();

    const body = {
      recipe: {
        instruction_id: instruction.id,
      },
    };

    fetch(`${API_ROOT}/api/destroy_instruction`, {
      headers: { "Content-Type": "application/json" },
      method: "delete",
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          removeInstructionFromInstructionsArray();
        }
      });
  }

  const maybeRenderDeleteIcon = () => {
    if (position === length - 1) {
      //since only an instruction with an id
      //requires AJAX we will only remove the JS
      //if no id present
      if (instruction.id) {
        return (
          <button
            className="ml-2 text-red-400"
            onClick={(e) => handleInstructionDelete(e, instruction)}
          >
            <MinusIcon />
          </button>
        );
      } else {
        return (
          <button
            className="ml-2 text-red-400"
            onClick={(e) => removeInstructionFromInstructionsArray()}
          >
            <MinusIcon />
          </button>
        );
      }
    }
  };

  return (
    <div className="mt-1 flex">
      <textarea
        required
        type="text"
        name="instruction"
        id="instruction"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-5/6 sm:text-sm border-gray-300 rounded-md"
        defaultValue={instruction.content}
        onChange={(e) =>
          updateInstructionInInstructionsArray(position, e.target.value)
        }
      />
      {maybeRenderDeleteIcon()}
    </div>
  );
};

const InstructionsEditList = (props) => {
  const {
    instructions,
    removeInstructionFromInstructionsArray,
    updateInstructionInInstructionsArray,
  } = props;
  const renderInstructionsItems = () => {
    if (instructions) {
      instructions.sort((a, b) => {
        if (a.position > b.position) {
          return 1;
        } else {
          return -1;
        }
      });
      return instructions.map((instruction, index) => {
        return (
          <InstructionsEditItem
            key={index}
            position={index}
            length={instructions.length}
            instruction={instruction}
            removeInstructionFromInstructionsArray={
              removeInstructionFromInstructionsArray
            }
            updateInstructionInInstructionsArray={
              updateInstructionInInstructionsArray
            }
          />
        );
      });
    } else {
      return "";
    }
  };

  return <div>{renderInstructionsItems()}</div>;
};

export default InstructionsEditList;
