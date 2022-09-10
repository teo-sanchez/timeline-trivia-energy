import styled from 'styled-components';

const colorVariables = {
  lightest: '#fff',
  light: '#F3F4ED',
  light_darker: '#e7e8e1',
  light_darkest: '#d6d7cf',
  super_dark: '#171d22',
  darker_darkest: '#1d232a',
  darkest: '#222831',
  lighter_darkest: '#2a313c',
  dark: '#383d45',
  primary: '#00ADB5',
  primary_darker: '#00a2ab',
  primary_darkest: '#01969e',
  red: '#EA5455',
  green: '#00C897'
}

const PageContainer = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: ${colorVariables.light};
  color: ${colorVariables.dark};

  &.dark {
    background-color: ${colorVariables.lighter_darkest};
  }
`;

const CenterContainer = styled.div`
  display: block;
  margin: 0 auto;
  width: fit-content;
  height: auto;
`;

const ShadowContainer = styled.div`
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 60px;
  width: 100vw;
  height: calc(100vh - 60px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const Button = styled.div.attrs(() => ({
  className: 'btn'
}))`
  width: fit-content;
  height: 40px;
  border-radius: 4px;
  background-color: ${colorVariables.primary};
  color: ${colorVariables.light};
  text-align: center;
  font-size: 18px;
  line-height: 40px;
  padding: 0 10px 0 10px;
  user-select: none;
  cursor: pointer;

  span.material-symbols-outlined {
    padding-left: 10px;
  }

  &:hover {
    background-color: ${colorVariables.primary_darker};
  }
`;

const Icon = styled.span.attrs(() => ({
  className: 'material-symbols-outlined'
}))`
  vertical-align: middle;
`;

export { colorVariables, PageContainer, CenterContainer, ShadowContainer, Button, Icon };