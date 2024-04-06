import './App.css'
import Card from './components/card'
import Header from './components/header'

function App() {
  return (
    <main className="w-screen h-screen flex flex-col justify-between">
      <Header />

      <div className="px-10 w-full max-w-[550px] mx-auto">
        <div className="flex justify-between">
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-primary-300 rounded-full size-10 mt-1" />
          </div>
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-gray-200 rounded-full size-10 mt-1" />
          </div>
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-gray-200 rounded-full size-10 mt-1" />
          </div>
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-gray-200 rounded-full size-10 mt-1" />
          </div>
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-gray-200 rounded-full size-10 mt-1" />
          </div>
        </div>

        <div className="bg-primary-300 h-24 w-full my-5 rounded-lg flex align-center justify-center md:h-40">
          <button className="bg-primary-600 h-fit px-5 py-2 text-sm rounded-lg m-auto font-medium md:text-lg">
            Revelar cartas
          </button>
        </div>

        <div className="flex w-full justify-between">
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-primary-300 rounded-full size-10 mt-1" />
          </div>
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-gray-200 rounded-full size-10 mt-1" />
          </div>
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-gray-200 rounded-full size-10 mt-1" />
          </div>
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-gray-200 rounded-full size-10 mt-1" />
          </div>
          <div className="w-fit">
            <span className="text-gray-300">Junior</span>
            <div className="bg-gray-200 rounded-full size-10 mt-1" />
          </div>
        </div>
      </div>

      <div className="mt-20 pb-10">
        <h1 className="mb-4">Escolha seu card</h1>

        <div className="flex flex-wrap justify-center">
          {[undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30].map(item => (
            <Card key={String(item)} value={item} isSelected={item === 3} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default App
