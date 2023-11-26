import React, { useState } from 'react';
import ComicPanelDisplay from './ComicPanelDisplay';

const ComicPanelForm = ({ onGenerateComic }) => {
  const [panelTexts, setPanelTexts] = useState(['']);
  const [lastIndex, setLastIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  // const history = useHistory();

  const handleChange = (index, value) => {
    const newPanelTexts = [...panelTexts];
    newPanelTexts[index] = value;
    setPanelTexts(newPanelTexts);
  };
  const handleAddInput = () => {
    setPanelTexts([...panelTexts, '']);
    setLastIndex(panelTexts.length);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before generating
    try {
      await onGenerateComic(panelTexts);
    } catch (error) {
      console.error("Error generating comic panels:", error);
    } finally {
      setLoading(false); // Set loading back to false after generating (whether successful or not)
    }

    // history.push('/comic-panel-display');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Comic Panel Form</h2>
      {panelTexts.map((text, index) => (
        <div key={index}>
          <label>Panel {index + 1}:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          {loading && <div>
      <iframe
        src="https://giphy.com/embed/jAYUbVXgESSti"
        width="480"
        height="270"
      ></iframe>
    </div>}
          
      {index === lastIndex && <button className="btn btn-dark mx-1 mb-1" type="button" onClick={handleAddInput}>
          <i className="fa fa-plus"></i>
      </button>}
      
      
        </div>
      ))}
      
      
      <button className="btn btn-outline-secondary" type="submit">Generate Comic</button>
    </form>
  );
};

export default ComicPanelForm;
