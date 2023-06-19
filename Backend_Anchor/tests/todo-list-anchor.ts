import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TodoListAnchor } from "../target/types/todo_list_anchor";
import { expect } from "chai";

describe("todo-list-anchor", () => 
{
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.TodoListAnchor as Program<TodoListAnchor>;

  it("Is initialized!", async () => 
  {
    const [userPdaAddress] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("todo"), provider.publicKey.toBuffer()], program.programId);
    const tx = await program.methods.updateTodo().rpc();
    console.log("Your transaction signature", tx);

    const userAccount = await program.account.todoUser.fetch(userPdaAddress);
    console.log(userAccount.loggedInCount);
  });
});