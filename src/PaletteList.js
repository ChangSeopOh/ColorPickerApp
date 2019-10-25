import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state={
            openDeleteDialog:false,
            deleteingId:""
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    openDialog(id){
        this.setState({openDeleteDialog : !this.state.openDeleteDialog,
                       deleteingId: id });
    }
    
    closeDialog(){
        this.setState({openDeleteDialog : !this.state.openDeleteDialog,
                       deleteingId: "" });
    }
    
    goToPalette(id){
        this.props.history.push(`/palette/${id}`);
    }

    handleDelete(){
        this.props.deletePalette(this.state.deleteingId);
        this.closeDialog();

    }
    render() {
        const {palettes, classes} =this.props;
        const {openDeleteDialog} = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">create Palette</Link>
                    </nav> 
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette=>(
                            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                                <MiniPalette 
                                    key={palette.id} 
                                    id={palette.id} 
                                    {...palette} 
                                   // handlePalette={deletePalette}
                                    openDialog={this.openDialog}
                                    handleClick={()=> this.goToPalette(palette.id)}/> 
                            </CSSTransition>
                        ))}
                    </TransitionGroup>    
                </div> 
                <Dialog open={openDeleteDialog} onClose={this.openDeleteDialog} aria-labelledby="delete-dialog-title" >
                    <DialogTitle id="delete-dialog-title">
                        Do you want to delete this palette?
                        <List>
                            <ListItem button onClick={this.handleDelete}>
                                <ListItemAvatar>
                                    <Avatar style={{backgroundColor:blue[100], color:blue[600]}}>
                                        <CheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Delete'/>
                            </ListItem> 
                            <ListItem button onClick={this.closeDialog}>
                                <ListItemAvatar>
                                <Avatar style={{backgroundColor:red[100], color:red[600]}}>
                                        <CloseIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Cancel'/>
                            </ListItem> 
                        </List>
                    </DialogTitle>
                </Dialog>
           
            </div>
        )
    }
}

export default  withStyles(styles)(PaletteList);