import React from 'react';
import './App.css';
import Routes from './routes';
const App = () => <Routes />;
export default App;

// import Main from './pages/Main'; // se não informar nada depois de Main o React já sabe que está importando "Index.js"

// Há 2 tipós de componentes no react: Statefull (quando tem state) e Stateless (quando não tem)
// o comando acima const App = () => <Main />; 
// é equivalente a

// Equivalente 1
// ++++++++++++++++++++++++++++++++++++
// function App() {
//   return <Main />;
// }


// Equivalente 2
//++++++++++++++++++++++++++++++++++
// Exemplo Componente Stateless
// class App extends Component {
//   render() {
//     return <Main />;
    
//     // return (
//     //   <div className="App">
//     //     <h1>Hello World !!!</h1>
//     //   </div>
//     // );
//   }
// }


