
'use client'

import { useState } from 'react'

export default function BookingForm() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitting(true)
    setError('')
    setSuccess(false)

    const form = event.currentTarget
    const formData = new FormData(form)

    const inquiry = {
      name: formData.get('name'),
      email: formData.get('email'),
      organization: formData.get('organization'),
      eventDate: formData.get('eventDate'),
      location: formData.get('location'),
      eventType: formData.get('eventType'),
      budget: formData.get('budget'),
      details: formData.get('details'),
      website: formData.get('website'),
    }

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiry),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.')
      }

      form.reset()
      setSuccess(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'mt-2 w-full border border-black/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-[#b22222]'

  const labelClass =
    'block text-xs font-bold uppercase tracking-[0.15em]'

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-tight">
          Tell us about your event.
        </h2>
        <p className="mt-2 text-sm text-black/55">
          The more details you can provide, the better.
        </p>
      </div>

      {success ? (
        <div className="border border-[#b22222]/30 bg-white/40 p-6">
          <h3 className="text-xl font-bold uppercase">
            Inquiry received.
          </h3>
          <p className="mt-3 text-sm leading-6 text-black/65">
            Thanks for reaching out. Your booking inquiry has been sent to
            our booking team and Red Door. We&apos;ll be in touch.
          </p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-[#b22222] hover:opacity-60"
          >
            Submit another inquiry →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className={labelClass}>
              Your name *
              <input
                className={inputClass}
                type="text"
                name="name"
                placeholder="Full name"
                maxLength={100}
                required
              />
            </label>

            <label className={labelClass}>
              Email address *
              <input
                className={inputClass}
                type="email"
                name="email"
                placeholder="you@example.com"
                maxLength={254}
                required
              />
            </label>
          </div>

          <label className={labelClass}>
            Organization / event name
            <input
              className={inputClass}
              type="text"
              name="organization"
              placeholder="Organization or event"
              maxLength={150}
            />
          </label>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className={labelClass}>
              Event date *
              <input
                className={inputClass}
                type="date"
                name="eventDate"
                required
              />
            </label>

            <label className={labelClass}>
              Event location *
              <input
                className={inputClass}
                type="text"
                name="location"
                placeholder="City, State"
                maxLength={150}
                required
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className={labelClass}>
              Event type *
              <select
                className={inputClass}
                name="eventType"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select event type
                </option>
                <option value="College / Greek Life">College / Greek Life</option>
                <option value="Private Party">Private Party</option>
                <option value="Bar / Live Music Venue">Bar / Live Music Venue</option>
                <option value="Festival">Festival</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Wedding">Wedding</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className={labelClass}>
              Estimated budget
              <select
                className={inputClass}
                name="budget"
                defaultValue=""
              >
                <option value="">Select a budget</option>
                <option value="Under $1,000">Under $1,000</option>
                <option value="$1,000–$2,000">$1,000–$2,000</option>
                <option value="$2,000–$3,000">$2,000–$3,000</option>
                <option value="$3,000–$5,000">$3,000–$5,000</option>
                <option value="$5,000+">$5,000+</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>
          </div>

          <label className={labelClass}>
            Additional details
            <textarea
              className={`${inputClass} min-h-32 resize-y`}
              name="details"
              placeholder="Tell us a little more about the event, expected attendance, schedule, production needs, or anything else we should know."
              maxLength={3000}
            />
          </label>

          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#b22222] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Sending inquiry...' : 'Submit booking inquiry'}
          </button>

          <p className="text-xs leading-5 text-black/45">
            Your inquiry will be sent to Red Door and Beatline Production.
          </p>
        </form>
      )}
    </div>
  )
}
