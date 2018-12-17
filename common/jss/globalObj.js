//
// globalObj.js  - global object for handling global settings
// copyright 2018 ths@ths.one
//
// created : 2018/12/01
// changed : 2018/12/16
// version : 0.5.1
//
// This Application and all its containing files is free software; you 
// can redistribute it and/or modify it under the terms of the GNU 
// General Public License as published by the Free Software Foundation; 
// either version 2 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful, but 
// WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
// or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License 
// for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
//

// global defaults
//

DEFAULT_GRIDWIDTH    = 200 ;
DEFAULT_GRIDHEIGHT   = 200 ;
DEFAULT_CELLWIDTH    = 10  ;
DEFAULT_CELLHEIGHT   = 10  ;
DEFAULT_BORDERWIDTH  = 2   ;
DEFAULT_BORDERHEIGHT = 2   ;
DEFAULT_CANVAS       = "DGcanvas" ;

// global configuration object

function globalObj( smode )
{
  // status properties
  
  this.objQuery     = new queryObj("","");

  this.rootMode      = -1;
  this.testMode      = -1;
  this.debugMode     = -1;
  this.action        = "";
  this.search        = "";
  this.language      = "";

  this.displayGrid   = new gridObj( ) ;
  this.displayWin    = new canvasObj( ) ;

  // object methods

  this.initObject    = GO_initObject;
  this.updateQuery   = GO_updateQuery;
  this.updateValues  = GO_updateValues;
  this.callValues    = GO_callValues;
  this.alertValues   = GO_alertValues;

  // object setup

  if (smode=="setup") this.initObject();
}

function GO_initObject() 
{
  var pc;
  // read query string first
  pc=this.objQuery.initObject(self.location.href,"ROOT:DEBUG:TEST:ACTION:gridwidth:gridheight:cellwidth:cellheight:borderwidth:borderheight"); 

  // will be used only if root=GAGA is set, otherwise we use top.name
  if ( this.objQuery.getValue("ROOT") == "GAGA" ) this.rootMode  = 1;
  else this.rootMode  = 0;

  if (pc>0) 
  {
    this.updateQuery();
    this.qmethod="GET";
  }
  else
  {
    this.qmethod="JS";
    this.updateValues();
  }
}

function GO_updateQuery()
{
  var query      = this.objQuery.createQuery(1);
  this.updateValues();
}

function GO_updateValues()
{
  this.testMode    = parseInt(this.objQuery.getValue("TEST"));
  if (isNaN(this.testMode)) this.testMode=0 ;
  this.debugMode   = parseInt(this.objQuery.getValue("DEBUG")) ;
  if (isNaN(this.debugMode)) this.debugMode=0 ;

  this.action      = this.objQuery.getValue("ACTION");
  this.language    = this.objQuery.getValue("LANGUAGE");

  var gw = parseInt(this.objQuery.getValue("gridwidth")) ;
  var gh = parseInt(this.objQuery.getValue("gridheight")) ;
  var cw = parseInt(this.objQuery.getValue("cellwidth")) ;
  var ch = parseInt(this.objQuery.getValue("cellheight")) ;
  var bw = parseInt(this.objQuery.getValue("borderwidth")) ;
  var bh = parseInt(this.objQuery.getValue("borderheight")) ;

  if ( (isNaN( gw )) || ( this.gw <= 0 ) ) gw = DEFAULT_GRIDWIDTH ;
  if ( (isNaN( gh )) || ( this.gh <= 0 ) ) gh = DEFAULT_GRIDHEIGHT ;
  if ( (isNaN( cw )) || ( this.cw <= 0 ) ) cw = DEFAULT_CELLWIDTH ;
  if ( (isNaN( ch )) || ( this.ch <= 0 ) ) ch = DEFAULT_CELLHEIGHT ;
  if ( (isNaN( bw )) || ( this.bw <= 0 ) ) bw = DEFAULT_BORDERWIDTH ;
  if ( (isNaN( bh )) || ( this.bh <= 0 ) ) bh = DEFAULT_BORDERHEIGHT ;

  this.displayGrid.initObject( gw, gh, cw, ch, bw, bh );

  this.displayWin.initObject( DEFAULT_CANVAS );
}

function GO_callValues()
{
  return "?rootMode=" + this.rootMode +
         "+testMode=" + this.testMode  +
         "+debugMode=" + this.debugMode +
         "+action=" + this.action +
         "+gridWidth=" + this.displayGrid.gridWidth  +
         "+gridHeigth=" + this.displayGrid.gridHeight +
         "+cellWidth=" + this.displayGrid.cellWidth  +
         "+cellHeigth=" + this.displayGrid.cellHeight +
         "+borderWidth=" + this.displayGrid.borderWidth  +
         "+borderHeigth=" + this.displayGrid.borderHeight ;
}

function GO_alertValues()
{
  alert( "GO_alertValues(): \nrootMode = " + this.rootMode +
         " \ntestMode      = " + this.testMode  +
         " \ndebugMode     = " + this.debugMode +
         " \naction        = " + this.action +
         " \ngridWidth     = " + this.displayGrid.gridWidth  +
         " \ngridHeigth    = " + this.displayGrid.gridHeight +
         " \ncellWidth     = " + this.displayGrid.cellWidth  +
         " \ncellHeigth    = " + this.displayGrid.cellHeight +
         " \nborderWidth   = " + this.displayGrid.borderWidth  +
         " \nborderHeigth  = " + this.displayGrid.borderHeight +
         " \ncanvas name   = " + this.displayWin.canvasName  +
         " \ncanvas object = " + JSON.stringify(this.displayWin.cobj) +
         " \n2D contex     = " + JSON.stringify(this.displayWin.ctx)
       );
}


