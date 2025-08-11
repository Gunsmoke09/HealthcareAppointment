import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Home</h1>
      <p><Link to="/book">Go to /book</Link></p>
    </div>
  );
}

function BookTest() {
  return <div style={{ padding: 24, fontSize: 20 }}>Book page works 🎉</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookTest />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
