import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../library/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../Chart/card";
import FloatingInput from "../Input/FloatingInput";
import Button from "../Input/Button";
import PasswordInput from "../SecondaryInput/PasswordInput";
import apiClient from "@/pages/app/api/apiClients";
import { useAuth } from "@/pages/auth/AuthContext";

interface LoginProps {
  className?: string;
}

export function LoginForm({ className }: LoginProps) {
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [usrError, setUsrError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUsrError("");
    setPwdError("");

    if (!usr && !pwd) {
      setUsrError("Username Required");
      setPwdError("Password Required");
      return;
    } else if (!usr) {
      setUsrError("Username Required");
      return;
    } else if (!pwd) {
      setPwdError("Password Required");
      return;
    }

    try {
      const res = await apiClient.post("/api/login", {
        email: usr,
        password: pwd,
      });
      const { token, user } = res.data;
      login(user, token); // Save user to auth context

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center py-2 text-xl font-bold text-update">
            Welcome
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <FloatingInput
                id="usr"
                type="email"
                placeholder="demo@gmail.com"
                required
                value={usr}
                onChange={(e) => setUsr(e.target.value)}
                label="User"
                err={usrError}
              />

              <PasswordInput
                id="pwd"
                value={pwd}
                error={pwdError}
                label="Password"
                onChange={(e) => setPwd(e.target.value)}
              />

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-update text-update-foreground"
                label={"Login"}
              />

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="underline text-update underline-offset-4"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
