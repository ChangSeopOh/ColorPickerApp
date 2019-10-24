import sizes from './sizes.js';
import bg from './bg.svg';

export default{ 
    root:{ 
        height: "100%",
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"center",
        backgroundColor: "#e86187", 
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundImage: `url(${bg})`,
        /* background by SVGBackgrounds.com */
        overFlow:"scroll" 
    },
    container:{
        width:"50%",
        display:"flex",
        alignItems:"flex-start",
        flexDirection:"column",
        flexWrap:"wrap"  
    },
    nav:{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color:"white",
        alignItems: "center", 
        "& a":{
            color:"white"
        } 
    },
    palettes: { 
        boxSizing:"border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap:"2.5rem",
        [sizes.down("md")]:{ 
            gridGap:"1.5rem",
            gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down("xs")]:{ 
            gridGap:"1.4rem",
            gridTemplateColumns: "repeat(1, 100%)"
        }

    },
    heading:{
        fontSize:"2rem",
        [sizes.down("xs")]:{ 
            fontSize:"1.5rem",
        }
    }
}