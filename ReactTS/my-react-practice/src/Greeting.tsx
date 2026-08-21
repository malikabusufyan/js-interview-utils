// Greeting.tsx
interface GreetingProps {
  name: string;
  age?: number;          // optional — Day 9's ? habit, same syntax
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      {age !== undefined && <p>You are {age} years old.</p>}
    </div>
  );
}

export default Greeting;