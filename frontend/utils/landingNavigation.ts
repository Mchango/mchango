import { useRouter } from 'next/navigation'
import { useWallet } from '@/context/connectWallet'
import { connectAndValidate } from '@/actions'
import Cookies from 'js-cookie'

const useAppNavigation = () => {
  const router = useRouter()
  const { connectWallet, account } = useWallet()

  const handleNavLinks = {
    handleGetStartedToggled: () => {
      router.push('/signup')
    },

    handleSignInToggled: async (routeName: string) => {
      if (routeName === '/signin') {
        try {
          connectWallet()
          if (account) {
            Cookies.set('walletConnected', 'true', {
              expires: 2, // 2 days
            })
          }
        } catch (error) {
          throw new MetaMaskNotInstalledError()
        }
      } else if (routeName === '#pricing') {
        const pricingSection = document.getElementById('pricing')
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },

    handleExistingUser: async () => {
      try {
        if (account) {
          const isMember = await connectAndValidate(account as string)
          console.log(isMember)

          if (isMember === true) {
            router.push('/home')
          }
        }
      } catch (error) {
        console.error(error)
        throw new Error('An error occurred while validating member')
      }
    },
  }

  return { handleNavLinks }
}

export default useAppNavigation
