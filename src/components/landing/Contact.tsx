export default function Contact() {
  const social = [
    {
      icon: "/@.svg",
      social: "elbuensabor@gmail.com",
    },
    {
      icon: "/phone.svg",
      social: "+54 9 2611456789",
    },
    {
      icon: "/location.svg",
      social: "San Martin 879, Mendoza, Mendoza",
    },
    {
      icon: "/facebook.svg",
      social: "@BuenSaborok",
    },
    {
      icon: "/instagram.svg",
      social: "@BuenSaborok",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-20 md:mt-36 p-4 sm:p-8 md:p-12 lg:p-20" id="contact">
      <div className="bg-white shadow-lg md:shadow-xl lg:shadow-2xl w-full rounded-lg py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
        {/* Contact Information */}
        <div className="flex flex-col gap-3 sm:gap-4 col-span-1 md:col-span-1">
          {social.map((social, index) => (
            <div 
              className="flex gap-3 sm:gap-4 items-center cursor-pointer hover:text-principal transition-colors" 
              key={index}
            >
              <img 
                src={social.icon} 
                alt="red social" 
                loading="lazy" 
                className="w-6 h-6 sm:w-7 sm:h-7" 
              />
              <span className="text-sm sm:text-base md:text-[15px] lg:text-base">
                {social.social}
              </span>
            </div>
          ))}
        </div>

        {/* Images - Hidden on small screens */}
        <div className="hidden md:flex col-span-2 justify-center items-center space-x-4 lg:space-x-8">
          <img
            src="/ice3.png"
            alt="Imagen1"
            loading="lazy"
            className="w-[180px] md:w-[220px] lg:w-[250px] xl:w-[300px] h-auto object-contain"
          />
          <img
            src="/coffe.png"
            alt="Imagen2"
            loading="lazy"
            className="w-[220px] md:w-[280px] lg:w-[350px] xl:w-[400px] h-auto object-contain"
          />
        </div>

        {/* Mobile-only image (optional) */}
        <div className="md:hidden flex justify-center">
          <img
            src="/ice3.png"
            alt="Imagen1"
            loading="lazy"
            className="w-[180px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}