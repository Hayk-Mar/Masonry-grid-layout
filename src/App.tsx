import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "pages/home";
import { ImageDetails } from "pages/image-details";
import { ErrorBoundary } from "modules/error-boundary";

const App = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image/:provider/:id" element={<ImageDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
);

export default App;
