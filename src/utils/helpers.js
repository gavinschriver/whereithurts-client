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
  };
};

/** quick way to access the Patient id of the currently logged-in user 
 * this is currently not working or something?
*/
export const current_patient_id = parseInt(localStorage.getItem("patient_id"))

/** convert an int value of seconds into minutes
 * @param secondsAsInt integer of seconds to convert into equivalent minutes, rounded down to nearest whole minute
 */
export const secondsToRoundedMinutes = (secondsAsInt) => {
  return Math.floor(secondsAsInt /60)
} 
