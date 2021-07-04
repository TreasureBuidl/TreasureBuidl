import { v4 as uuidv4 } from 'uuid'
import Button, { ButtonShape, ButtonSize } from '@components/Button/Button'
import useTreasure from 'hooks/useTreasure'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Action, Operation, Protocol, Token } from 'types/Treasure.types'
import { libraries } from 'libraries/TransactionLibrary';
import ProtocolIcon from '@components/ProtocolIcon'

type ActionModalProps = {
  toggleActionModal: (state: boolean) => void
}


export default function ActionModal({ toggleActionModal }: ActionModalProps) {
  const [actions, setActions] = useState([])
  const { addAction } = useTreasure()

  const handleActionSelection = (action: Action) => {
    addAction(action)
    toggleActionModal(false)
  }

  const paramTypesFromSig = (sig: string) => {
    let params = sig.split("(")[1]
    params = params.slice(0, params.length - 1);
    return params.split(",");
  }

  const paramNamesFromFullSig = (sig: string) => {
    let p = sig.split("(")[1];
    p = p.split(")")[0];
    let params = p.split(",");
    let paramNames = params.map((x) => {
      let split = x.split(" ");
      return split[split.length - 1];
    });
    return paramNames;
  }

  useEffect(() => {
    let actions = [];
    libraries.forEach((protocol) => {
      protocol.functionSig.forEach((_, i) => {

        // calculate parameter types from a function signature
        const paramTypes = paramTypesFromSig(protocol.functionSig[i]);

        // get paramater names from a full function signature
        const paramNames = paramNamesFromFullSig(protocol.fullFunctionSig[i]);

        let action = {
          id: uuidv4(),
          type: {
            protocol: protocol.protocol,
            operation: protocol.operations[i],
          },
          iconUrl: protocol.iconUrl,
          cardUrl: protocol.cardUrl,
          cssClass: protocol.cssClass,
          contracts: {
            address: protocol.getContractAddress(4), // TODO this is hardcoding rinkeby network, this should be changed if deploying to main
            functionSig: protocol.functionSig[i],
            paramTypes: paramTypes,
            paramNames: paramNames,
            paramToolTips: protocol.paramToolTip[i],
          }
        };
        if (protocol.hasInput[i]) {
          action["input"] = {
            token: Token.USDT, // TODO more thought should be put into determining input and output tokens
            quantity: null,
          }
        }
        if (protocol.hasOutput[i]) {
          action["output"] = {
            token: Token.USDC,
            quantity: null,
          }
        }
        actions.push(action);
      });
    });
    setActions(actions);
  }, [])

  return (
    <div className="bg-black bg-opacity-75 h-screen w-screen text-white flex justify-center items-center fixed z-10">
      <div className="w-3/4 h-3/4 bg-darkBlue border-white border-2 rounded-lg p-10 overflow-y-scroll scrollbar scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue pb-20">
        <div className="grid grid-cols-3 grid-flow-col items-center mb-10">
          <h2 className="col-start-2 text-center uppercase text-2xl">
            New Action
          </h2>
          <div className="col-start-3 flex flex-row justify-end">
            <div
              onClick={() => toggleActionModal(false)}
              className="w-10 transform rotate-45 text-5xl cursor-pointer"
            >
              +
            </div>
          </div>
        </div>
        <div>
          {libraries.map((library, i) => (
            <div key={i}>
              <div className="flex flex-row mb-4 items-center">
                <ProtocolIcon url={library.iconUrl} />
                <div className="uppercase text-xl ml-4">{library.protocol}</div>
              </div>
              <div className="flex flex-row justify-start mb-10">
                {actions
                  .filter((action) => action.type.protocol === library.protocol)
                  .map((action) => (
                    <div key={action.id} className="mr-10">
                      <Button
                        size={ButtonSize.Small}
                        protocolCssClass={action.cssClass}
                        buttonShape={ButtonShape.Wide}
                        onClick={() => handleActionSelection(action)}
                      >
                        {action.type.operation}
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
