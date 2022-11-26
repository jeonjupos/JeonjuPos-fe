import RouterView from '@/router';
import RouteProvider from '@/router/provider';
import GlobalStyle from '@/styles/global-styles';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <RouteProvider>
        <RouterView />
      </RouteProvider>
    </div>
  )
}

export default App
