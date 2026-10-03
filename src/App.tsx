// import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Card from './components/card.components'
import Button from './components/button.components'
import Badge from './components/badge.component'
// import LoginForm from './pages/LoginForm'
// import Profile from './pages/Profile'

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>className='h-full'
          <Route path='/' element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>   */}
      <div className="min-h-screen bg-brand-gold p-10">

        <Card>
          <h1 className="text-2xl font-bold text-brand-forest">
            StockLens
          </h1>

          <p className="mt-2 text-brand-forest">
            Inventory intelligence
          </p>
        </Card>
        <Card>
          <h1>Normal card</h1>
        </Card>

        <Card variant="elevated" size="lg" className='bg-red-500'>
          <h1>Large elevated card</h1>
        </Card>

        <Card variant="danger" size="sm">
          <h1>Danger card</h1>
        </Card>
        <Button variant="primary">
          <h1>Add Product</h1>
        </Button>

        <Button variant="secondary">
          Cancel
        </Button>

        <Button variant="danger">
          Delete
        </Button>

        <Button variant="ghost">
          View Details
        </Button>
        <button className='hover:bg-yellow-300 p-10'>hello</button>
        <Badge>welcome</Badge>
      </div>


    </>

  )
}

export default App
