import React, { Component } from 'react'
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import {Route, Switch} from 'react-router-dom';
import PaletteList from './PaletteList';

class App extends Component {
  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id ===id
    });

  }
  render() {  
    return (
      <Switch>
        <Route exact path="/" render={(routeProps)=><PaletteList palettes={seedColors} {...routeProps}/>}/> 
        {/* routeProps is to use props history. */}
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
        <Route exact 
               path='/palette/:paletteId/:colorId' 
               render={()=><h1>Single COlor Page</h1>}
        />

      </Switch>
    );
  };
};
 
export default App;