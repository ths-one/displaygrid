//
// browserObj.js  - simple browser features request object
// copyright 2018 ths@ths.one
//
// created : 2018/12/01
// changed : 2018/12/15
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

// TODO : update/test for latest browsers (can't stick to the 90's forever)

function browserObj( smode )
{
  // object properties

  this.infoStr           = "UNKNOWN";
  this.name              = "UNKNOWN";
  this.version           = "UNKNOWN";
  this.type              = "UNKNOWN";
  this.objModel          = "UNKNOWN";
  this.cssEnabled        = false;
  this.canvasSupported   = false;
  this.canvas2DSupported = false;
  this.debugMode         = 0;

  // object methods

  this.initObject    = BO_initObject;
  this.alertBrowser  = BO_alertBrowser;
  this.writeCSS      = BO_writeCSS;
  this.testFeatures  = BO_testFeatures;
  this.getWindowSize = BO_getWindowSize;

  // object setup

  if (smode=="setup") this.initObject();
}

function BO_initObject( mode )
{
  this.infoStr  = navigator.userAgent;
  this.name     = navigator.appName;
  this.version  = parseFloat( navigator.appVersion );

  this.type     = "UNKNOWN";

  if (mode == "DEBUG") this.debugMode = 1 ;

  if ( this.infoStr.indexOf("MSIE") != -1)
    this.type="MSIE";
  else if ( this.infoStr.lastIndexOf("Gecko")  != -1 )
    this.type="MOZILLA";
  else if ( this.infoStr.lastIndexOf("Opera") != -1 )
    this.type="OPERA";
  else if ( this.infoStr.lastIndexOf("Konqueror") != -1 )
    this.type="KONQUEROR";
  else if ( this.infoStr.lastIndexOf("Mozilla")  != -1 )
    this.type="NETSCAPE";

  if ( document.documentElement ) this.objModel = "W3C";
  else if (document.all) this.objModel = "MSIE";
  else if (document.layers) this.objModel = "NETSCAPE";
  else this.objModel = "UNKNOWN";

  this.cssEnabled    = false;
  this.canvasEnabled = false;

  this.testFeatures() ;
  this.getWindowSize() ;

  if (this.debugMode>2) this.alertBrowser();
}

function BO_alertBrowser()
{
  alert( "alertBrowser(): \nname = " + this.name +
         " \nVersion = " + this.version  +
         " \nType = " + this.type +
         " \nObjectModel = " + this.objModel +
         " \ncssEnabled = " + this.cssEnabled +
         " \ncanvasSupported = " + this.canvasSupported +
         " \ncanvas2DSupported = " + this.canvas2DSupported +
         " \nwindow with = " + this.winWidth +
         " \nwindow height = " + this.winHeight +
         " \nstring  = " + this.infoStr
       );
}

function BO_writeCSS()
{
  document.write( "<style type=\"text/css\"><!--\n" );
  document.write( "#testlayer{position: absolute; top: 50px; left: 0px;}\n" );
  document.write( "--></style>\n" );
  document.write( "<div id=\"testlayer\" style=\"position: absolute; top: 50px; left: 0px;\">\n  gagagag &nbsp;\n</div>\n");
}

function BO_testFeatures()
{
  var tobj ;
  var tpos = 0;

  if (this.objModel == "NETSCAPE")
    tpos = ( tobj = document.layers['testlayer'] ) ? parseInt( tobj.top) : 0;
  else if (this.objModel == "MSIE")
    tpos = ( tobj=document.all['testlayer'] ) ? parseInt( tobj.style.top ) : 0;
  else if (this.objModel == "W3C")
  {
    tpos = ( tobj=document.getElementById('testlayer')) ? parseInt( tobj.style.top ) : 0;
    this.canvasSupported   = !!window.HTMLCanvasElement;
    this.canvas2DSupported = !!window.CanvasRenderingContext2D;
  }

  this.cssEnabled = (tpos==50) ? true : false;
  if ( this.debugMode > 2 ) alert( "BO_testCSS(): testlayer object = " + String(tobj) ) ;
}

function BO_getWindowSize()
{
  if (typeof window.innerWidth != 'undefined')
  {
    this.winWidth  = window.innerWidth,
    this.winHeight = window.innerHeight
  }
}


