import Body from './Body';
import AddItem from './AddItem';
import Footer from './Footer'
import Header from './Header'
import React, { useEffect, useState } from 'react';
import { ItemType } from './types';
import SearchItem from './SearchItem';
import { ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { IDL, TodoListAnchor } from "./assets/todo_idl";
import { Program, web3, AnchorProvider, setProvider } from '@coral-xyz/anchor';

function App() 
{
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("list")!) || []);
  const [newItem, setNewItem] = useState<string>('');
  const [searchItem, setSearchItem] = useState<string>('');
  const endpoint = web3.clusterApiUrl('devnet');
  const wallet = new PhantomWalletAdapter();
  let connection = useConnection();
  let anchorWallet = useAnchorWallet();
  let provider = new AnchorProvider(connection.connection, anchorWallet!, {});
  setProvider(provider);

  const programId = new web3.PublicKey("4TfFqjd1YxviH1Jmwz2qHV5frmNTVfbLrQrbjHnNGdLJ");  //OR 5LKhTzPmPJfiunQ6NAimso7sZhG3kiLw8jx9xzKUAh68
  const program = new Program<TodoListAnchor>(IDL, programId);

  useEffect(() => 
  {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  const addItem = (item: string) => 
  {
    // console.log(connection.connection);
    // console.log(anchorWallet);
    const id = items.length ? items[items.length - 1].id + 1 : 1;

    const itemKP = web3.PublicKey.findProgramAddressSync([Buffer.from("todo_item"), wallet.publicKey!.toBuffer(), Buffer.from(id.toString())], programId);
    const txSig = program.methods.addTodo(id, item).accounts({
        todoItem: itemKP[0],
    }).signers([]).rpc().then(() => {
      console.log(txSig);
      const newItemObj: ItemType = { id: id, checked: false, item: item}; 
      const listItems: ItemType[] = [...items, newItemObj];
      setItems(listItems);
    });
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
              <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"> 
                <div className='bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>
                  <div className="mb-4">
                      <Header title="Todo"/>
                      <WalletMultiButton/>
                      
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
