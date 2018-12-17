//
// main.js  - main javascript source for diplaygrid
// copyright 2018 ths@ths.one
//
// created : 2018/12/15
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

// globals

var curBrowser  = new browserObj("");
var curSettings = new globalObj("");

function checkContinue()
{
  var nbase = "";

  curBrowser.initObject();

  if ( ( curBrowser.objmodel == "UNKNOWN" ) || ( ! curBrowser.cssEnabled) )
    return "./common/errors/nocss.html";

  if ( ( ! curBrowser.canvasSupported ) || ( ! curBrowser.canvas2DSupported ) )
    return "./common/errors/nocanvas.html";

  // ok, browser seems to be ok, so check for parameters

  curSettings.initObject();

  if (curSettings.action == "check")
  {
    curBrowser.alertBrowser() ;
    curSettings.alertValues() ;
    curSettings.action = "" ;
    nbase = "index.html";
  }
  return nbase;
}

function doContinue()
{
  var newurl=checkContinue() ;
  if (newurl.length > 0)
  {
    top.location.href = newurl + curSettings.callValues();
  }
}

function doResize()
{
  curBrowser.getWindowSize();
}
