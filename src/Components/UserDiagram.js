export default function UserDiagram() {
    return (
      <div className="flex justify-center items-center my-8">
        <svg width="400" height="200" className="bg-gray-100">
          <circle cx="100" cy="100" r="50" fill="lightblue" />
          <text x="100" y="100" textAnchor="middle" fill="black">User</text>
          <line x1="150" y1="100" x2="250" y2="100" stroke="black" />
          <circle cx="300" cy="100" r="50" fill="lightcoral" />
          <text x="300" y="100" textAnchor="middle" fill="black">Course</text>
        </svg>
      </div>
    );
  }