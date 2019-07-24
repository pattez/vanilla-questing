import React from 'react';

function Split({ header, to, tag }) { return (
   <div className="split">
      <div><a href={ to } target='_blank' rel='noopener noreferrer'>{ header }</a></div>
      <div>{ tag }</div>
   </div>
)}

export default Split;