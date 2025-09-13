"use client"
import { useSelector } from "react-redux";

export default function StudentList() {
  const { students } = useSelector(state => state.student);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold">Students</h2>
      {students.length === 0 ? (
        <p>No students yet.</p>
      ) : (
        <ul className="space-y-2">
          {students.map(s => (
            <li key={s._id} className="p-2 border rounded">
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-gray-600">{s.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
