import HeroSection from "../components/HeroSection";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Employee Management System',
  description: 'Employee Management System App',
}

export default function Page() {
  return <main><HeroSection/></main>;
}
