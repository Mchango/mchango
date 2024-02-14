import React from 'react'
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

export const navItems = [
  {
    id: 1,
    name: 'Sign In',
    href: '/signin',
  },
  {
    id: 2,
    name: 'Pricing',
    href: '#pricing',
  },
] as const

export const socialLinks = [
  {
    id: 1,
    name: 'Linkedin',
    icon: React.createElement(Linkedin),
    href: '/',
  },
  {
    id: 2,
    name: 'Twitter',
    icon: React.createElement(Twitter),
    href: '/',
  },
  {
    id: 3,
    name: 'Facebook',
    icon: React.createElement(Facebook),
    href: '/',
  },
  {
    id: 4,
    name: 'Instagram',
    icon: React.createElement(Instagram),
    href: '/',
  },
] as const
