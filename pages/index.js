import React, { useState, useMemo } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import Link from 'next/Link';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, capitalize } from '@mui/material';

import styles from "../styles/PokemonList.module.css";

const PokemonList = ({ pokemonList }) => {
  const [pageSize, setPageSize] = useState(50);
  const router = useRouter();

  const columns = useMemo(() => [
    {
      field: 'name', headerName: 'Name', valueGetter: params => (`${capitalize(params.row.name)}`), flex: 1.5, sortable: false
    },
    { field: 'url', headerName: 'Details', renderCell: params => (
      <Link href={`/pokemon/${params.row.url.split('pokemon/')[1].replace('/' , '')}`}>View Details</Link>
    ), sortable: false, flex: 0.5 }
  ], []);

  const handleFilterByName = e => {
    if (e.target.value) {
      router.replace({
        pathname: '/',
        query: { name: e.target.value },
      });
    } else {
      router.replace('/');
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TextField
          label='Search by Pokemon name'
          variant='standard'
          sx={{
            width: '250px', placeSelf: 'flex-end', marginRight: '70px',
          }}
          onChange={handleFilterByName}
        />
        <DataGrid
          autoHeight
          disableColumnMenu
          columns={columns}
          getRowId={row => row.url}
          initialState={{
            sorting: {
              sortModel: [{ field: 'name', sort: 'asc' }]
            }
          }}
          pageSize={pageSize}
          rows={pokemonList}
          rowsPerPageOptions={[25, 50, 100]}
          sx={{ padding: '0 20px', marginTop: '50px', width: '700px' }}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
      </main>
    </div>
  );
}

export default PokemonList;

export async function getServerSideProps({ query: { name: filterName } }) {
  const pokemonListResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1154')
    .then(res => res.json());
  const regexp = new RegExp(filterName, 'i');

  const pokemonList = pokemonListResponse.results.filter(pokemon => regexp.test(pokemon.name));

  return {
    props: {
      pokemonList,
    },
  }
}
