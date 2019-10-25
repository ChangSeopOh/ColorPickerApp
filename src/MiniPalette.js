import React from 'react';
import {withStyles} from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';
function MiniPalette(props){
    const {classes, paletteName, emoji, colors, handleClick, openDialog, id} = props; //unique id
    const miniColorBoxes = colors.map(color=>(
        <div key={color.name} className={classes.miniColor} style={{backgroundColor:color.color}}></div>
    ));

    const openDeletePalette = (e) =>{
        e.stopPropagation();//prevent previous event.(render to palette)
        openDialog(id);
    };

    return(
        <div className={classes.root} onClick={handleClick}>
            <div className={classes.delete}>
                <DeleteIcon className={classes.deleteIcon} onClick={openDeletePalette}/>
            </div>
            <div className={classes.colors} >
                {miniColorBoxes}
            </div>
                <h5 className={classes.title}>{paletteName} <span className="classes.emoji">{emoji}</span></h5>
        
        </div>
    );
}

export default withStyles(styles)(MiniPalette);