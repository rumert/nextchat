import React from 'react'

export default function Features() {
  const features = [
    { title: "We Care Your Privacy!", description: "Your password isn't saved to our database.", icon: "🔐" },
    { title: "Every Type of Messages!", description: "Voice ✔️ Images and Videos ✔️ Documents ✔️ Spaghetti ❌", icon: "📨" },
    { title: "Delete Your Message Anytime!", description: "There is no time limit for deleting a message.", icon: "🗑️" },
    { title: "Find Your Best Friend!", description: "Add friends around the world easily.", icon: "🙋" },
  ];

  return (
    <div>
      <h2 className="text-5xl mb-12 text-center">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px]">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-secondary rounded-xl">
            <div className="flex items-center mb-4">
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="text-2xl font-semibold ml-4">{feature.title}</h3>
            </div>
            <p className='text-base'>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}