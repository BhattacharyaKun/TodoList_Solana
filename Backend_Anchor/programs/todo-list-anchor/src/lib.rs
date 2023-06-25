use anchor_lang::prelude::*;

declare_id!("5LKhTzPmPJfiunQ6NAimso7sZhG3kiLw8jx9xzKUAh68");

#[program]
pub mod todo_list_anchor 
{
    use super::*;

    pub fn add_todo(ctx: Context<AddTodo>, id: u8, item: String) -> Result<()>
    {
        let todo_user = &mut ctx.accounts.todo_user;
        let todo_item = &mut ctx.accounts.todo_item;

        if !todo_user.is_initialized
        {
            todo_user.bump = *ctx.bumps.get("todo_user").unwrap();
            todo_user.listed_items = 1;
            todo_user.is_initialized = true;
        }
        else
        {
            todo_user.listed_items += 1;
        }

        todo_item.bump = *ctx.bumps.get("todo_item").unwrap();
        todo_item.id = id;
        todo_item.item = item;
        todo_item.checked = false;

        Ok(())
    }

    pub fn updated_checked(ctx: Context<UpdateTodo>, _id: u8, checked: bool) -> Result<()>
    {
        ctx.accounts.todo_item.checked = checked;

        Ok(())
    }

    pub fn remove_todo(ctx: Context<RemoveTodo>, _id: u8) -> Result<()>
    {
        ctx.accounts.todo_user.listed_items -= 1;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(id: u8, item: String)]
pub struct AddTodo<'info> 
{
    #[account(init_if_needed, payer = signer, seeds = [b"todo_user", signer.key().as_ref()], bump, space = 8 + std::mem::size_of::<TodoUser>())]
    todo_user: Account<'info, TodoUser>,

    #[account(init, payer = signer, seeds = [b"todo_item", signer.key().as_ref(), id.to_string().as_ref()], bump, space = 8 + 1 + 8 + item.len())]
    todo_item: Account<'info, TodoItem>,

    #[account(mut)]
    signer: Signer<'info>,

    system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(id: u8)]
pub struct UpdateTodo<'info> 
{
    #[account(mut, seeds = [b"todo_item", signer.key().as_ref(), id.to_string().as_ref()], bump = todo_item.bump)]
    todo_item: Account<'info, TodoItem>,

    #[account(mut)]
    signer: Signer<'info>,

    system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(id: u8)]
pub struct RemoveTodo<'info> 
{
    #[account(mut, seeds = [b"todo_user", signer.key().as_ref()], bump = todo_user.bump)]
    todo_user: Account<'info, TodoUser>,

    #[account(mut, close = signer, seeds = [b"todo_item", signer.key().as_ref(), id.to_string().as_ref()], bump = todo_item.bump)]
    todo_item: Account<'info, TodoItem>,

    #[account(mut)]
    signer: Signer<'info>,

    system_program: Program<'info, System>
}

#[account]
pub struct TodoItem
{
    bump: u8,
    item: String,
    id: u8,
    checked: bool
}

#[account]
pub struct TodoUser
{
    bump: u8,
    is_initialized: bool,
    listed_items: u16
}