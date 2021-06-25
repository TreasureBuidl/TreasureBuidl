import React, { useState } from 'react'
import Image from 'next/image'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import NoSSR from 'react-no-ssr'
import styles from './DragNDropExample.module.css'

const finalSpaceCharacters = [
  {
    id: 'AAVE-1',
    name: 'AAVE Flashloan open',
    thumb: '/images/AAVE.jpeg',
  },
  {
    id: 'Uniswap-1',
    name: 'Uniswap Swap',
    thumb: '/images/uniswap.jpeg',
  },
  {
    id: 'Compound-1',
    name: 'Compound Borrow',
    thumb: '/images/Compound.jpeg',
  },
  {
    id: 'Uniswap-2',
    name: 'Uniswap Flashswap',
    thumb: '/images/uniswap.jpeg',
  },
  {
    id: 'Compound-2',
    name: 'Compound Lend',
    thumb: '/images/Compound.jpeg',
  },
  {
    id: 'AAVE-2',
    name: 'AAVE Flashloan close',
    thumb: '/images/AAVE.jpeg',
  },
]

function DragNDropExample() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters)

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    updateCharacters(items)
  }

  return (
    <div className="App">
      <header className={styles['app-header']}>
        <h2>Treasury management tool for DAOs</h2>
        <NoSSR>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {provided => (
                <ul
                  className={`${styles['characters']}`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(({ id, name, thumb }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {provided => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles['characters-Thumb']}>
                              <Image width="300" height="300" src={thumb} />
                            </div>
                            <p>{name}</p>
                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </NoSSR>
      </header>
      <p>
        Created as part of{' '}
        <a href="https://ethglobal.co/">ETH Global Hackathon</a>
      </p>
    </div>
  )
}

export default DragNDropExample
