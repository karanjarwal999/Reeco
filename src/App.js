import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import DummyOrderUI from './components/Dummy/DummyOrderUI';
import ShowItems from './components/ShowItems';

function App() {
  return (
    <div className="App">
      <Navbar />
      <DummyOrderUI />
      <ShowItems />
    </div>
  );
}

export default App;
