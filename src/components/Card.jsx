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
          Paragraph component - Warning: renderToNodeStream is deprecated. Use
          renderToPipeableStream instead.
        </p>
        <Count text="Card file state"></Count>
      </div>
    );
}