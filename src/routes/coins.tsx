import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { fetchCoins } from "../api"
import { Helmet } from "react-helmet-async"
const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CoinsList = styled.ul`
    
`

const Coin = styled.li`
    background-color: ${props => props.theme.cardBgColor};
    color: ${props => props.theme.textColor};
    font-size: 32px;
    padding: 20px;
    margin-bottom: 10px;
    border: 1px solid white;

    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

const Loader = styled.span`
  text-align: center;
  display: block;
`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)

  return (
    <Container>
      <Helmet>
        <title>Coins!</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ?
        <Loader>Loading...</Loader> :
        <CoinsList>
          {data?.slice(0, 100).map(coin =>
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name }
              }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>)
          }
        </CoinsList>
      }
    </Container>
  )
}

export default Coins