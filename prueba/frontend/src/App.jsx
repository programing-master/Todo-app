import { AuthProvider } from "./context/auth.context";
import { FeaturesProvider } from "./context/features.context";
import { TaskProvider } from "./context/task.context";
import Router from "./routes/Router";

function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <FeaturesProvider>
            <Router />
          </FeaturesProvider>
        </TaskProvider>
      </AuthProvider>
    </>
  );
}

export default App;
