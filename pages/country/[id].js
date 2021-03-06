import Layout from '../../components/layout'
import Head from 'next/head'
import unfetch from 'isomorphic-unfetch'
// import slug from 'slug'

function CharacterDetail({ country }) {
  return (
    <Layout>
      <Head>
        <title>Ana sayfa</title>
      </Head>

      <h1>{country.name}</h1>

      <figure>
        <img src={country.flag} alt={country.name} />
      </figure>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await unfetch('https://restcountries.eu/rest/v2/all/')
  const countries = await data.json()

  const paths = countries.map((country) => {
    return { params: { id: `${country.alpha3Code}` } }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const data = await unfetch(
    'https://restcountries.eu/rest/v2/alpha/' + params.id
  )
  const country = await data.json()

  return {
    props: {
      country
    }
  }
}

export default CharacterDetail
