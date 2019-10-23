import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState';
////////////////////////////////////////////////////////////
// Using Hooks!
////////////////////////////////////////////////////////////
const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height:"calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



function NewPaletteForm(params) {
  const classes = useStyles(); 
  const [open, toggleDrawerBar] = useToggle(false);
  const [currentColor, updateColor]= useState("teal");
  const [colors, updateColors]= useState([{color:"blue",name:"blue"}]);
  const [newName, updateNewName, resetNewName] = useInputState("");
  
  function handleSubmit(){
    let newName="New Test Palette"
    const newPalette = {
      paletteName:newName,
      id:newName.toLowerCase().replace(/ /g,"-"),
      colors:colors
    };
    params.savePalette(newPalette); //callback parent's fn
    params.history.push("/");
  } 
 
  const updateCurrentColor = (newColor) =>{
    updateColor(newColor.hex);
  };

  const addColor = () =>{ 
    const newColor = {color: currentColor, name: newName};

    updateColors([...colors, newColor]);
    resetNewName();
    //add Current Color  
  };

  useEffect(()=>{
      ValidatorForm.addValidationRule('isColorNameUnique', (value)=>{
          return colors.every(
            ({name})=> name.toLowerCase() !==value.toLowerCase()
          );
      });  
      ValidatorForm.addValidationRule('isColorUnique', (value)=>{
        return colors.every(
          ({color})=> color !==currentColor
        );
      });  

  }, [newName,currentColor,colors]);
  //When newName is changed only then excuted.
 
  return (
    <div className={classes.root}>
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>Save Palette</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawerBar}>
              <ChevronLeftIcon /> 
          </IconButton>
        </div>

        <Divider />
        {/* Drawer menu */}


        <Typography variant="h4">
          Design Your Palette 
        </Typography>
        <div>
          <Button variant="contained" color="secondary">Clear Palette</Button>
          <Button variant="contained" color="primary">Random Color</Button>
        </div>
        <ChromePicker color={currentColor} onChange={updateCurrentColor}/>
        <ValidatorForm onSubmit={addColor}>
          <TextValidator 
              value={newName} 
              onChange={updateNewName}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={["This filed is required", "Color name must be unique.","This color is taken."]}
              
              
              />
          <Button variant="contained" 
                  color="primary" 
                  style={{backgroundColor:currentColor}}
                  type="submit"
                  >ADD Color</Button>
        
        </ValidatorForm>
      
    
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} /> 
          {/* body */} 
            {colors.map(color=>(
              <DraggableColorBox key={color.name} color={color.color} name={color.name}/>
            ))}
      </main>
    </div>
  );
};


 export default NewPaletteForm;