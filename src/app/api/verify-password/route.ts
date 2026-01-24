import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route: Password Verification
 * 
 * Server-side password validation to protect VC content.
 * Password is stored in environment variable VC_ACCESS_PASSWORD.
 * 
 * Security notes:
 * - Password is never exposed to client
 * - No logging of password attempts
 * - Generic error messages only
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Get password from environment variable
    const correctPassword = process.env.VC_ACCESS_PASSWORD

    // Validate environment is configured
    if (!correctPassword) {
      console.error('VC_ACCESS_PASSWORD environment variable is not set')
      return NextResponse.json(
        { success: false, message: 'Configuration error' },
        { status: 500 }
      )
    }

    // Validate password
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid request' },
        { status: 400 }
      )
    }

    // Check password (constant-time comparison would be ideal for production)
    const isValid = password === correctPassword

    if (isValid) {
      return NextResponse.json({ success: true })
    } else {
      // Generic error message - no hints about the password
      return NextResponse.json(
        { success: false, message: 'Access denied' },
        { status: 401 }
      )
    }
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    )
  }
}
