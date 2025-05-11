"use client"

import { useState } from "react"
import { Filter, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "./product-card"
import ProductFilters from "./product-filter"

// Sample product data


export default function ProductListing({products=[],filters=[]}) {
    const [showFilters, setShowFilters] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState(products)

    // Toggle filter sidebar on mobile
    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold"></h1>
                <Button variant="outline" className="lg:hidden flex items-center gap-2" onClick={toggleFilters}>
                    {showFilters ? (
                        <>
                            <X size={18} /> Hide Filters
                        </>
                    ) : (
                        <>
                            <Filter size={18} /> Show Filters
                        </>
                    )}
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Grid */}
                <div className="flex-1 order-2 lg:order-1">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* Filters - Right Side */}
                <div className={`lg:w-72 order-1 lg:order-2 ${showFilters ? "block" : "hidden lg:block"}`}>
                    <div className="sticky top-4 bg-white p-4 rounded-lg border">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <SlidersHorizontal size={18} /> Filters
                            </h2>
                            <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggleFilters}>
                                <X size={18} />
                            </Button>
                        </div>
                        <ProductFilters filters={filters} />
                    </div>
                </div>
            </div>
        </div>
    )
}
