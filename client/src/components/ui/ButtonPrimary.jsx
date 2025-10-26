
function ButtonPrimary({handleClick,children}) {
  return (
    <button onClick={handleClick}>{children}</button>
  )
}

export default ButtonPrimary