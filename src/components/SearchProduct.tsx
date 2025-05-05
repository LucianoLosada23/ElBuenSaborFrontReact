
export default function SearchProduct() {
  return (
    <div className='max-w-7xl mx-auto'>
        <div className=''>
            <h1 className='text-5xl font-bold font-display'>Encuentra Las Mejores Ofertas</h1>
            <p className='mt-4 font-display'>Lista de los mejores platos, postres, desayunos, bebidas...</p>
        </div>
        <div className='grid grid-cols-[70%_30%] mt-4 items-center '>
            <div>
                <input type="text" className='w-full px-4 py-3 border bg-white border-gris-oscuro focus:outline-none ' placeholder='Pizza, hamburguesa, bebidas..'/>
            </div>
            <div>
            <button className="font-display px-4 py-4 text-white  cursor-pointer text-[12px] w-[300px] bg-principal rounded-tr-[10px] rounded-br-[10px] font-semibold uppercase tracking-widest hover:text-white hover:bg-terciario">
              Buscar
            </button>
            </div>
        </div>
    </div>
  
  )
}
