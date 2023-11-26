import React from 'react';

const ComicPanelDisplay = ({ comicPanels }) => {
  return (
    <div>
      <h2>Comic Panel Display</h2>
      {comicPanels.map((panel, index) => (
        <div key={index}>
          <img src={panel} alt={`Comic Panel ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ComicPanelDisplay;

