import { getRecommendationsA } from './auteur.mjs';
import { getRecommendationsG} from './genre.mjs';
import { getRecommendationsS } from './synopsis.mjs';
import logo from './logo.png';
import './App.css';


function ButtonA() {
  return (
    <button>
      Search by authors
    </button>
  );
}

function ButtonS() {
  return (
    <button>
      Search by synopsis
    </button>
  );
}

function ButtonG() {
  return (
    <button>
      Search by genres
    </button>
  );
}
/*
function Result() {
  case A
  return (
      getRecommendationsA("Victor Hugo et Guillaume Musso")
  )
  case G
  return (
      getRecommendationsG("Roman policier")
  )
  case S
  return (
      getRecommendationsS("Un aventurier qui part à la conquête de l'espace")
  )
}
*/
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to nextchapter</h1>
      <ButtonA />
      <ButtonS />
      <ButtonG />
      <img src={logo} alt="logo" />
    </div>
  );
}