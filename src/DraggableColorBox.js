import React from 'react'
import {withStyles} from '@material-ui/styles'; 
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {SortableElement} from 'react-sortable-hoc';
import styles from './styles/DraggableColorBoxStyles.js';

const DraggableColorBox = SortableElement((props) =>{
    const {classes, handleClick, name, color} =props;
    return (
        <div className={classes.root} style={{backgroundColor:color}}>
            <div className={classes.boxContent}>
            <span>{name}</span>
            <DeleteOutlineIcon className={classes.deleteIcon} onClick={handleClick}/>
        </div>
            
        </div>
    )
})
 
export default withStyles(styles)(DraggableColorBox);
