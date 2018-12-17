//
// canvasObj.js  - javascript object for canvas handling
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

function canvasObj()
{
  this.status            = -1 ;
  this.canvasName        = "" ;
  this.cobj              = undefined ;
  this.ctx               = undefined ;

  // object methods

  this.initObject        = function( cname ) {
    if ( typeof variable !== 'undefined') if (cname.length > 0 ) this.canvasName = cname ;
    if ( this.canvasName.lenght > 0 )
    {
      if ( this.cobj = document.getElementById(this.canvasName) ) ;
      {
        if ( ctx = canvas.getContext("2d") ) this.status = 0 ;
      }
    }
    return this.status ;
  }

}
