import React, {useEffect, useState} from 'react';
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import useInputState from './hooks/useInputState';



function ColorPickerForm(props) {
    const {paletteIsFull, colors, addNewColor} = props;
    const [currentColor, updateColor]= useState("teal");
    const [newColorName, updateNewColorName, resetNewColorName] = useInputState("");
    
    
    const updateCurrentColor = (newColor) =>{
      updateColor(newColor.hex);
        //   check hex, rgb, or rgba
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
            <ChromePicker color={currentColor} onChange={updateCurrentColor}/>
            <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator 
                value={newColorName} 
                onChange={updateNewColorName}
                validators={["required", "isColorNameUnique", "isColorUnique"]}
                errorMessages={["This filed is required", "Color name must be unique.","This color is taken."]}
                />

            <Button variant="contained" 
                    color="primary" 
                    style={{backgroundColor:paletteIsFull?"gray":currentColor}}
                    type="submit"
                    disabled={paletteIsFull}
                    >
                        
                {paletteIsFull ? "Palette Full":"Add Color"}
            </Button> 
            </ValidatorForm> 
        </div>
    )
}

export default ColorPickerForm;