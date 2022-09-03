import styled from 'styled-components';

const colorVariables = {
  light: '#F3F4ED',
  darker_darkest: '#3c403c',
  darkest: '#424642',
  lighter_darkest: '#4c504c',
  dark: '#536162',
  primary: '#C06014',
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

const Icon = styled.span.attrs(() => ({
  className: 'material-symbols-outlined'
}))`
  vertical-align: middle;
`;

export { colorVariables, PageContainer, CenterContainer, Icon };