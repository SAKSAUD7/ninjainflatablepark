import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HomeContent from '../app/(main)/components/HomeContent'

// Mock the UI components
vi.mock('@repo/ui', () => ({
    AnimatedHero: () => <div data-testid="hero">Hero</div>,
    ScrollReveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    BouncyButton: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
    SectionDivider: () => <div data-testid="divider" />,
    Marquee: () => <div data-testid="marquee" />,
}))

// Mock Framer Motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    },
}))

// Mock Lucide Icons
vi.mock('lucide-react', () => ({
    Zap: () => <svg data-testid="icon-zap" />,
    Users: () => <svg data-testid="icon-users" />,
    Trophy: () => <svg data-testid="icon-trophy" />,
    Shield: () => <svg data-testid="icon-shield" />,
    ArrowRight: () => <svg />,
    Play: () => <svg />,
    Instagram: () => <svg />,
}))

// Mock Next/Link
vi.mock('next/link', () => ({
    default: ({ children }: { children: React.ReactNode }) => <a href="#">{children}</a>,
}))

describe('Home Page', () => {
    const mockStats = [
        { id: '1', value: '100', label: 'Test Stat', icon: 'Zap' }
    ]
    const mockGallery = [
        { id: '1', src: '/test.jpg', title: 'Test Image', desc: 'Test Desc' }
    ]


    it('renders main sections', () => {
        render(<HomeContent stats={mockStats} gallery={mockGallery} banners={[]} testimonials={[]} />)

        expect(screen.getByTestId('hero')).toBeInTheDocument()
        expect(screen.getByText('Test Stat')).toBeInTheDocument()
        expect(screen.getByText('Test Image')).toBeInTheDocument()
    })
})
