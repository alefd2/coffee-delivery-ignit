import styled from "styled-components"

export const HomeContainer = styled.main`
  margin-top: 5rem;
  position: relative;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("src/assets/img/Background.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: -5px -10px;
    filter: blur(10px) opacity(0.8);
    z-index: -1;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 3rem;
  }
`

export const Banner = styled.section`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const BannerRight = styled.section`
  @media only screen and (max-width: 768px) {
    padding: 24px;
  }
`

export const BannerLeft = styled.section`
  @media only screen and (max-width: 768px) {
    img {
      width: 100%;
    }
  }
`

export const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 80rem;
  margin: 0 auto;

  margin-top: 108px;

  h1 {
    font-family: "Baloo 2", cursive;
    font-size: 2rem;
    font-weight: 800;
    line-height: 130%;
    color: ${(props) => props.theme["base-subtitle"]};
  }

  @media only screen and (max-width: 768px) {
    padding: 0 32px;
  }
`

export const CoffeeSection = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
