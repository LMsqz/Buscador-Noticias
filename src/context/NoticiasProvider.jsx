import axios from 'axios';
import { useState, useEffect, createContext } from 'react';

const NoticiasContext = createContext();

const NoticiasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState('general');
  // resulta para mostrar todos
  const [noticias, setNoticias] = useState([]);
  // paginacion de noticias
  const [pagina, setPagina] = useState(1);
  // de cuantas paginacion existe o nº paginasç
  const [totalNoticias, setTotalNoticias] = useState(0);

  // llamar al APPi
  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&page=${pagina}&category=${categoria}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;

      const { data } = await axios(url);

      setNoticias(data.articles);
      setTotalNoticias(data.totalResults);
    };
    consultarAPI();
  }, [pagina]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;

      const { data } = await axios(url);

      setNoticias(data.articles);
      setTotalNoticias(data.totalResults);
      setPagina(1);
    };
    consultarAPI();
  }, [categoria]);

  // pasara la categoria
  const handleChangeCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleChangePagina = (e, valor) => {
    setPagina(valor);
  };

  return (
    <NoticiasContext.Provider
      value={{
        categoria,
        handleChangeCategoria,
        noticias,
        totalNoticias,
        handleChangePagina,
        pagina,
      }}
    >
      {children}
    </NoticiasContext.Provider>
  );
};

export { NoticiasProvider };

export default NoticiasContext;
