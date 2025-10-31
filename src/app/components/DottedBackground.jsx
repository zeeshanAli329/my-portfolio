
// export default function DottedBackground() {
//   return (
//     <div className="absolute inset-0 opacity-10 pointer-events-none">
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
//           backgroundSize: "50px 50px",
//         }}
//       ></div>
//     </div>
//   );
// }

// DottedBackground.jsx
export default function DottedBackground() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 5px, rounded, transparent 0)`, 
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
}

