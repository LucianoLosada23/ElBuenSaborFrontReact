
type ButtonProps = {
    text: string
    width : number
    height : number
    size : number
}

export default function Button({text , width , height , size} : ButtonProps) {
  return (
    <button className=" text-white cursor-pointer uppercase bg-principal rounded-full font-semibold  hover:text-white hover:bg-secundario"
     style={{
        padding: `${height}rem ${width}rem`,
        fontSize: `${size}px`
     }}
    >
    {text}
    </button>
  )
}
