import { HeaderProps } from "./types"

const Header = (props: HeaderProps) => {
  return (
    <h1 className="text-grey-darkest">{props.title} List!</h1>
  )
}

export default Header