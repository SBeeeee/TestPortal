"use client";

const features = [
  {
    title: "📚 Easy Test Management",
    desc: "Teachers can create, assign, and review tests seamlessly.",
  },
  {
    title: "📝 Student Friendly",
    desc: "Students can attempt tests in a distraction-free interface.",
  },
  {
    title: "📊 Performance Tracking",
    desc: "Track scores, completion rates, and progress in real-time.",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose Exam Portal?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="bg-indigo-50 rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
