import React, { Component } from 'react'
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import {Route, Switch} from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id ===id
    });

  }
  render() {  
    return (
      // Need to care of order of Links
      <Switch>
        <Route exact
               path="/palette/new"
               render={()=><NewPaletteForm/>} 
        />

        <Route exact 
              path='/palette/:paletteId/:colorId' 
              render={(routeProps)=>
                <SingleColorPalette 
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                                  this.findPalette(
                                    routeProps.match.params.paletteId))}
                />}
        />

        <Route 
              exact 
              path="/palette/:id" 
              render={(routeProps)=>
              <Palette 
                      palette={generatePalette(
                                this.findPalette(
                                  routeProps.match.params.id))}
              />}
        />  
          <Route 
                exact 
                path="/" 
                render={(routeProps)=><PaletteList palettes={seedColors} {...routeProps}/>}/> 
                {/* routeProps is to use props history. */}
          

      </Switch>
    );
  };
};
 
export default App;