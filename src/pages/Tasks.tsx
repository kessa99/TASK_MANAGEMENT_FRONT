import { Navigate } from 'react-router-dom';

export default function Tasks() {
  // Redirect to dashboard for now - tasks are shown there
  return <Navigate to="/dashboard" replace />;
}
