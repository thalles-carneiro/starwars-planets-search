import Filters from './components/Filters';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <>
      <header>
        <Filters />
      </header>
      <main>
        <Table />
      </main>
    </>
  );
}

export default App;
