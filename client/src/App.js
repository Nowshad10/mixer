import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './layout/Navbar';
import TestAuth from './pages/TestAuth';
import SavedDrinks from './pages/SavedDrinks';
import SingleDrink from './pages/SingleDrink';
import PopularDrinks from './pages/PopularDrinks';
import SearchByName from './pages/SearchByName';
import RandomDrink from './pages/RandomDrink';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/auth' element={<TestAuth/>}></Route>
        <Route path='/saved-drinks' element={<SavedDrinks/>}></Route>
        <Route path='/popular' element={<PopularDrinks/>}></Route>
        <Route path='/random' element={<RandomDrink/>}></Route>
        <Route path='/drink-info/:drinkId' element={<SingleDrink/>}></Route>
        <Route path='/searchbyname' element={<SearchByName/>}/>
      </Routes>
    </>
  );
}

export default App;
