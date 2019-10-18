import React, { Component } from 'react'
import './ColorBox.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {withRouter, Link} from 'react-router-dom';
import chroma from 'chroma-js';

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {copied:false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState(){
        this.setState({copied:true},()=>{
            setTimeout(()=>this.setState({copied:false}), 1500); 
        });

    }

    render() {
        const {name, background, moreUrl, showLink} = this.props;
        const {copied} = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.7;


        return (
            // onCopy is callback fn
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div className="ColorBox" style={{background}}>
                <div className={`copy-overlay ${copied&&"show"}`} style={{background}}/>
                <div className={`copy-msg ${copied&&"show"}`}>
                    <h1>copied!</h1> 
                    <p className={isLightColor?"dark-text":''}>{background}</p>
                </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span className={isDarkColor?"light-text":''}>{name}</span>
                    </div>
                        <button className={`copy-button ${isLightColor&& "dark-text"}`}>Copy</button>
                </div>
                {showLink&& (
                    <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className={`see-more ${isLightColor&& "dark-text"}`}>More</span>
                    </Link>
                )}
                {/* stopPropagation stop parent event.  */}
              
            </div>
            </CopyToClipboard>
        )
    }
}

export default withRouter(ColorBox);
