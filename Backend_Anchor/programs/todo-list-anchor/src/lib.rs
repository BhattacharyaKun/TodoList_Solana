use anchor_lang::prelude::*;

declare_id!("5LKhTzPmPJfiunQ6NAimso7sZhG3kiLw8jx9xzKUAh68");

#[program]
pub mod todo_list_anchor 
{
    use super::*;

    pub fn update_todo(ctx: Context<UpdateTodo>) -> Result<()> 
    {
        let user = &mut ctx.accounts.todo_user;
        if !user.is_initialized
        {
            user.logged_in_count = 0;
            user.listed_items = 0;
            user.is_initialized = true;
        }

        user.logged_in_count += 1;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct UpdateTodo<'info> 
{
    #[account(init_if_needed, payer = signer, seeds = [b"todo", signer.key.as_ref()], bump, space = 8 + 1 + 16 + 16)]
    todo_user: Account<'info, TodoUser>,
    #[account(mut)]
    signer: Signer<'info>,
    system_program: Program<'info, System>
}

#[account]
pub struct Todo
{
    item: String,
    id: u8,
    checked: bool
}

#[account]
pub struct TodoUser
{
    is_initialized: bool,
    logged_in_count: u16,
    listed_items: u16
}