import { FaPlus } from "react-icons/fa"
import { AddItemPros } from "./types"

const AddItem = ({ item, setNewItem, handleSubmit}: AddItemPros) => {
  return (
    <form className="addForm" onSubmit={handleSubmit}>
        <input className="shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker hover:bg-teal-50 focus:bg-teal-100" type="text" id="addItem" placeholder="Add Item" autoFocus required value={item} onChange={(e) => setNewItem(e.target.value)}/>
        <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal-500" type="submit" aria-label="Add Item"><FaPlus/></button>
    </form>
  )
}

export default AddItem