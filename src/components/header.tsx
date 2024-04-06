import logo from '@/assets/logo.svg'

const Header = () => {
  return (
    <header className="w-full flex justify-between p-8">
      <img src={logo} alt="Planning Poker" className="w-32 md:w-48" />
      <button className="border border-primary-400 text-sm text-primary-400 py-1 px-4 rounded-lg">Compartilhar</button>
    </header>
  )
}

export default Header
