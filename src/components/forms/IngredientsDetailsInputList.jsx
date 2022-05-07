import React from "react";
import MinusIcon from "../icons/minusIcon";

const IngredientsInputItem = (props) => {
  const {
    position,
    length,
    removeIngredientFromIngredientsArray,
    updateIngredientInIngredientsArray,
    ingredient,
  } = props;
  const maybeRenderDeleteIcon = () => {
    if (position === length - 1) {
      return (
        <button
          className="ml-2 text-red-400"
          onClick={(e) => removeIngredientFromIngredientsArray()}
        >
          <MinusIcon />
        </button>
      );
    }
  };

  return (
    <div className="mt-1 rounded-md flex-col w-full">
      <div className="flex flex-row">
        <input
          required
          type="number"
          min="0"
          name="measurement_unit_quantity"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-20 mr-1 sm:text-sm border-gray-300 rounded-md"
          defaultValue={ingredient.measurement_unit_quantity}
          onChange={(e) =>
            updateIngredientInIngredientsArray(
              "measurement_unit_quantity",
              position,
              e.target.value
            )
          }
        />
        <div className="block inset-y-0 right-0 flex items-center">
          <label
            htmlFor="measurementUnitType"
            className="sr-only block inset-y-0 right-0 flex items-center"
          >
            type
          </label>
          <select
            name="measurement_unit_type"
            className="focus:ring-indigo-500 
                       focus:border-indigo-500 
                       w-30 
                       h-full 
                       py-0 
                       border-gray-300 
                       bg-transparent 
                       text-black-500 
                       sm:text-sm 
                       rounded-md
                       ml-1
                       mr-1
                       "
            value={ingredient.measurement_unit_type}
            onChange={(e) =>
              updateIngredientInIngredientsArray(
                "measurement_unit_type",
                position,
                e.target.value
              )
            }
            required
          >
            <option value=""></option>
            <option value="tbspn">tbsp</option>
            <option value="cup">cup</option>
            <option value="tspn">tspn</option>
            <option value="pinch">pinch</option>
            <option value="ml">ml</option>
            <option value="g">g</option>
            <option value="whole">whole</option>
            <option value="ounce">ounce</option>
            <option value="pound">pound</option>
          </select>
        </div>
        <input
          required
          type="text"
          id="ingredient_name"
          className="focus:ring-indigo-500 
                     focus:border-indigo-500 
                     block 
                     w-80
                     sm:text-sm 
                     border-gray-300 
                     rounded-md
                     ml-1
                     "
          defaultValue={ingredient.ingredient_name}
          onChange={(e) =>
            updateIngredientInIngredientsArray(
              "ingredient_name",
              position,
              e.target.value
            )
          }
        />
        {maybeRenderDeleteIcon()}
      </div>
    </div>
  );
};

const IngredientsDetailsInputList = (props) => {
  const {
    ingredients,
    removeIngredientFromIngredientsArray,
    updateIngredientInIngredientsArray,
  } = props;
  const renderInstructionsItems = () => {
    if (ingredients) {
      return ingredients.map((ingredient, index) => {
        return (
          <IngredientsInputItem
            key={index}
            position={index}
            length={ingredients.length}
            ingredient={ingredient}
            removeIngredientFromIngredientsArray={
              removeIngredientFromIngredientsArray
            }
            updateIngredientInIngredientsArray={
              updateIngredientInIngredientsArray
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

export default IngredientsDetailsInputList;
