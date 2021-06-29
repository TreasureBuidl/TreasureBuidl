import React, {
  createContext,
  useReducer
} from 'react';
import lodashClonedeep from 'lodash.clonedeep';

const initialTreasureState = {
  actions: [],
};

const treasureReducer = (state, act) => {
  switch (act.type) {
    case 'ADDACTION': {
      const { action } = act.payload;
      const indexToRemove = state.actions.findIndex(b => b.id === action.id);
      if (indexToRemove >= 0) {
        return {
          ...state
        };
      } else {
        return {
          ...state,
          actions: state.actions.concat([action])
        };
      }
    }
    case 'REMOVEACTION': {
      const { action } = act.payload;
      const indexToRemove = state.actions.findIndex(b => b.id === action.id);
      if (indexToRemove >= 0) {
        const newActionsArray = lodashClonedeep(state.actions);
        newActionsArray.splice(indexToRemove, 1);
        return {
          ...state,
          actions: newActionsArray
        };
      } else {
        return { ...state };
      }
    }
    case 'CLEAR': {
      return {
        ...state,
        actions: []
      };
    }
    default: {
      return { ...state };
    }
  }
};

const TreasureContext = createContext({
  ...initialTreasureState,
  addAction: () => { },
  removeAction: () => { },
  clearActions: () => { },
});

export const TreasureProvider = ({ children }) => {
  const [treasureState, treasureDispatch] = useReducer(treasureReducer, initialTreasureState);

  const addAction = (action) => {
    if (!action) {return}
    treasureDispatch({
      type: 'ADDACTION',
      payload: {
        action
      }
    });
  };

  const removeAction = (action) => {
    if (!action) {return}
    treasureDispatch({
      type: 'REMOVEACTION',
      payload: {
        action
      }
    });
  };

  const clearActions = () => {
    treasureDispatch({
      type: 'CLEAR'
    });
  };

  return (
    <TreasureContext.Provider
      value={{
        ...treasureState,
        addAction,
        removeAction,
        clearActions
      }}
    >
      {children}
    </TreasureContext.Provider>
  );
};

export {
  TreasureContext
}