
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[character]
  })
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.error('Resend API key is missing.')
      return NextResponse.json(
        { error: 'Booking form is temporarily unavailable.' },
        { status: 500 }
      )
    }

    const body = await request.json()

    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true })
    }

    const fields = [
      'name',
      'email',
      'organization',
      'eventDate',
      'location',
      'eventType',
      'budget',
      'details',
    ] as const

    const values: Record<(typeof fields)[number], string> = {
      name: '',
      email: '',
      organization: '',
      eventDate: '',
      location: '',
      eventType: '',
      budget: '',
      details: '',
    }

    for (const field of fields) {
      const value = body[field]

      if (value !== undefined && value !== null && typeof value !== 'string') {
        return NextResponse.json(
          { error: 'Please check your entries and try again.' },
          { status: 400 }
        )
      }

      values[field] = typeof value === 'string' ? value.trim() : ''
    }

    if (
      !values.name ||
      !values.email ||
      !values.eventDate ||
      !values.location ||
      !values.eventType
    ) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 }
      )
    }

    if (
      values.name.length > 100 ||
      values.email.length > 254 ||
      values.organization.length > 150 ||
      values.location.length > 150 ||
      values.details.length > 3000
    ) {
      return NextResponse.json(
        { error: 'One or more fields are too long.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const allowedEventTypes = [
      'College / Greek Life',
      'Private Party',
      'Bar / Live Music Venue',
      'Festival',
      'Corporate Event',
      'Wedding',
      'Other',
    ]

    if (!allowedEventTypes.includes(values.eventType)) {
      return NextResponse.json(
        { error: 'Please select a valid event type.' },
        { status: 400 }
      )
    }

    const safe = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        escapeHtml(value),
      ])
    ) as Record<keyof typeof values, string>

    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'Red Door Bookings <bookings@reddoorband.com>',
      to: [
        'hunter@beatlinepd.com',
        'bandreddoor@gmail.com',
        'ammonskk@gmail.com',
        'luke@beatlinepd.com',
        'patrick@beatlinepd.com',
      ],
      replyTo: values.email,
      subject: `New Red Door Booking Inquiry — ${values.organization || values.name}`,
      html: `
        <h2>New Red Door Booking Inquiry</h2>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Organization / Event:</strong> ${safe.organization || 'Not provided'}</p>
        <p><strong>Event Date:</strong> ${safe.eventDate}</p>
        <p><strong>Location:</strong> ${safe.location}</p>
        <p><strong>Event Type:</strong> ${safe.eventType}</p>
        <p><strong>Estimated Budget:</strong> ${safe.budget || 'Not provided'}</p>
        <p><strong>Additional Details:</strong></p>
        <p>${safe.details ? safe.details.replace(/\n/g, '<br>') : 'None provided'}</p>
      `,
      text: `
New Red Door Booking Inquiry

Name: ${values.name}
Email: ${values.email}
Organization / Event: ${values.organization || 'Not provided'}
Event Date: ${values.eventDate}
Location: ${values.location}
Event Type: ${values.eventType}
Estimated Budget: ${values.budget || 'Not provided'}

Additional Details:
${values.details || 'None provided'}
      `,
    })

    if (error) {
      console.error('Resend booking email error:', error)
      return NextResponse.json(
        { error: 'We could not send your inquiry. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
