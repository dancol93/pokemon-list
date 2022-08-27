import * as React from 'react';
import Head from "next/head";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import styles from "../styles/Home.module.css";

const Home = ({ pokemonList }) => {
  console.log(pokemonList);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Pokemon
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>
            pages/index.js</code>
        </p>

      </main>
    </div>
  );
}

export default Home;

export async function getServerSideProps({ query: { name: filterName }}) {
  console.log(filterName);
  const pokemonListResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1154')
    .then(res => res.json());

  const pokemonList = pokemonListResponse.results.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return {
    props: {
      pokemonList,
    },
  }
}
