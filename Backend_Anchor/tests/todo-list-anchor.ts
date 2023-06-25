import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TodoListAnchor } from "../target/types/todo_list_anchor";
import { expect } from "chai";

describe("todo-list-anchor", () => 
{
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.TodoListAnchor as Program<TodoListAnchor>;
  const id = 1;
  const [userPdaAddress] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("todo_user"), provider.publicKey.toBuffer()], program.programId);
  const [todoPdaAddress] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("todo_item"), provider.publicKey.toBuffer(), Buffer.from(id.toString())], program.programId);

  it("Adding Todo!", async () => 
  {
    await program.methods.addTodo(id, "Pizza!!").accounts({todoItem : todoPdaAddress}).rpc();

    const userAccount = await program.account.todoUser.fetch(userPdaAddress);
    const todoAccount = await program.account.todoItem.fetch(todoPdaAddress);
    
    console.log(userAccount.isInitialized);
    console.log(userAccount.listedItems);
    console.log(todoAccount.id);
    console.log(todoAccount.item);
    console.log(todoAccount.checked);
  });

  it("Updating Todo!", async () => 
  {
    await program.methods.updatedChecked(id, true).accounts({todoItem : todoPdaAddress}).rpc();

    const todoAccount = await program.account.todoItem.fetch(todoPdaAddress);
    
    console.log(todoAccount.id);
    console.log(todoAccount.item);
    console.log(todoAccount.checked);
  });

  it("Remove Todo!", async () => 
  {
    await program.methods.removeTodo(id).accounts({todoItem : todoPdaAddress}).rpc();

    const userAccount = await program.account.todoUser.fetch(userPdaAddress);
    
    console.log(userAccount.listedItems);
  });
});