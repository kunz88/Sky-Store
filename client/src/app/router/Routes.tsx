// adesso creiamo il router per instradare le nostre pagine renderizzandole all'interno della SPA

import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import BasketPage from "../../features/basket/BasketPage";



// CREAIAMO UN ROUTER CON TUTTE LE ROTTE DA INSTRADARE

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'catalog',
                element: <Catalog />
            },
            {
                path: 'catalog/:id',
                element: <ProductDetails />
            }, 
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'basket',
                element: <BasketPage />
            },

        ]
    }
]) // il nostro costruttore del router prende come argomento un array di routes 