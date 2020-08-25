import React, {useState, useCallback, useRef} from "react";
import produce from "immer";

const numRows = 25;
const numCols = 40;

const generateEmptyGrid = () => {
    const rows = [];
    for(let i = 0; i < numRows; i++){
        rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
}

function Game(){
    const [play, setPlay] = useState(false);
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    })

    
    return(
        <>

            {/* renders the grid to the screen for any game */}
            <div className="grid" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 15px)`,}}>
                {grid.map((row, i) => {
                    return(
                        row.map((col, k) => {
                            return(
                                <div key={`${i}-${k}`} onClick={() => {
                                    const newGrid = produce(grid, (gridCopy) => {
                                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                    });
                                    setGrid(newGrid)
                                }}
                                style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: grid[i][k] ? 'green' : undefined,
                                    border: "solid 1px grey",
                                }}
                                
                                />
                            )
                        })
                    )
                })}

            </div>
            <div className="buttons">
            <button>{play ? "Stop" : "Start"}</button>
            <button onClick={() => {setGrid(generateEmptyGrid())}}>Reset</button>
            <button onClick={() => {
                const rows = []
                for(let i =0; i < numRows; i++){
                    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0)))
                }
                setGrid(rows)
            }}>Random</button>
            </div>
        </>
    )
}

export default Game;

