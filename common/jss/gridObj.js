//
// displaygrid.js  - javascript source for diplaygrid
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

function gridObj()
{
  // status properties

  this.gridWidth    = -1 ;
  this.gridHeight   = -1 ;
  this.cellWidth    = -1 ;
  this.cellHeight   = -1 ;
  this.borderWidth  = -1 ;
  this.borderHeight = -1 ;

  // object methods

  this.initObject    = GridO_initObject;

}

function GridO_initObject( gw, gh , cw , ch , bw, bh )
{
  this.gridWidth  = gw ;
  this.gridHeight = gh ;
  this.cellWidth  = cw ;
  this.cellHeight = ch ;
  this.borderWidth  = bw ;
  this.borderHeight = bh ;
}

