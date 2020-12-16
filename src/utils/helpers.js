/** helper function to deselect an item from an array off the dom via it's ID value
 * @param selected [array] of selected {objects} from a collection in state; each must have and ID value as part of its data structure
 * @param setSelected setter function for that state [array] value
 *  
 * this currently works for Toggle Badges, as they are set up so that the button clicked on to deselect is a direct child
 * of a <span>Badge</span> with and id of "toggle-badge-remove-<id>"
 * 
 * this would need to be adjusted if the way to select an id is different
 * 
 * **/

export const deselectItemById = (selected, setSelected) => {
  return (e) => {
    const itemId = parseInt(e.target.parentNode.id.split("-")[4])
    const newArray = selected.filter(
      (selectedItem) => selectedItem.id !== itemId
    );
    setSelected(newArray);
    console.log(e.target);
  };
};

/** quick way to access the Patient id of the currently logged-in user */
export const current_patient_id = localStorage.getItem("patient_id")
