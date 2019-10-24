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
import {makeStyles} from '@material-ui/core/styles';
const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
    root:{
        display:"flex"
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      flexDirection:"row",
      justifyContent:"space-between",
      height:"64px"
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
    navBtns:{

    }

}));

function PaletteFormNav(props) {
    const classes = useStyles(); 
    const {open, handleSubmit,palettes, toggleDrawerBar} = props;
    const [newPaletteName, updateNewPaletteName]= useInputState("");
    

    useEffect(()=>{ 
        ValidatorForm.addValidationRule('isPaletteNameUnique', ()=>{
          return palettes.every(
              ({paletteName}) => paletteName.toLowerCase() !== newPaletteName.toLowerCase()
            );
        });   
    });
    
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
                Create a Palette
            </Typography>

            </Toolbar>
            <div className={classes.navBtns}>
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
                   
                </ValidatorForm> 
                <Link to='/'>
                    <Button variant="contained" color="secondary">Go Back</Button>
                </Link>  
            </div> 
        </AppBar>
        </div>
    )
}

export default PaletteFormNav;