import './App.css';
import './Assests/fontAwesomeProIcons/fontAwesomeIcons.css';
import LocalTasker from './Components/LocalTasker';
import {useReducer} from 'react';

function App() {
  function reducer(state, action){
    // default 
      return state;
  }
  let defaultInitialState= {

  };
  let [stateLocalTasker, dispatch] = useReducer(reducer, defaultInitialState)

  return (
    <div>
      <LocalTasker stateLocalTasker={stateLocalTasker} dispatch={dispatch}/>
    </div>

  );
}

export default App;
