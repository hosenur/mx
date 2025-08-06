"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { useAuth } from "@/lib/auth-client";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.general = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: keyof RegisterFormData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear field-specific error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name.trim(),
      });

      if (result.error) {
        setErrors({
          general:
            result.error.message || "Registration failed. Please try again.",
        });
      } else {
        // Redirect to dashboard or show success message
        router.push("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        general: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (
    password: string,
  ): { strength: string; color: string } => {
    if (password.length === 0) return { strength: "", color: "" };
    if (password.length < 6) return { strength: "Weak", color: "text-red-500" };
    if (
      password.length < 8 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    ) {
      return { strength: "Medium", color: "text-yellow-500" };
    }
    return { strength: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {errors.general}
              </div>
            )}

            <TextField
              label="Full name"
              type="text"
              value={formData.name}
              onChange={handleInputChange("name")}
              errorMessage={errors.name}
              placeholder="Enter your full name"
              isRequired
              autoComplete="name"
            />

            <TextField
              label="Email address"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              errorMessage={errors.email}
              placeholder="Enter your email"
              isRequired
              autoComplete="email"
            />

            <div>
              <TextField
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange("password")}
                errorMessage={errors.password}
                placeholder="Create a password"
                isRevealable
                isRequired
                autoComplete="new-password"
              />
              {formData.password && (
                <div className="mt-1 text-sm">
                  Password strength:{" "}
                  <span className={passwordStrength.color}>
                    {passwordStrength.strength}
                  </span>
                </div>
              )}
            </div>

            <TextField
              label="Confirm password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              errorMessage={errors.confirmPassword}
              placeholder="Confirm your password"
              isRevealable
              isRequired
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-center">
            <input
              id="accept-terms"
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor="accept-terms"
              className="ml-2 block text-sm text-gray-900"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/80 underline"
                target="_blank"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80 underline"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            intent="primary"
            size="lg"
            className="w-full"
            isDisabled={isSubmitting || authLoading || !acceptTerms}
            isPending={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                By signing up, you agree to our terms
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
