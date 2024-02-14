'use server'

export const handleNewsLetterSubscription = (formData: FormData) => {
  const senderEmail = formData.get('mail') as string
  console.log(senderEmail)

  if (typeof senderEmail != 'string' || senderEmail.length < 5) {
    return {
      error: 'Invalid email',
    }
  }

  try {
  } catch (error) {
    return {
      error: 'An error occured',
    }
  }
}
