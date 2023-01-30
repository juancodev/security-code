import React from 'react';
import { UseState } from './UseState';
import { UseReducer } from './UseReducer';
import { ClassState } from './ClassState';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="UseReduce" />
      <ClassState name="ClassState" />
    </div>
  );
}

export default App;
