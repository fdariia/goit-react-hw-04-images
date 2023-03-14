import { useState } from 'react';
import '../index.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [query, setQuery] = useState('');

  const handleFormSubmit = query => {
    setQuery(query);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery query={query} />
    </div>
  );
};

export default App;
