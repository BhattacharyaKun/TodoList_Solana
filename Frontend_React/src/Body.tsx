import ItemList from "./ItemList";
import { BodyPros } from "./types";

const Body = ({ inProgressItems, completedItems, handleCheck, handleDelete } : BodyPros) => 
{
    return (
    <main>
        <div className="mb-4">
        <h1 className="text-grey-darkest">In Progress</h1>
        {inProgressItems.length ? (  
            <ItemList items={inProgressItems} handleCheck={handleCheck} handleDelete={handleDelete}/>
                
        ) : (
            <p style={{marginTop: '2rem'}}>No task in progress!</p>
        )}
        </div>
        <div className="mb-4">
        <h1 className="text-grey-darkest w-1/3">Completed</h1>
        {completedItems.length ? (
                <ItemList items={completedItems} handleCheck={handleCheck} handleDelete={handleDelete}/>
        ) : (
            <p style={{marginTop: '2rem'}}>No task completed!</p>
        )}
        </div>
    </main>
    )
}

export default Body