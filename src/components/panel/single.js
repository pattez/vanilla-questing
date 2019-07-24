import React from 'react';

function Single({ header, to }) { return (
   <div>
      <a href={ to } target='_blank' rel='noopener noreferrer'>{ header }</a>
   </div>
)}

export default Single;