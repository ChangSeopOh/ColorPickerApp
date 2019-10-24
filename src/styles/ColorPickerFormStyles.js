import { makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    picker:{
        width:"100% !important",
        marginTop:"2.0rem"
    },
    addColor:{
        width:"100%",
        padding:"0.5rem",
        marginTop:"1rem",
        fontSize:"1rem"
    },
    colorNameInput:{
        width:"100%",
        height:"50px",
        "& input":{
            padding:"10px 12px 10px"
        }
    }
}));


export default useStyles;