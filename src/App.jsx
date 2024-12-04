import { Routes,Route } from 'react-router-dom'
import ToDo from './components/ToDo'
import Completed from './components/Completed'
import Deleted from './components/Deleted'
import "./App.css";
import Navbar from './components/Navbar'


function App() {
  return (
    <div className='container-app'>
      <div>
        <Navbar />
      </div>
      <div className="container-path">
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/deleted" element={<Deleted />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
