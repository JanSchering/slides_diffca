import * as React from "react"
import {
    Grid,
    Paper,
    Stack,
    Container,
    Typography,
    Button
  } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Slider from '@mui/material/Slider';


// Possible combinations of a cell neighborhood
const numPerturbs = 8

const ruleDim = "30px";

const cellDimBase = 20
const numRowsBase = 20
const numColsBase = 25
const fontSizeBase = 12
const boardSize = 550

/**
 * Cellular Automata JSX
 */
const CA = ()  => {
    const [renderKey, setRenderKey] = React.useState(0)
    const [gridSize, setGridSize] = React.useState(1)
    const [animSpeed, setAnimSpeed] = React.useState(1)
    const [p_success, setP] = React.useState(0.5)

    const codes = Array.from({length: numPerturbs}, (x, i) => i).map(decimal => convertToBinary(decimal))
    let runner;
    let step = 0;

    const useStopCA = () => {
        try {
            clearInterval(runner)
        } catch (e) {}
        step = 0
        const pauseButton = (document.getElementById("pauseButton"))
        pauseButton.disabled = true;
        pauseButton.classList.add("Mui-disabled");
        pauseButton.style.display = "none"
        const stopButton = (document.getElementById("stopButton"))
        stopButton.disabled = true;
        stopButton.classList.add("Mui-disabled")
        const startButton = (document.getElementById("startButton"))
        startButton.disabled = false;
        startButton.classList.remove("Mui-disabled")
        startButton.style.display = "inline-flex"
        setRenderKey(renderKey+1)
    }

    const pauseCA = () => {
        try {
            clearInterval(runner)
        } catch (e) {}
        const pauseButton = (document.getElementById("pauseButton"))
        pauseButton.disabled = true;
        pauseButton.classList.add("Mui-disabled");
        pauseButton.style.display = "none"
        const startButton = (document.getElementById("startButton"))
        startButton.disabled = false;
        startButton.classList.remove("Mui-disabled")
        startButton.style.display = "inline-flex"
    }

    const runCA = () => {
        const rules = codes.map(code => 
            (document.querySelector(`div[id="${code}-rule"]`))
            .style.backgroundColor
            )
        const pauseButton = (document.getElementById("pauseButton"))
        pauseButton.disabled = false;
        pauseButton.style.display = "inline-flex"
        pauseButton.classList.remove("Mui-disabled");
        const stopButton = (document.getElementById("stopButton"))
        stopButton.disabled = false;
        stopButton.classList.remove("Mui-disabled")
        const startButton = (document.getElementById("startButton"))
        startButton.disabled = true;
        startButton.classList.add("Mui-disabled")
        startButton.style.display = "none"
        runner = setInterval(function() {
            handleEvolve(step, rules, gridSize, animSpeed, p_success)
            step++
            if (step >= numRowsBase*Math.pow(2,gridSize-1)) {
                clearInterval(runner)
            }
         }, 500 - (100 * (animSpeed -1)));
         
    }

    const handleGridSizeChange = (newSize) => {
        try {
            clearInterval(runner)
        } catch (e) {}
        setGridSize(newSize)
    }

    const handleSpeedChange= (newSpeed) => {
        try {
            clearInterval(runner)
        } catch (e) {}
        setAnimSpeed(newSpeed)
    }

    return (
      <>
        <Container style={{width: "100%", padding: 0, margin:0, marginLeft: 200}}>
          <Grid container spacing={1}>
            <Grid item sx={{ marginLeft: "auto" }}>
              <Automaton key={renderKey} size={gridSize} />
            </Grid>
            <Grid item xs={5} sx={{ marginRight: "auto" }}>
              <Stack>
                <Grid container spacing={1}>
                  {codes.map((code, idx) => (
                    <Grid item key={`${code}`}>
                      <RuleCard code={code} />
                    </Grid>
                  ))}
                </Grid>
                <Grid container spacing={3} sx={{marginTop: "0px"}}>
                    <Grid item xs={5}>
                        Grid Size:
                    </Grid>
                    <Grid item xs={4}>
                        <Slider
                            aria-label="GridSize"
                            defaultValue={gridSize}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={4}
                            onChangeCommitted={(_, number) => handleGridSizeChange(number)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        Speed:
                    </Grid>
                    <Grid item xs={4}>
                        <Slider
                            aria-label="AnimSpeed"
                            defaultValue={animSpeed}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={4}
                            onChangeCommitted={(_, number) => handleSpeedChange(number)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        P(success):
                    </Grid>
                    <Grid item xs={4}>
                            <Slider
                                aria-label="GridSize"
                                defaultValue={p_success}
                                valueLabelDisplay="auto"
                                step={0.01}
                                marks
                                min={0}
                                max={1}
                                onChangeCommitted={(_, number) => setP(number)}
                            />
                    </Grid>
                </Grid>
                <Grid 
                    container 
                    sx={{
                        width: "max-content", 
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <Grid item>
                        <IconButton 
                            color="primary" 
                            id="startButton"
                            aria-label="simulate CA" 
                            onClick={runCA} 
                            sx={{width: "max-content"}}
                        >
                            <PlayCircleIcon sx={{fontSize: 70}}/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton 
                            color="primary" 
                            id="pauseButton"
                            className="Mui-disabled"
                            aria-label="simulate CA" 
                            onClick={pauseCA} 
                            sx={{width: "max-content", display: "none"}}
                        >
                            <PauseCircleFilledIcon sx={{fontSize: 70}}/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton 
                            color="primary" 
                            id="stopButton"
                            className="Mui-disabled"
                            aria-label="simulate CA" 
                            onClick={useStopCA} 
                            sx={{width: "max-content"}}
                        >
                            <StopCircleIcon sx={{fontSize: 70}}/>
                        </IconButton>
                    </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </>
    );
}

/**
 * Evolve the CA over time.
 */
const handleEvolve = async (step, rules, size, animSpeed, p_success) => {
    const numCols = numColsBase * Math.pow(2, size-1)
    const numRows = numRowsBase * Math.pow(2, size-1)
    const rowCurrent = document.querySelectorAll(`div[id^="r${step+1}-"]`);
    const rowPrev = Array.from(document.querySelectorAll(`div[id^="r${step}-"]`));
    rowCurrent.forEach((cell, idx) => {
        const leftNeighbor = idx === 0 ? rowPrev.slice(-1)[0] : rowPrev[idx-1];
        const rightNeighbor = idx === numCols-1 ? rowPrev[0] : rowPrev[idx+1];
        const lFill = leftNeighbor.style.backgroundColor === 'black';
        const rFill = rightNeighbor.style.backgroundColor === 'black';
        const cFill = rowPrev[idx].style.backgroundColor === 'black';
        if (!lFill && !cFill && !rFill) {
            // 000
            if (rules[0] === "black" && Math.random() < p_success) {
                (
                rowCurrent[idx]
                ).style.backgroundColor = "black";
            }
        } else if (!lFill && !cFill && rFill) {
            // 001
            if (rules[1] === "black" && Math.random() < p_success) {
                (
                rowCurrent[idx]
                ).style.backgroundColor = "black";
            }
        } else if (!lFill && cFill && !rFill) {
            // 010
            if (rules[2] === "black" && Math.random() < p_success) {
                (
                rowCurrent[idx]
                ).style.backgroundColor = "black";
            }
        } else if (!lFill && cFill && rFill) {
            // 011
            if (rules[3] === "black" && Math.random() < p_success) {
                (
                rowCurrent[idx]
                ).style.backgroundColor = "black";
            }
        } else if (lFill && !cFill && !rFill) {
            // 100
            if (rules[4] === "black" && Math.random() < p_success) {
            (rowCurrent[idx]).style.backgroundColor =
                "black";
            }
        } else if (lFill && !cFill && rFill) {
            // 101
            if (rules[5] === "black" && Math.random() < p_success) {
                (
                rowCurrent[idx]
                ).style.backgroundColor = "black";
            }
        } else if (lFill && cFill && !rFill) {
            // 110
            if (rules[6] === "black" && Math.random() < p_success) {
                (
                rowCurrent[idx]
                ).style.backgroundColor = "black";
            }
        } else if (lFill && cFill && rFill) {
            // 111
            if (rules[7] === "black" && Math.random() < p_success) {
                (
                rowCurrent[idx]
                ).style.backgroundColor = "black";
            }
        }
    })
    if (step+1 < numRows) {
        const row = document
            .querySelector(`div[id=r${step+1}]`)
        row.classList.remove("hidden")
        row.classList.add(`animated${animSpeed}`, "fadeInDown");
    }   
}

/**
 * generate a binary string from a given number. If the binary string
 * is shorter than three digits, fills up with leading zeros
 * @param x The decimal number to convert
 */
const convertToBinary = (x) => {
    let bin = 0;
    let rem, i = 1
    while (x != 0) {
        rem = x % 2;
        x = parseInt((x / 2).toString());
        bin = bin + rem * i;
        i = i * 10;
    }
    let result = bin.toString()
    while(result.split("").length < 3) {
        result = "0" + result 
    }
    return result
}

/**
 * Generates a CA cell JSX Element
 */
export const Cell = ({ props = {}, small = false, filled = false, sizeMultiplier=1, pointer=false }) => (
  <Paper
    variant="outlined"
    square
    style={{
      backgroundColor: filled ? "black" : "white",
      width: small ? cellDimBase/Math.pow(2, sizeMultiplier-1) : ruleDim,
      height: small ? cellDimBase/Math.pow(2,sizeMultiplier-1) : ruleDim,
      cursor: pointer? "pointer" : "inherit"
    }}
    {...props}
  />
);

/**
 * Visualize the given rule through HTML
 */
const RuleCard = ({code}) => {
    const [fill, setFill] = React.useState(false)

    return (<Paper elevation={3}  style={{width: 90, height: 100}}>
        <Stack spacing={0}>
            <Grid container spacing={0}>
                {code.split("").map((val, idx) => (
                    <Grid item key={`${code}-${idx}`}>
                        <Cell filled={val === "1"}/>
                    </Grid>
                ))}
            </Grid>
            <div style={{marginLeft: "auto", marginRight: "auto", height: 35}}>
                <ArrowDownwardIcon sx={{ fontSize: 28}} />
            </div>
            <div style={{marginLeft: "auto", marginRight: "auto"}} onClick={() => setFill(!fill)}>
                <Cell 
                    props={{id:`${code}-rule`}} 
                    filled={fill}
                    pointer
                />
            </div>
        </Stack>
    </Paper>)
}

/**
 * Generates the CA as JSX.
 */
const Automaton = ({size}) => {

    const numRows = numRowsBase * Math.pow(2, size-1)
    const numCols = numColsBase * Math.pow(2, size-1)
    const fontSize = fontSizeBase / Math.pow(2, size-1)
     /**
     * Handle the setup of the initial CA state by changing the clicked cell color
     */
    const handleInitClick = (event) => {
        if (event.currentTarget.style.backgroundColor === "black") {
            event.currentTarget.style.backgroundColor = "white";
        } else {
            event.currentTarget.style.backgroundColor = "black";
        }
    }

    return (<Paper elevation={3} sx={{ width: boardSize }}>
        <Stack spacing={0}>
        {Array.from({ length: numRows }, (x, i) => i).map((row) => (
            <Grid 
                container key={`r${row}`} 
                id={`r${row}`}
                className={row === 0 ? "" : "hidden"}
                style={row === 0 ? {cursor: "pointer"} : {}}
            >
                <Grid item sx={{fontSize, width: "50px"}}>
                    Step {row+1}
                </Grid>
                <Grid item>
                    <Grid
                    container
                    spacing={0}
                    >
                        {Array.from({ length: numCols }, (x, i) => i).map((col) => (
                            <Grid item key={`r${row}-c${col}`}>
                                <Cell 
                                    filled={row===0 && col===Math.floor(numCols/2)} 
                                    small 
                                    sizeMultiplier={size}
                                    props={{ id: `r${row}-c${col}`, onClick: handleInitClick}} 
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        ))}
        </Stack>
    </Paper>)
}

export default CA