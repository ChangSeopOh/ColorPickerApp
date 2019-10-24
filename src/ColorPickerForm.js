import React, {useEffect, useState} from 'react';
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button';
import { makeStyles} from '@material-ui/core/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import useInputState from './hooks/useInputState';


const useStyles = makeStyles(() => ({
    picker:{
        width:"100% !important",
        marginTop:"2.0rem"
    },
    addColor:{
        width:"100%",
        padding:"0.5rem",
        marginTop:"1rem",
        fontSize:"1rem"
    },
    colorNameInput:{
        width:"100%",
        height:"50px",
        "& input":{
            padding:"10px 12px 10px"
        }
    }
}));

function ColorPickerForm(props) {
    const classes = useStyles(); 
    const {paletteIsFull, colors, addNewColor} = props;
    const [currentColor, updateColor]= useState("teal");
    const [newColorName, updateNewColorName, resetNewColorName] = useInputState("");
    
    
    
    const updateCurrentColor = (newColor) =>{
      updateColor(newColor.hex);
        //   check hex, rgb, or rgba later 
    };


    useEffect(()=>{
        ValidatorForm.addValidationRule('isColorNameUnique', (value)=>{
            return colors.every(
            ({name})=> name.toLowerCase() !==value.toLowerCase()
            );
        });  
        ValidatorForm.addValidationRule('isColorUnique', ()=>{
        return colors.every(
            ({color})=> color !==currentColor
        );
        });  
    });

    const handleSubmit= async ()=>{
        const newColor = {color: currentColor, name: newColorName};
        await addNewColor(newColor);

        resetNewColorName();
    }

    return (
        <div>
            <ChromePicker 
                color={currentColor} 
                onChange={updateCurrentColor}
                className={classes.picker}
            />
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator 
                    variant="filled"
                    className={classes.colorNameInput}
                    margin="normal" 
                    value={newColorName} 
                    onChange={updateNewColorName}
                    validators={["required", "isColorNameUnique", "isColorUnique"]}
                    errorMessages={["This filed is required", "Color name must be unique.","This color is taken."]}
                    placeholder="Color Name"
                    />

            <Button variant="contained" 
                    color="primary" 
                    style={{backgroundColor:paletteIsFull?"gray":currentColor}}
                    type="submit"
                    disabled={paletteIsFull}
                    className={classes.addColor}
                    >
                        
                {paletteIsFull ? "Palette Full":"Add Color"}
            </Button> 
            </ValidatorForm> 
        </div>
    )
}

export default ColorPickerForm;