
export default function Contact() {
const social = [
    {
        icon : "/@.svg",
        social : "elbuensabor@gmail.com"
    },
    {
        icon : "/phone.svg",
        social : "+54 9 2611456789"
    },
    {
        icon : "/location.svg",
        social : "San Martin 879, Mendoza, Mendoza"
    },
    {
        icon : "/facebook.svg",
        social : "@BuenSaborok"
    },
    {
        icon : "/instagram.svg",
        social : "@BuenSaborok"
    }
]

  return (
    <div className="max-w-7xl mx-auto mt-36 p-20" id="contact">
    <div className=" bg-white shadow-2xl w-full rounded-lg py-10 px-10 grid grid-cols-3 justify-between">
            <div className="flex flex-col gap-4">
            {social.map((social , index)=> (
                    <div className="flex gap-4 items-center cursor-pointer" key={index}>
                        <img
                        src={social.icon} 
                        alt="red social"
                        width={28}
                        height={28}
                    />
                    <span>{social.social}</span>
                    </div>
                ))} 
            </div>
            <div className="flex">
            <img
            src="/ice3.png"
            alt="Imagen1"
            className="w-[300px] h-auto object-contain"
            />
            <img
            src="/coffe.png"
            alt="Imagen2"
            className="w-[400px] h-auto object-contain"
            />
            </div>
        </div>
    </div>
   
  )
}
