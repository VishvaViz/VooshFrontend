import Routecomp from "./route/Route";
import { Provider } from 'react-redux'
import store from './redux/store'
function App() {
  return (
    <div>
      <Provider store={store}>
        <Routecomp />
      </Provider>
    </div>
  );
}

export default App;
