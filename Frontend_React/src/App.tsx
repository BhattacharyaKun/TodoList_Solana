import idl from "./assets/idl.json";
import Body from './Body';
import AddItem from './AddItem';
import Footer from './Footer'
import Header from './Header'
import React, { useEffect, useState } from 'react';
import { ItemType } from './types';
import SearchItem from './SearchItem';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Program, Idl, AnchorProvider, setProvider } from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";

const MockWallet = {
  publicKey: web3.Keypair.generate().publicKey,
  signTransaction: () => Promise.reject(),
  signAllTransactions: () => Promise.reject(),
}

function App() 
{
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("list")!) || []);
  const [newItem, setNewItem] = useState<string>('');
  const [searchItem, setSearchItem] = useState<string>('');
  const { connection } = useConnection();
  const wallet = useAnchorWallet() || MockWallet;
  // const provider = new AnchorProvider(connection, wallet, {});
  // setProvider(provider);
  const programId = new web3.PublicKey("FpbdhtfjWLGvRbLrxK2Q9aiyMoRxCkD2xd6qftbdk7Eh");
  const program = new Program(idl as Idl, programId);

  useEffect(() => {
    console.log(connection);
    console.log(wallet);
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
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={[wallet]}>
        <WalletModalProvider>
            <WalletMultiButton />


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
    </WalletModalProvider>
    </WalletProvider>
</ConnectionProvider>
  )
}

export default App
