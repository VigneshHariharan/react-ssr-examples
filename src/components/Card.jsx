import { Count } from './Count'

export function Card() {
    return (
      <div
        style={{
          background: "gray",
          border: "1px solid transparent",
          borderRadius: "12px",
          width: "300px",
          height: "400px",
          padding: "8px 12px",
        }}
      >
        <h1>Card component Heading</h1>
        <p>
          Card component trying to build a good one
        </p>
        <Count text="Card file state"></Count>
      </div>
    );
}