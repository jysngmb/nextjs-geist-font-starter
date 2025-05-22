"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Badge } from "./ui/badge"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              TechParts
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-900">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-600 hover:text-gray-900">
              Deals
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative w-64">
              <Input
                type="search"
                placeholder="Search components..."
                className="w-full"
              />
            </div>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-black text-white"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 hover:text-gray-900"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="text-gray-600 hover:text-gray-900"
              >
                Deals
              </Link>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search components..."
                  className="w-full"
                />
              </div>
              <Link href="/cart" className="flex items-center space-x-2">
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
