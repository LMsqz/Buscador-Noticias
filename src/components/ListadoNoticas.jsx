import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useNoticias from '../hooks/useNoticias';
import Noticia from './Noticia';

const ListadoNoticas = () => {
  // extar las noticas
  const { noticias, totalNoticias, handleChangePagina, pagina } = useNoticias();
  // numeracion de paginas
  const totalPaginas = Math.ceil(totalNoticias / 20);

  return (
    <>
      <Typography textAlign={'center'} margin={5} variant='h3' component={'h2'}>
        Ultimas Noticas
      </Typography>

      <Grid container spacing={2}>
        {noticias.map((noticia) => (
          <Noticia key={noticia.url} noticia={noticia} />
        ))}
      </Grid>

      <Stack
        sx={{
          marginY: 5,
        }}
        spacing={2}
        direction={'row'}
        justifyContent='center'
        alignItems='center'
      >
        <Pagination
          count={totalPaginas}
          color='primary'
          onChange={handleChangePagina}
          page={pagina}
        />
      </Stack>
    </>
  );
};

export default ListadoNoticas;
