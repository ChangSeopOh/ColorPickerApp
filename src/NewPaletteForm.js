import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import {arrayMove} from 'react-sortable-hoc';
import useToggle from './hooks/useToggle';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm';
import PaletteFormNav from './PaletteFormNav';
////////////////////////////////////////////////////////////
// Using Hooks!
////////////////////////////////////////////////////////////
const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
    display:"flex",
    alignItems:"center"
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
  container:{
    width:"90%",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },
  buttons:{
    width:"100%"
  },
  button:{
    width:"50%" 
  }
}));



function NewPaletteForm(params) {

  const {maxColors = 20, palettes} = params; //defaultProps
  const classes = useStyles(); 
  const [open, toggleDrawerBar] = useToggle(false);
  const [colors, updateColors]= useState(palettes[0].colors);
  const paletteIsFull =  colors.length>=maxColors;

  const handleSubmit= (newPalette) =>{
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g,"-");
    newPalette.colors = colors;
    params.savePalette(newPalette); //callback parent's fn
    params.history.push("/");
  };

  const addNewColor = (newColor) =>{ 
    updateColors([...colors, newColor]);
  };

  const removeColor=(colorName)=>{
    updateColors(colors.filter(color=>color.name!==colorName));
  };

  const onSortEnd = ({oldIndex,newIndex})=>{
    updateColors(arrayMove(colors,oldIndex,newIndex));
  };

  const clearColors = () =>{
    updateColors([]);
  };

  const randomColors = ()=>{
    //pick random color from existing palettes
    const allColors = palettes.map(p=>p.colors).flat();

    const filteredArr = allColors.filter(c => !colors.includes(c));

    let number = Math.floor(Math.random() * filteredArr.length);
    const randomColor = filteredArr[number];

    updateColors([...colors, randomColor]);

    
  };

  //When newName is changed only then excuted.
 
  return (
    <div className={classes.root}>
      <PaletteFormNav 
          open={open}  
          palettes={palettes}
          handleSubmit={handleSubmit}
          toggleDrawerBar={toggleDrawerBar}
      />

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

        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette 
          </Typography>
          <div className={classes.buttons}>
            <Button className={classes.button} variant="contained" color="secondary" onClick={clearColors}>Clear Palette</Button>
            <Button className={classes.button} 
                    variant="contained" 
                    color="primary" 
                    onClick={randomColors}  
                    disabled={paletteIsFull}>Random Color</Button>
          </div>
        
          <ColorPickerForm 
                paletteIsFull={paletteIsFull} 
                addNewColor={addNewColor}
                colors={colors}
          />
        </div>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} /> 
          {/* body */} 
         <DraggableColorList 
              colors={colors} 
              removeColor={removeColor}
              axis='xy'
              onSortEnd={onSortEnd}
          />
      </main>
    </div>
  );
};


 export default NewPaletteForm;