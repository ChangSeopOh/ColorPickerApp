import sizes from './sizes.js';

export default{ 
    root:{
        backgroundColor:"skyblue",
        height: "100vh",
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"center"
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
            gridGap:"1rem",
            gridTemplateColumns: "repeat(1, 100%)"
        }

    }
}