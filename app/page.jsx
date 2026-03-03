"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <div className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden bg-[#0F0F0F]">
      <div className="absolute inset-0 bg-[#0F0F0F]" />
      <div className="fixed top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#0CC8A8] opacity-30 blur-[180px] rounded-full" />
      <div className="fixed bottom-[-25%] right-[-10%] w-[1000px] h-[1000px] bg-[#FF4D00] opacity-40 blur-[200px] rounded-full" />

      <div className="hidden lg:flex w-1/2 relative z-10">

        <div className="absolute top-5 left-5 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0CC8A8] rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-[18px] font-medium tracking-wide text-white">aps</span>
        </div>

        <div className="relative z-10 mb-10 flex flex-col justify-center px-24 text-white pt-20">
          <h1 className="text-[40px] leading-[60px] font-medium max-w-[520px] mb-5">
            Expert level Cybersecurity <br />
            in <span className="text-[#0CC8A8]">hours</span> not weeks.
          </h1>

          <div className="max-w-[520px]">
            <p className="text-[18px] mb-3 font-medium text-white">
              What’s included
            </p>

            <ul className="space-y-5 text-[14px] text-gray-300">
              <li className="flex gap-3 items-start">
                <Check className="text-[#0CC8A8] w-4 h-4 mt-[3px]" />
                Effortlessly spider and map targets to uncover hidden security flaws
              </li>
              <li className="flex gap-3 items-start">
                <Check className="text-[#0CC8A8] w-4 h-4 mt-[3px]" />
                Deliver high-quality, validated findings in hours, not weeks.
              </li>
              <li className="flex gap-3 items-start">
                <Check className="text-[#0CC8A8] w-4 h-4 mt-[3px]" />
                Generate professional, enterprise-grade security reports automatically.
              </li>
            </ul>
          </div>

          <div className="mt-20 text-gray-300">
            <div className="flex items-center gap-2 text-[#0CC8A8] text-[14px] mb-3">
              ★ 
              <span className="text-white mt-0.5">Trustpilot</span>
            </div>
            <p className="text-[18px]">
              Rated <span className="text-white font-medium">4.5/5.0</span>{" "}
              <span className="text-[14px] text-gray-400">(100k+ reviews)</span>
            </p>
          </div>

        </div>
      </div>

      <div className="flex flex-1  flex-col items-start lg:items-center justify-start lg:justify-center p-6 lg:p-8 relative z-10 w-full">
        <div className="lg:hidden w-full text-white mb-10">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#0CC8A8] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-[18px] font-medium tracking-wide">aps</span>
          </div>

          <h1 className="text-[28px] leading-[36px] font-medium mb-8">
            Expert level Cybersecurity <br />
            in <span className="text-[#0CC8A8]">hours</span> not weeks.
          </h1>

          <div className="mb-10">
            <p className="text-[16px] font-medium mb-4">
              What’s included
            </p>

            <ul className="space-y-4 text-[14px] text-gray-300">
              <li className="flex gap-3 items-start">
                <Check className="text-[#0CC8A8] w-4 h-4 mt-[3px]" />
                Effortlessly spider and map targets to uncover hidden security flaws
              </li>
              <li className="flex gap-3 items-start">
                <Check className="text-[#0CC8A8] w-4 h-4 mt-[3px]" />
                Deliver high-quality, validated findings in hours, not weeks.
              </li>
              <li className="flex gap-3 items-start">
                <Check className="text-[#0CC8A8] w-4 h-4 mt-[3px]" />
                Generate professional, enterprise-grade security reports automatically.
              </li>
            </ul>
          </div>

          <div className="text-gray-300 mb-8">
            <div className="flex items-center gap-2 text-[#0CC8A8] text-[13px] mb-2">
              ★ Trustpilot
            </div>
            <p className="text-[15px]">
              Rated <span className="text-white font-medium">4.5/5.0</span>{" "}
              <span className="text-[13px] text-gray-400">(100k+ reviews)</span>
            </p>
          </div>

        </div>

        <div className="w-full max-w-[460px] mr-[-70px] bg-[#F4F4F4] p-8 rounded-[20px]">

          <h2 className="text-[30px] text-black font-bold text-center mb-3">
            Sign up
          </h2>

          <p className="text-center text-[14px] text-black mb-6">
            Already have an account?{" "}
            <span className="text-[#0CC8A8] underline cursor-pointer">
              Log in
            </span>
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);

              const { firstName, lastName, email, password } = formData;

              if (!firstName || !lastName || !email || !password) {
                toast.error("Please fill all required fields");
                setLoading(false);
                return;
              }

              toast.success("Account created successfully 🎉");

              setTimeout(() => {
                router.push("/dashboard");
              }, 1000);
            }}
            className="space-y-4"
          >

            <input
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full h-[48px] text-gray-500 px-5 rounded-md border border-gray-300 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0CC8A8]"
              placeholder="First name*"
            />

            <input
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full h-[48px] text-gray-500 px-5 rounded-md border border-gray-300 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0CC8A8]"
              placeholder="Last name*"
            />

            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-[48px] text-gray-500 px-5 rounded-md border border-gray-300 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0CC8A8]"
              placeholder="Email address*"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-[48px] text-gray-500 px-5 pr-12 rounded-md border border-gray-300 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0CC8A8]"
                placeholder="Password (8+ characters)*"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeClosed className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-start gap-3 text-[13px] text-gray-600">
              <Checkbox />
              <p>
                I agree to Aps’s{" "}
                <span className="text-[#2365f1] underline cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and acknowledge the{" "}
                <span className="text-[#2365f1] underline cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] rounded-full bg-[#0CC8A8] hover:bg-[#0CC8A8]/90 text-white text-[16px] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <div className="flex gap-4 pt-4">
             <button className="flex-1 h-[50px] bg-black rounded-full flex items-center justify-center">
                <img src="/apple.png" alt="Apple" className="h-6 w-6 object-contain" />
              </button>
              <button className="flex-1 h-[50px] bg-gray-200 rounded-full flex items-center justify-center">
                <img src="/google.png" alt="Google" className="h-6 w-6 object-contain" />
              </button>
              <button className="flex-1 h-[50px] bg-[#2563EB] rounded-full flex items-center justify-center">
                <img src="/meta.png" alt="Meta" className="h-6 w-6 object-contain" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}