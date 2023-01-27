import React from "react";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    confirmed: false,
    deleted: false,
  })

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    })
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  }

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    })
  }

  const onDelete = () => {
    setState({
      ...state,
      deleted: true
    })
  };

  const onReset = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: false,
      deleted: false,
      value: '',
    })
  }

  React.useEffect(() => {
    console.log("Empezando el efecto");

    const SECURITY_CODE = 'paradigm';
    if (state.loading) {
      setState({
        ...state,
        error: false,
      });

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
          onChange={(event) => {
            onWrite(event.target.value);
          }} />
        <button
          onClick={() => onCheck()}
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
          onClick={() => onDelete()}
        >
          Yes, Deleted
        </button>
        <button
          onClick={() => {
            onReset();
          }}
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
          onClick={() => {
            onReset();
          }}
        >
          Back
        </button>
      </>
    )
  }
}

export { UseState };