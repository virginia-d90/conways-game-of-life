import React from "react";

function Rules(){
    return(
        <div>
        <ol className="rules">
            <li>Any live cell with fewer than two live neighbors will die, as if by underpopulation.</li>
            <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
            <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
            <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
        </ol>
        </div>
    )
}

export default Rules;