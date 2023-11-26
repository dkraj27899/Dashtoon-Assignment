import './App.css';
import React, { useState } from 'react';
import ComicPanelForm from './components/ComicPanelForm';
import ComicPanelDisplay from './components/ComicPanelDisplay';
import Navbar from './components/Navbar';
import {Login} from './components/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
// import { AuthContext } from './context/AuthContext';

function App() {
  // const {currentUser} = useContext(AuthContext);
  // const RequireAuth = ({children})=>{
  //   return currentUser ? (children) : <Navigate to="/login"/>
  // };
  // console.log(currentUser)
//   const [currentForm, setCurrentForm] = useState('Login');

//  const toggleForm = (formName)=>{
//   setCurrentForm(formName);
//  }


  const [generatedPanels, setGeneratedPanels] = useState([]);

  const generateComicPanels = async (panelTexts) => {
    try {
      const generatedPanels = await Promise.all(
        panelTexts.map(async (text) => {
          const response = await fetchImageFromAPI(text);
          const imageUrl = URL.createObjectURL(await response.blob());
          return imageUrl;
        })
      );

      setGeneratedPanels(generatedPanels);
    } catch (error) {
      console.error("Error generating comic panels:", error);
    }
  };

  const fetchImageFromAPI = async (text) => {
    const API_URL = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
    const API_KEY = "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";

    const headers = {
      "Accept": "image/png",
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    };

    const payload = {
      inputs: text,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return response;
    } catch (error) {
      console.error("Error fetching image from API:", error);
      throw error;
    }
  };

  const handleSave = (e) => {
    const zip = new JSZip();
    generatedPanels.forEach((image, index) => {
      const fileName = `comic_panel_${index + 1}.png`;
      zip.file(fileName, fetch(image).then(response => response.blob()));
    });
  
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const zipFileName = 'generated_comic_panels.zip';
      saveAs(content, zipFileName);
    });
  };


  return (
    <>
   
    <div className="App">
    <Navbar handleSave={handleSave}/>
    <ComicPanelForm onGenerateComic={generateComicPanels} />
        <ComicPanelDisplay comicPanels={generatedPanels} />
        
    <Router>
      <Routes>
        <Route path="/login" element={ <Login/>}/>
      
      </Routes>
      </Router>
    </div>
    
    
    </>
  );
}

export default App;

