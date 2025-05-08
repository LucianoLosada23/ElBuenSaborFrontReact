
type ButtonProps = {
    text: string
    width : number
    height : number
    size : number
}

export default function Button({text , width , height , size} : ButtonProps) {
  return (
    <button className="font-display text-white cursor-pointer bg-principal font-semibold uppercase tracking-widest hover:text-white hover:bg-secundario"
     style={{
        padding: `${height}rem ${width}rem`,
        fontSize: `${size}px`
     }}
    >
    {text}
    </button>
  )
}
