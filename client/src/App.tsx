import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/home";
import EdaptPage from "@/pages/edapt";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminNewsList from "@/pages/admin/news-list";
import AdminNewsForm from "@/pages/admin/news-form";
import UserManagement from "@/pages/admin/user-management";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/edapt" component={EdaptPage} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/news" component={AdminNewsList} />
      <Route path="/admin/news-list" component={AdminNewsList} />
      <Route path="/admin/news/new" component={AdminNewsForm} />
      <Route path="/admin/news-form" component={AdminNewsForm} />
      <Route path="/admin/news/:id/edit" component={AdminNewsForm} />
      <Route path="/admin/users" component={UserManagement} />
      <Route path="/admin/user-management" component={UserManagement} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-screen">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
