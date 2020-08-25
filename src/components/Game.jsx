import React, {useState, useCallback, useRef} from "react";
import produce from "immer";

const numRows = 25;
const numCols = 40;

const neighborLoc = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
]


const generateEmptyGrid = () => {
    const rows = [];
    
    for(let i = 0; i < numRows; i++){
        rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
    
}

function Game(){
    // setting state
    const [play, setPlay] = useState(false);
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    })
    const [gen, setGen] = useState(0)
    

    const playRef = useRef(play);
    playRef.current = play

    const playing = useCallback(() => {
        if(!playRef.current){
            return
        }

       
       
        setGrid((oldGrid) => {
            
            return produce(oldGrid, gridCopy => {
                for(let i=0; i < numRows; i++){
                    for(let j=0; j < numCols; j++){
                        let nb = 0;
                        neighborLoc.forEach(([x, y]) => {
                            const nI = i + x;
                            const nJ = j + y;

                            if(nI >= 0 && nI < numRows && nJ >= 0 && nJ < numCols){
                                nb += oldGrid[nI][nJ]
                            }
                        })
                        if(nb < 2 || nb > 3){
                            gridCopy[i][j] = 0;
                        } else if(oldGrid[i][j] === 0 && nb === 3){
                            gridCopy[i][j] = 1
                        }
                    }  
                }
            })
        })

        
        setTimeout(playing, 100)
    }, [])

   

    
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
            <button onClick={() => {setPlay(true); playRef.current = true; playing()}}>Start</button>
            <button onClick={() => {setPlay(false); playRef.current = false;}}>Stop</button>
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

