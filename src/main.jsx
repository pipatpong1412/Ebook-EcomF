import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { UserContextProvider } from './contexts/userContext.jsx'
import { ProductContextProvider } from './contexts/ProductContext.jsx'
import { CategoryContextProvider } from './contexts/CategoryContext.jsx'
import { CartContextProvider } from './contexts/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <UserContextProvider>
      <ProductContextProvider>
        <CategoryContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </CategoryContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
)
