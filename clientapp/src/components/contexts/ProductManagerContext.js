'use client'; // Nếu bạn dùng App Router của Next.js

import { createContext, useContext, useState, ReactNode } from 'react';

const ProductManagerContext = createContext(undefined);

export const useProductManagerContext = () => {
    const context = useContext(ProductManagerContext);
    if (!context) {
        throw new Error('useProductContext must be used within ProductProvider');
    }
    return context;
};

export const ProductManagerProvider = ({ children }) => {
    const [refreshList, setRefreshList] = useState(0);
    const [refreshUpdateProduct, setRefreshUpdateProduct] = useState(0);
    const triggerRefreshList = () => setRefreshList(prev => prev + 1);
    const triggerRefreshUpdate = () => setRefreshUpdateProduct(prev => prev - 1);
    return (
        <ProductManagerContext.Provider value={{ refreshList, triggerRefreshList , refreshUpdateProduct , triggerRefreshUpdate }}>
            {children}
        </ProductManagerContext.Provider>
    );
};
