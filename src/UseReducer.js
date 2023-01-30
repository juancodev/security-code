import React from "react";

const SECURITY_CODE = 'paradigm';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  //actions creators
  const onConfirm = () => { dispatch({ type: actionTypes.confirm }); }
  const onError = () => { dispatch({ type: actionTypes.error }); }
  const onCheck = () => { dispatch({ type: actionTypes.check }); }
  const onDelete = () => { dispatch({ type: actionTypes.delete }); };
  const onReset = () => { dispatch({ type: actionTypes.reset }); }
  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value });
  }

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (state.loading) {

      setTimeout(() => {
        console.log("haciendo la validación");

        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }
      }, 3000)
    }
  }, [state.loading, state.value]);

  console.log("Terminando el efecto");

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Delete {name}</h2>

        <p>Please.you write the code of security.</p>

        {(state.error && !state.loading) && (
          <p>Error: The code is incorrect</p>
        )}

        {state.loading && (
          <p>Loading...</p>
        )}

        <input
          type="text"
          placeholder="Security code..."
          value={state.value}
          onChange={onWrite}
        // (event)=> {onWrite(event.target.value)};
        />
        <button
          onClick={onCheck}
        >
          Validated
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>Do you want confirm?</p>
        <button
          onClick={onDelete}
        >
          Yes, Deleted
        </button>
        <button
          onClick={onReset}
        >
          No, i do not want
        </button>
      </>
    )
  } else {
    return (
      <>
        <p>Deleted success</p>
        <button
          onClick={onReset}
        >
          Back
        </button>
      </>
    )
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
}

// base
/*
const reduce = (state, action) => {

}
*/

// Reduce state with if, else if and else
/*const reducerIf = (state, action) => {
  if (action.type === 'ERROR') {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === 'CHECK') {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === 'CONFIRM') {
    return {
      ...state,
      confirmed: true,
      error: false,
    };
  } else if (action.type === 'WRITE') {
    return {
      ...state,
      value: ''
    }
  } else if (action.type === 'DELETED') {
    return {
      ...state,
      deleted: true
    };
  } else {
    return {
      ...state
    }
  }
};
*/

//more utility
/*const reduceSwitch = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      }
    case 'CHECK':
      return {
        ...state,
        loading: true,
      }
    case 'CONFIRM':
      return {
        ...state,
        confirmed: true,
      }
    default:
      return {
        ...state
      }
  }
}
*/

//action Types
const actionTypes = {
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  confirm: 'CONFIRM',
  delete: 'DELETE',
  reset: 'RESET'
}

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true
  },
  [actionTypes.reset]: {
    ...state,
    error: false,
    loading: false,
    confirmed: false,
    deleted: false,
    value: '',
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}

export { UseReducer };