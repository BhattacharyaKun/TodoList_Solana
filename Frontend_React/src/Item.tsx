import { FaTrashAlt } from 'react-icons/fa'
import { CSSProperties } from 'react'
import { ItemProps } from './types'

const Item = ({ item, handleCheck, handleDelete }: ItemProps) => {
  return (
    <div className="inline-flex border rounded w-full mb-2">
      <label className="cursor-pointer p-2" style={(item.checked) ? {textDecoration: "line-through"} as CSSProperties: undefined} onDoubleClick={() => handleCheck(item.id)}>{item.item}</label>
      <input className='ml-auto mr-0 h-5 w-5 mt-3 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10' type="checkbox" onChange={() => handleCheck(item.id)} checked={item.checked} />
      <FaTrashAlt className='ml-2 mr-2 rounded mt-3 hover:bg-red-300 ' onClick={() => handleDelete(item.id)} role="button" tabIndex="0"/>
    </div>

  )
}

export default Item;