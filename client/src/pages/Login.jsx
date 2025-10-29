import { useEffect } from "react";
import { gsap } from "gsap";

export default function Login() {
  const server = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const providers = [
    {
      name: "Google",
      color: "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300",
      icon: (
        <img
          src="/assests/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
      ),
      link: `${server}/api/auth/google`,
    },
    {
      name: "GitHub",
      color: "bg-gray-800 text-white hover:bg-gray-900",
      icon: (
        <img
          src="/assests/github.svg"
          alt="GitHub"
          className="w-5 h-5"
        />
      ),
      link: `${server}/api/auth/github`,
    },
    {
      name: "Facebook",
      color: "bg-blue-600 text-white hover:bg-blue-700",
      icon: (
        <img
          src="/assests/facebook.svg"
          alt="Facebook" 
          className="w-5 h-5"
        />
      ),
      link: `${server}/api/auth/facebook`,
    },
  ];

  useEffect(()=>{
gsap.fromTo(document.querySelector("#rightSection"),{
  opacity:0,y:50
},{
  opacity:1,y:0, duration:1.5, ease:"power4"
}
  
)
  },[])

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-colors duration-500">
      {/* Left Side Illustration / Branding */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src="/assests/team_discussion.png"
          alt="Login illustration"
          className="w-2/4 max-w-lg drop-shadow-lg"
        />
      </div>

      {/* Right Side Login Card */}
      <div id="rightSection" className="flex-1 flex items-center justify-center px-6 py-12 md:py-0">
        <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 md:p-10 transition-all duration-300">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Sign in securely using one of your accounts
          </p>

          <div className="space-y-4">
            {providers.map((p) => (
              <a
                key={p.name}
                href={p.link}
                className={`flex items-center justify-center gap-3 py-3 rounded-lg font-medium transition-all duration-200 ${p.color}`}
              >
                {p.icon}
                <span>Continue with {p.name}</span>
              </a>
            ))}
          </div>

          <div className="my-8 flex items-center justify-center">
            <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/3"></div>
            <span className="text-gray-400 text-sm mx-3">or</span>
            <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/3"></div>
          </div>

          <p className="text-xs text-center text-gray-400 dark:text-gray-500">
            By continuing, you agree to our{" "}
            <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
