import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CakeContainer from './Components/CakeContainer'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <CakeContainer />
      </div>
    </Provider>
  )
}


export default App
