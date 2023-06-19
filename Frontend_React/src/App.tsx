import Body from './Body';
import AddItem from './AddItem';
import Footer from './Footer'
import Header from './Header'
import React, { useEffect, useState } from 'react';
import { ItemType } from './types';
import SearchItem from './SearchItem';

function App() 
{
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("list")!) || []);
  const [newItem, setNewItem] = useState<string>('');
  const [searchItem, setSearchItem] = useState<string>('');

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  const addItem = (item: string) => 
  {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItemObj: ItemType = { id: id, checked: false, item: item}; 
    const listItems: ItemType[] = [...items, newItemObj];
    setItems(listItems);
  }

  const handleCheck = (id: number) => 
  {
    const listItems = items.map((item: ItemType) => item.id === id ? {...item, checked: !item.checked} : item);
    setItems(listItems);
  }

  const handleDelete = (id: number) => 
  {
    const listItems = items.filter((item: ItemType) => item.id !== id);
    setItems(listItems);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => 
  {
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  const searchFilter = () => 
  {
    return items.filter((item: ItemType) => ((item.item).toLowerCase().includes(searchItem.toLowerCase())));
  }

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"> 
      <div className='bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>
        <div className="mb-4">
        <Header title="Todo"/>
        <div className="flex mt-4">
          <AddItem item={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit}/>
        </div>
        <div className="flex mt-4">
          <SearchItem item={searchItem} setSearchItem={setSearchItem}/>
        </div>
        </div>
        <div>
        <Body inProgressItems={searchFilter().filter((item: ItemType) => (!item.checked))} completedItems={searchFilter().filter((item: ItemType) => (item.checked))} handleCheck={handleCheck} handleDelete={handleDelete}/>
        <Footer length={items.length}/>
        </div>
      </div>
    </div>
  )
}

export default App
