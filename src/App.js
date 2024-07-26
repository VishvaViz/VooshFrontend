import Routecomp from "./route/Route";
import { Provider } from 'react-redux'
import store from './redux/store'
function App() {
  console.log('baseUrl', process.env.REACT_APP_API_URL)
  return (
    <div>
      <Provider store={store}>
        <Routecomp />
      </Provider>
    </div>
  );
}

export default App;
