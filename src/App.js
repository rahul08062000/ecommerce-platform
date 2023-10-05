import Body from "./components/Body";
import {store} from "./utils/redux/AppStore"
import {Provider} from 'react-redux'
import Login from "./components/Login";
import  Cart   from  "./components/Cart"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";




function App() {
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <Body/>  
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: `/product/:id`,
      element: <ProductDetail/>
    },
    {
      path:'/cart',
      element:<Cart/>
    }
  ]);
  return (
    <Provider store={store}>
   <RouterProvider router={appRoute} />
    </Provider>
  );
}

export default App;
