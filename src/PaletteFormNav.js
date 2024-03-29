import React from 'react'; 
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'; 
import Button from '@material-ui/core/Button';  
import PaletteMetaForm from './PaletteMetaForm';
import useToggle from './hooks/useToggle';
import styles from './styles/PaletteFormNavStyles';
//import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
function PaletteFormNav(props) {
    const classes = styles(); 
    const {open, handleSubmit,palettes, toggleDrawerBar} = props;
    const [formShowing, toggleSaveForm]= useToggle(false);

    
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
                className={clsx(classes.menuButton,  {[classes.hide]:open})}
            >
                <AddToPhotosIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Create a Palette
            </Typography>

            </Toolbar>
            <div className={classes.navBtns}>
                <Link to='/'>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className={classes.button}
                    >Go Back</Button>
                </Link>  
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary" 
                    onClick={toggleSaveForm}>
                Save
                </Button>
            </div> 
        </AppBar> 
        {formShowing &&(<PaletteMetaForm 
                handleSubmit={handleSubmit} 
                palettes={palettes}
                toggleSaveForm={toggleSaveForm}/>)}  
        </div>
    )
}

export default PaletteFormNav;