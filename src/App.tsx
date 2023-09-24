import './App.css';
import GameBoard from './components/GameBoard';

const App = () => {
  return (
    <div className="gameboard__container">
      <h1>Tic-Tac-Toe</h1>
      <GameBoard />
    </div>
  );
};

export default App;
