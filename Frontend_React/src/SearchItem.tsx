import { SearchItemPros } from "./types"

const SearchItem = ({ item, setSearchItem }: SearchItemPros) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" type="text" id="search" role="searchbox" placeholder="Search Items" value={item} onChange={(e) => setSearchItem(e.target.value)}/>
    </form>
  )
}

export default SearchItem