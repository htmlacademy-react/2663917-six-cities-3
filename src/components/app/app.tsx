import Main from '../../pages/main/main';

type AppProps = {
    placesToStayNumber: number;
}

function App({placesToStayNumber}: AppProps): JSX.Element {
  return (
    <Main placesToStayNumber={placesToStayNumber} />
  );
}

export default App;
