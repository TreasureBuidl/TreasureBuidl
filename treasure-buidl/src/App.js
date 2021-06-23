import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const finalSpaceCharacters = [
  {
    id: 'AAVE-1',
    name: 'AAVE Flashloan open',
    thumb: '/images/AAVE.jpg'
  },
  {
    id: 'Uniswap-1',
    name: 'Uniswap Swap',
    thumb: '/images/uniswap.jpg'
  },
  {
    id: 'Compound-1',
    name: 'Compound Borrow',
    thumb: '/images/Compound.jpg'
  },
  {
    id: 'Uniswap-2',
    name: 'Uniswap Flashswap',
    thumb: '/images/uniswap.jpg'
  },
  {
    id: 'Compound-2',
    name: 'Compound Lend',
    thumb: '/images/Compound.jpg'
  },
  {
    id: 'AAVE-2',
    name: 'AAVE Flashloan close',
    thumb: '/images/AAVE.jpg'
  },
]

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TreasureBuidl</h1>
        <h2>Treasury management tool for DAOs</h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p>
                            {name}
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        Created as part of <a href="https://ethglobal.co/">ETH Global Hackathon</a>
      </p>
    </div>
  );
}

export default App;
