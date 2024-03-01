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

export const handleGetSignUpDataFromForm = (formData: FormData) => {
  const name = formData.get('name')
  if (!name || typeof name !== 'string' || name.length < 3) {
    throw new Error('Invalid name')
  }

  const email = formData.get('mail')
  if (!email || typeof email !== 'string' || email.length < 5) {
    throw new Error('Invalid email')
  }

  const username = formData.get('username')
  const country = formData.get('country')
  if (!username || !country) {
    throw new Error('Invalid username or country')
  }

  const phone = formData.get('phone')
  if (!phone || typeof phone !== 'string' || phone.length < 5) {
    throw new Error('Invalid phone')
  }

  console.log(name, email, username, country, phone)

  return [name, email, username, country, phone]
}
