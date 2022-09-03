import styled from 'styled-components';

const colorVariables = {
  light: '#F3F4ED',
  darker_darkest: '#1d232a',
  darkest: '#222831',
  lighter_darkest: '#2a313c',
  dark: '#393E46',
  primary: '#00ADB5',
  red: '#EA5455'
}

const PageContainer = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: ${colorVariables.lighter_darkest};
  color: ${colorVariables.light};
`;

const CenterContainer = styled.div`
  display: block;
  margin: 0 auto;
  width: fit-content;
  height: auto;
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
`;

const Icon = styled.span.attrs(() => ({
  className: 'material-symbols-outlined'
}))`
  vertical-align: middle;
`;

export { colorVariables, PageContainer, CenterContainer, Button, Icon };