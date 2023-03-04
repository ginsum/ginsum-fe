import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';
import AuthGard from '../components/AuthGard';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Background />
        <Content>
          <AuthGard>
            <Component {...pageProps} />
          </AuthGard>
        </Content>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
