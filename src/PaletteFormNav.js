import React, {useEffect} from 'react'; 
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useInputState from './hooks/useInputState';


function PaletteFormNav(props) {
    const {classes, open, handleSubmit,palettes, toggleDrawerBar} = props;
    const [newPaletteName, updateNewPaletteName]= useInputState("");
    

    useEffect(()=>{ 
        ValidatorForm.addValidationRule('isPaletteNameUnique', ()=>{
          return palettes.every(
              ({paletteName}) => paletteName.toLowerCase() !== newPaletteName.toLowerCase()
            );
        });   
    });
    
    return (
        <div>
        <CssBaseline />
        <AppBar
        color="default"
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawerBar}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={()=>handleSubmit(newPaletteName)}>
                <TextValidator 
                    value={newPaletteName} 
                    onChange={updateNewPaletteName}
                    label="Palette Name"
                    validators={["required", "isPaletteNameUnique"]}
                    errorMessages={["Enter Palette Name", "Palette name must be unique."]}
                    
                    />
                <Button type="submit" variant="contained" color="primary">
                    Save Palette
                </Button>
                
                <Link to='/'>
                    <Button variant="contained" color="secondary">Go Back</Button>
                </Link> 

                </ValidatorForm>
            
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default PaletteFormNav;