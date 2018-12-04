//
// queryObj.js  - query parameter handling object
// copyright 2018 ths@ths.one
//
// created : 2018/12/01
// changed : 2018/12/02
// version : 0.5.0
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

// common tools, not limited for queryObj
//

// function decodeQuery( qstr )
//   convert encoded chars & spaces
//   special chars are coded as %XX where XX stands for a 2 digit hexadecimal string
//   space are code as "+"

function decodeQuery( qstr )
{
  var i,c,qlen,rstr;

  qstr=qstr.toString();
  qlen = qstr.length;
  rstr = "";
  if (qlen==0) return rstr;

  i = 0;
  while(i<qlen)
  {
    c=qstr.charAt(i);
    switch(c)
    {
      case '+' :
        c=' '; 
        break;

      case '%' : 
        if (qstr.charAt(i+1) == '%')
        {
          i++;
          break;
        }
        if ( i<(qlen-2) )
        {
          c=String.fromCharCode(parseInt(qstr.substr(i+1,2),16));
          i+=2;
        }
        break;
    }
    i++;
    rstr += c;
  }
  return rstr;
}

// function encodeQuery( qstr )
//   convert everything not in a..zA..Z0..9_ to %XX hexadecimal format
//   and convert spaces to "+"

function encodeQuery( qstr )
{
  var i,cc,qlen,rstr;
  
  qstr=qstr.toString();
  qlen = qstr.length;
  rstr = "";
  if (qlen==0) return rstr;
  for (i=0;i<qlen;i++)
  {
    cc=qstr.charAt(i);
    if (cc==" ") cc="+";
    else  cc=escape(cc);
    rstr+=cc;
  }
  return rstr;
}

// query object definition
//

function queryObj( href, filter ) 
{

  // object properties

  this.url     = "";                // complete url without query string
  this.query   = "";                // complete query string 
  this.qlen    = 0;                 // query length

  this.pcount  = 0;                 // number of parameter pairs (name=value) in query
  this.pnames  = "";                // will contain parameter names
  this.pvalues = "";                // will contain parameter values
  
  this.filter  = filter;
  this.nvdiv   = "=";

  // object methods

  this.initObject  = QO_initObject;
  this.parseQuery  = QO_parseQuery;
  this.getValue    = QO_getValue;
  this.setValue    = QO_setValue;
  this.createQuery = QO_createQuery;

  // object setup
  
  this.initObject( href , filter );
}

function QO_initObject( href , filter )
{
  var hlen,qpos,qstr;
  
  this.url     = href;
  this.filter  = filter;
  
  qstr="";
  
  if (href) if ( (hlen=href.length) > 0)
  {
    // split full href into url and query-string
    qpos = href.indexOf("?");
    if ( (qpos>=0) && (qpos<hlen) )
    {
      if (qpos==0) this.url = "" ;
      else this.url=href.substring(0,qpos);
      qstr=href.substring(qpos+1,hlen) ;
    }
  }
  this.parseQuery(qstr);
  return this.pcount;
}

function QO_parseQuery( qstr )
{
  var p,parr,pc,px,pn,pv;
  
  this.query   = qstr
  this.qlen    = qstr.length;
  this.pstr    = "";
  this.plen    = 0; 
  this.pcount  = 0;
  this.pnames  = new Array();
  this.pvalues = new Array();
  
  if (!this.filter) this.filter="";
  pp=0;

  if (qstr) if (qstr.length > 0)
  {
    // split query into single parameters
    parr = qstr.split("&");
    pc   =  (parr) ?  parr.length : 0;

    for (p=0;p<pc;p++)
    {
      px = parr[p].split(this.nvdiv);
      pn = (px[0]) ? decodeQuery(px[0]) : decodeQuery(parr[p]) ;
      pv = (px[1]) ? decodeQuery(px[1]) : "" ;
      
      // allow only valid names if filter has been defined
      if ( (this.filter.length==0) || (this.filter.indexOf(pn)>=0) )
      {
        this.pnames[this.pcount]  = pn;
        this.pvalues[this.pcount] = pv;
        this.pcount++;
      }
    }  

  }
  return this.pcount;
}

function QO_getValue( pname )
{
  var p;
  for (p=0;p<this.pcount;p++)
  {
    if (this.pnames[p] == pname ) return this.pvalues[p];
  }
  return "";
}

function QO_setValue( pname , pval )
{
  var ov="";
  var p;
  for (p=0;p<this.pcount;p++)
  {
    if (this.pnames[p] == pname ) 
    {
      ov=this.pvalues[p];
      this.pvalues[p]=pval;
      return ov;
    }
  }
  this.pnames[p]  = pname;
  this.pvalues[p] = pval;
  this.pcount++;
  return ov;
}

function QO_createQuery( qupdate )
{
  var p;
  var qstr="";
  for (p=0;p<this.pcount;p++)
  {
    if (p>0) qstr+="&";
    qstr=qstr + encodeQuery(this.pnames[p]) + this.nvdiv + encodeQuery(this.pvalues[p]);
  }
  if (qupdate>0)
  {
    this.query=qstr;
    this.qlen=qstr.length;
  }
  return qstr;
}
