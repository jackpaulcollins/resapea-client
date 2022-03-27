import React from 'react';
import MinusIcon from '../icons/minusIcon'
import { API_ROOT } from '../../apiRoot';

const IngredientsEditItem = (props) => {

  async function handleIngredientDelete(e, ingredient) {
    e.preventDefault();

    const body = { 
      recipe: {
        ingredient_id: props.ingredient.id
      }
    }

    fetch(`${API_ROOT}/api/destroy_ingredient`, {
      headers: {'Content-Type': 'application/json'},
      method: 'delete',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        props.removeIngredientFromIngredientsArray()
      }
    });
  }

  const maybeRenderDeleteIcon = () => {
    if (props.position === (props.length -1)) {
      if (props.ingredient.id) {
        return (
          <button className="ml-2 text-red-400"  onClick={(e) => handleIngredientDelete(e, props.ingredient)}><MinusIcon/></button>
        )
      } else {
        return (
          <button className="ml-2 text-red-400"  onClick={(e) => props.removeIngredientFromIngredientsArray()}><MinusIcon/></button>
        )
      }
    }
  }

  return (
      <div className="">
       <div className="mt-1 rounded-md shadow-sm flex-row w-full">
         <div className="flex justify-between  shrink-0 ">
           <div className="flex">
             <input
               required
               type="number"
               min="0"
               name="measurement_unit_quantity"
               className="focus:ring-indigo-500 focus:border-indigo-500 block w-2/5 mr-1 sm:text-sm border-gray-300 rounded-md"
               defaultValue={props.ingredient.measurement_unit_quantity}
               onChange={(e) => props.updateIngredientInIngredientsArray("measurement_unit_quantity", props.position, e.target.value)}
             />
 
             <div className="block inset-y-0 right-0 flex items-center">
               <label htmlFor="measurementUnitType" className="sr-only">
                 type
               </label>
               <select
                 name="measurement_unit_type"
                 className="focus:ring-indigo-500 focus:border-indigo-500 w-30 h-full py-0 border-gray-300 bg-transparent text-black-500 sm:text-sm rounded-md"
                 value={props.ingredient.measurement_unit_type}
                 onChange={(e) => props.updateIngredientInIngredientsArray("measurement_unit_type", props.position, e.target.value)}
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
           </div>
           <input
             required
             type="text"
             id="ingredient_name"
             className="focus:ring-indigo-500 focus:border-indigo-500 block w-4/5 pl-7 pr-1 sm:text-sm border-gray-300 rounded-md"
             defaultValue={props.ingredient.ingredient_name}
             onChange={(e) => props.updateIngredientInIngredientsArray("ingredient_name", props.position, e.target.value)}
           />
           {maybeRenderDeleteIcon()}
         </div>
       </div>
     </div>
  )
}

const IngredientsDetailsEditList = (props) => {

  const renderInstructionsItems = () => {
    if (props.ingredients) {
      return props.ingredients.map((ingredient, index) => {
        return <IngredientsEditItem
                  key={index} 
                  position={index}
                  length={props.ingredients.length}
                  ingredient={ingredient}
                  removeIngredientFromIngredientsArray={props.removeIngredientFromIngredientsArray}
                  updateIngredientInIngredientsArray={props.updateIngredientInIngredientsArray}
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

export default IngredientsDetailsEditList;