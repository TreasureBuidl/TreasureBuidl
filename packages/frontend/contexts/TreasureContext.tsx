import React, {
  createContext,
  useReducer
} from 'react';
import lodashClonedeep from 'lodash.clonedeep';
import { Action, Amount, Token } from 'types/Treasure.types';

const initialTreasureState: { actions: Action[], fromTreasureAmounts: Amount[], toTreasureAmounts: Amount[] } = {
  actions: [],
  fromTreasureAmounts: [],
  toTreasureAmounts: [],
};

export type TreasureAmounts = {
  from: Amount[]
  to: Amount[]
}

/** Inputting token = add, outputting token = subtract
    Afterwards, if a token is net positive, then its coming FROM the Treasure.
    If a token is net negative, then its going TO the Treasure. **/
const getTreasureAmountsForActions = (actions: Action[]): TreasureAmounts => {
  const tokens = {}

  actions.forEach(action => {
    if (action.input) {
      if (tokens[action.input.token]) {
        tokens[action.input.token] = tokens[action.input.token] + (action.input.quantity ?? 0)
      } else {
        tokens[action.input.token] = action.input.quantity ?? 0
      }
    }
    if (action.output) {
      if (tokens[action.output.token]) {
        tokens[action.output.token] = tokens[action.output.token] - (action.output.quantity ?? 0)
      } else {
        tokens[action.output.token] = -action.output.quantity ?? 0
      }
    }
  })

  const fromAmounts: Amount[] = []
  const toAmounts: Amount[] = []

  for (const token in tokens) {
    if (tokens[token] > 0) {
      fromAmounts.push({ token: token as Token, quantity: tokens[token] })
    } else if (tokens[token] < 0) {
      toAmounts.push({ token: token as Token, quantity: Math.abs(tokens[token]) })
    }
  }

  const treasureAmounts: TreasureAmounts = {
    from: fromAmounts,
    to: toAmounts,
  }

  return treasureAmounts
}

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
        const newActions = state.actions.concat([action])
        const treasureAmounts = getTreasureAmountsForActions(newActions)
        return {
          ...state,
          actions: newActions,
          fromTreasureAmounts: treasureAmounts.from,
          toTreasureAmounts: treasureAmounts.to,
        };
      }
    }
    case 'REMOVEACTION': {
      const { action } = act.payload;
      const indexToRemove = state.actions.findIndex(b => b.id === action.id);
      if (indexToRemove >= 0) {
        const newActionsArray = lodashClonedeep(state.actions);
        newActionsArray.splice(indexToRemove, 1);
        const treasureAmounts = getTreasureAmountsForActions(newActionsArray)
        return {
          ...state,
          actions: newActionsArray,
          fromTreasureAmounts: treasureAmounts.from,
          toTreasureAmounts: treasureAmounts.to,
        };
      } else {
        return { ...state };
      }
    }
    case 'UPDATEACTION': {
      const { action } = act.payload;
      const indexToUpdate = state.actions.findIndex(b => b.id === action.id);
      if (indexToUpdate >= 0) {
        const newActionsArray = lodashClonedeep(state.actions);
        newActionsArray[indexToUpdate] = action;
        const treasureAmounts = getTreasureAmountsForActions(newActionsArray)
        return {
          ...state,
          actions: newActionsArray,
          fromTreasureAmounts: treasureAmounts.from,
          toTreasureAmounts: treasureAmounts.to,
        };
      } else {
        return { ...state };
      }
    }
    case 'CLEAR': {
      return {
        ...state,
        actions: [],
        fromTreasureAmounts: [],
        toTreasureAmounts: [],
      };
    }
    default: {
      return { ...state };
    }
  }
};

const TreasureContext = createContext({
  ...initialTreasureState,
  addAction: (action: Action) => { },
  removeAction: (action: Action) => { },
  updateAction: (action: Action) => { },
  clearActions: () => { },
});

export const TreasureProvider = ({ children }) => {
  const [treasureState, treasureDispatch] = useReducer(treasureReducer, initialTreasureState);

  const addAction = (action: Action) => {
    if (!action) {return}
    treasureDispatch({
      type: 'ADDACTION',
      payload: {
        action
      }
    });
  };

  const removeAction = (action: Action) => {
    if (!action) {return}
    treasureDispatch({
      type: 'REMOVEACTION',
      payload: {
        action
      }
    });
  };

  const updateAction = (action: Action) => {
    if (!action) {return}
    treasureDispatch({
      type: 'UPDATEACTION',
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
        updateAction,
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