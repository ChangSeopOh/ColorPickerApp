import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button'; 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useInputState from './hooks/useInputState'; 
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from "emoji-mart";
import useToggle from './hooks/useToggle';


function PaletteMetaForm(props) {
  const [newPaletteName, updateNewPaletteName]= useInputState("");
  const [stage, toggleStage]= useToggle(true);
  const {handleSubmit,palettes, toggleSaveForm} = props; 

 const savePalette = (emoji) =>{ 
    const newPalette = {paletteName: newPaletteName, emoji:emoji.native};
    handleSubmit(newPalette);
    toggleSaveForm();
 };
  useEffect(()=>{ 
    ValidatorForm.addValidationRule('isPaletteNameUnique', ()=>{
      return palettes.every(
          ({paletteName}) => paletteName.toLowerCase() !== newPaletteName.toLowerCase()
        );
    });   
});


    return (<div>
                <Dialog open={!stage} onClose={toggleSaveForm} aria-labelledby="form-dialog-emoji">
                <DialogTitle id="form-dialog-emoji">Choose a Palette Emoji</DialogTitle>
                    <Picker title="Pick a Palette Emoji!" onSelect={savePalette}/>
                </Dialog>
                <Dialog open={stage} onClose={toggleSaveForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={toggleStage}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new palette name. Make sure it should be unique.
                            </DialogContentText>
                        
                            <TextValidator 
                                value={newPaletteName} 
                                onChange={updateNewPaletteName}
                                label="Palette Name"
                                fullWidth
                                margin='normal'
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={["Enter Palette Name", "Palette name must be unique."]}
                                />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={toggleSaveForm} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                    Save Palette
                            </Button> 
                        </DialogActions>
                    </ValidatorForm>  
                </Dialog>
            </div>
    )
}

export default PaletteMetaForm;