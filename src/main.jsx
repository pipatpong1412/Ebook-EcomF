import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { UserContextProvider } from './contexts/userContext.jsx'
import { ProductContextProvider } from './contexts/ProductContext.jsx'
import { CategoryContextProvider } from './contexts/CategoryContext.jsx'
import { CartContextProvider } from './contexts/CartContext.jsx'
import { PaymentContextProvider } from './contexts/PaymentContext.jsx'
import { ShelfContextProvider } from './contexts/ShelfContext.jsx'
import { SearchContextProvider } from './contexts/SearchContext.jsx'
import { AdminContextProvider } from './contexts/AdminContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <UserContextProvider>
      <AdminContextProvider>
        <SearchContextProvider>
          <ProductContextProvider>
            <CategoryContextProvider>
              <PaymentContextProvider>
                <CartContextProvider>
                  <ShelfContextProvider>
                    <App />
                  </ShelfContextProvider>
                </CartContextProvider>
              </PaymentContextProvider>
            </CategoryContextProvider>
          </ProductContextProvider>
        </SearchContextProvider>
      </AdminContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
)
