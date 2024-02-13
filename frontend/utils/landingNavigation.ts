import { useRouter } from 'next/navigation'
import { useWallet } from '@/context/connectWallet'

const useAppNavigation = () => {
  const router = useRouter()
  const { connectWallet } = useWallet()

  const handleNavLinks = {
    handleGetStartedToggled: () => {
      router.push('/signup')
    },

    handleSignInToggled: (routeName: string) => {
      if (routeName === '/signin') {
        try {
          connectWallet()
        } catch (error) {
          throw new MetaMaskError()
        }
      } else if (routeName === '#pricing') {
        const pricingSection = document.getElementById('pricing')
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
  }

  return { handleNavLinks }
}

export default useAppNavigation
