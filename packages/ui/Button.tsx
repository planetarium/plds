'use client'

export const Button = () => {
  return (
    <button
      className="bg-blue-700 hover:bg-blue-900 text-white border-0"
      onClick={() => alert('boop')}
    >
      Boop
    </button>
  )
}
