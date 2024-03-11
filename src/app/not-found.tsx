export default function error() {
    return (
      <>

        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-6xl font-semibold text-blue-500 ">404</p>
            <div className="flex justify-center">
               <img className="" src="image/magicarpe.png" alt="" />
               </div>
           
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page non trouvée</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Désolé, nous n’avons pas trouvé la page que vous recherchez.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go Pokédex

              </a>

            </div>
          </div>
        </main>
      </>
    )
  }