import * as React from "react"
import {
    Grid,
    Paper,
    Stack,
    Container,
    Typography,
    Button
  } from '@mui/material';
import radboud from "./assets/images/radboud.png"


const CustomFooter = () => {

    return (
        <Grid container spacing={1}>
            <Grid item sx={{ marginRight: "auto", marginLeft: "auto" }}>
                ECMS 2024: Fitting Stochastic Lattice models using approximate Gradients - Jan Schering, Sander Keemink, Johannes Textor - Radboud University
            </Grid>
            <Grid item></Grid>
        </Grid>
    )
}

export default CustomFooter