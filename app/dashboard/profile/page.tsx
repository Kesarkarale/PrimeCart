"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Save,
  Loader2,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  ShoppingBag,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  // =========================================================
  // USER
  // =========================================================

  const [userId, setUserId] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // =========================================================
  // PASSWORD
  // =========================================================

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =========================================================
  // STATES
  // =========================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordLoading, setPasswordLoading] =
    useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // LOAD USER
  // =========================================================

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          router.replace("/login");
          return;
        }

        if (!mounted) return;

        setUserId(user.id);

        const metadata = user.user_metadata || {};

        // -----------------------------------------------------
        // DEFAULT USER DATA
        // -----------------------------------------------------

        let name =
          metadata.full_name ||
          metadata.name ||
          metadata.fullName ||
          "";

        let phone =
          metadata.mobile ||
          metadata.phone ||
          "";

        // -----------------------------------------------------
        // TRY TO GET DATA FROM PROFILES TABLE
        // -----------------------------------------------------

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, mobile, phone")
          .eq("id", user.id)
          .maybeSingle();

        if (profile) {
          name =
            profile.full_name ||
            name;

          phone =
            profile.mobile ||
            profile.phone ||
            phone;
        }

        setFullName(String(name || ""));
        setEmail(user.email || "");
        setMobile(String(phone || ""));
      } catch (err) {
        console.error(
          "Profile loading error:",
          err
        );

        if (mounted) {
          setError(
            "Unable to load your profile. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  async function handleSaveProfile() {
    setError("");
    setSuccess("");

    const cleanName = fullName.trim();
    const cleanMobile = mobile.trim();

    if (!cleanName) {
      setError("Please enter your full name.");
      return;
    }

    if (
      cleanMobile &&
      !/^[0-9]{10}$/.test(cleanMobile)
    ) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    try {
      setSaving(true);

      // -----------------------------------------------------
      // UPDATE AUTH USER METADATA
      // -----------------------------------------------------

      const { error: authError } =
        await supabase.auth.updateUser({
          data: {
            full_name: cleanName,
            mobile: cleanMobile,
          },
        });

      if (authError) {
        throw authError;
      }

      // -----------------------------------------------------
      // UPDATE PROFILES TABLE
      // -----------------------------------------------------

      const { error: profileError } =
        await supabase
          .from("profiles")
          .update({
            full_name: cleanName,
            mobile: cleanMobile,
          })
          .eq("id", userId);

      /*
       * If profiles table doesn't exist or these columns
       * are different, auth metadata is still updated.
       *
       * We don't fail the whole profile update here.
       */

      if (profileError) {
        console.warn(
          "Profiles table update skipped:",
          profileError.message
        );
      }

      setFullName(cleanName);
      setMobile(cleanMobile);

      setSuccess(
        "Profile updated successfully."
      );

      // Update navbar immediately
      router.refresh();
    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // CHANGE PASSWORD
  // =========================================================

  async function handleChangePassword() {
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setPasswordLoading(true);

      const { error: passwordError } =
        await supabase.auth.updateUser({
          password: newPassword,
        });

      if (passwordError) {
        throw passwordError;
      }

      setNewPassword("");
      setConfirmPassword("");

      setSuccess(
        "Password changed successfully."
      );
    } catch (err) {
      console.error(
        "Password change error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to change your password."
      );
    } finally {
      setPasswordLoading(false);
    }
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  async function handleLogout() {
    try {
      setLoggingOut(true);

      await supabase.auth.signOut();

      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error(
        "Logout error:",
        err
      );

      setError(
        "Unable to logout. Please try again."
      );

      setLoggingOut(false);
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#faf8f3]
          dark:bg-[#050505]
        "
      >
        <div className="text-center">
          <Loader2
            size={34}
            className="
              mx-auto
              animate-spin
              text-[#D4AF37]
            "
          />

          <p
            className="
              mt-3
              text-sm
              text-gray-500
            "
          >
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main
      className="
        min-h-screen
        bg-[#faf8f3]
        px-4
        py-6
        transition-colors
        dark:bg-[#050505]
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-[1200px]
        "
      >
        {/* ===================================================
            TOP
        ==================================================== */}

        <div
          className="
            mb-7
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <Link
              href="/dashboard"
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-gray-500
                transition
                hover:text-[#C99516]
              "
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-[#111]
                dark:text-white
                sm:text-4xl
              "
            >
              My Profile
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              Manage your personal information and
              account security.
            </p>
          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-[#D4AF37]
              text-white
              shadow-md
            "
          >
            <User size={24} />
          </div>
        </div>

        {/* ===================================================
            ALERTS
        ==================================================== */}

        {error && (
          <div
            role="alert"
            className="
              mb-5
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="
              mb-5
              rounded-xl
              border
              border-green-200
              bg-green-50
              px-4
              py-3
              text-sm
              text-green-700
            "
          >
            {success}
          </div>
        )}

        {/* ===================================================
            PROFILE HEADER CARD
        ==================================================== */}

        <section
          className="
            mb-6
            overflow-hidden
            rounded-3xl
            border
            border-[#ececec]
            bg-white
            shadow-sm
            dark:border-[#222]
            dark:bg-[#0d0d0d]
          "
        >
          <div
            className="
              bg-gradient-to-r
              from-[#D4AF37]
              via-[#E3C45C]
              to-[#C99516]
              px-6
              py-7
              sm:px-8
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-white
                  bg-white
                  text-[#C99516]
                  shadow-lg
                "
              >
                <User size={38} />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-white/80
                  "
                >
                  Welcome back
                </p>

                <h2
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-white
                  "
                >
                  {fullName || "PrimeCart User"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-white/80
                  "
                >
                  {email}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            GRID
        ==================================================== */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-[1fr_380px]
          "
        >
          {/* =================================================
              PERSONAL INFORMATION
          ================================================== */}

          <section
            className="
              rounded-3xl
              border
              border-[#ececec]
              bg-white
              p-6
              shadow-sm
              dark:border-[#222]
              dark:bg-[#0d0d0d]
              sm:p-8
            "
          >
            <div
              className="
                mb-7
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#D4AF37]/10
                  text-[#C99516]
                "
              >
                <User size={21} />
              </div>

              <div>
                <h2
                  className="
                    text-lg
                    font-bold
                    text-[#111]
                    dark:text-white
                  "
                >
                  Personal Information
                </h2>

                <p
                  className="
                    text-xs
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Update your account details
                </p>
              </div>
            </div>

            {/* NAME */}

            <div className="mb-5">
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#222]
                  dark:text-gray-200
                "
              >
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  disabled={saving}
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    pl-11
                    pr-4
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    focus:border-[#C99516]
                    focus:ring-4
                    focus:ring-[#D4AF37]/10
                    disabled:bg-gray-50
                    dark:border-[#333]
                    dark:bg-[#111]
                    dark:text-white
                  "
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* EMAIL */}

            <div className="mb-5">
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#222]
                  dark:text-gray-200
                "
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  value={email}
                  disabled
                  className="
                    h-12
                    w-full
                    cursor-not-allowed
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    pl-11
                    pr-4
                    text-sm
                    text-gray-500
                    outline-none
                    dark:border-[#333]
                    dark:bg-[#151515]
                    dark:text-gray-400
                  "
                />
              </div>

              <p
                className="
                  mt-2
                  text-[11px]
                  text-gray-400
                "
              >
                Your email address is managed by
                your authentication provider.
              </p>
            </div>

            {/* MOBILE */}

            <div className="mb-7">
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#222]
                  dark:text-gray-200
                "
              >
                Mobile Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  value={mobile}
                  onChange={(e) =>
                    setMobile(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                    )
                  }
                  inputMode="numeric"
                  disabled={saving}
                  placeholder="Enter 10-digit mobile number"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    pl-11
                    pr-4
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    focus:border-[#C99516]
                    focus:ring-4
                    focus:ring-[#D4AF37]/10
                    disabled:bg-gray-50
                    dark:border-[#333]
                    dark:bg-[#111]
                    dark:text-white
                  "
                />
              </div>
            </div>

            {/* SAVE */}

            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={saving}
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#D4AF37]
                text-sm
                font-bold
                text-white
                shadow-[0_7px_18px_rgba(212,175,55,0.20)]
                transition
                hover:bg-[#C99516]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
                sm:px-8
              "
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </section>

          {/* =================================================
              RIGHT COLUMN
          ================================================== */}

          <div className="space-y-6">
            {/* ACCOUNT SECURITY */}

            <section
              className="
                rounded-3xl
                border
                border-[#ececec]
                bg-white
                p-6
                shadow-sm
                dark:border-[#222]
                dark:bg-[#0d0d0d]
              "
            >
              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-green-50
                    text-green-600
                    dark:bg-green-950/30
                  "
                >
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2
                    className="
                      text-lg
                      font-bold
                      text-[#111]
                      dark:text-white
                    "
                  >
                    Account Security
                  </h2>

                  <p
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    Keep your account secure
                  </p>
                </div>
              </div>

              {/* PASSWORD */}

              <div className="mb-4">
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#222]
                    dark:text-gray-200
                  "
                >
                  New Password
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    disabled={passwordLoading}
                    placeholder="At least 6 characters"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      pl-11
                      pr-11
                      text-sm
                      outline-none
                      focus:border-[#C99516]
                      dark:border-[#333]
                      dark:bg-[#111]
                      dark:text-white
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM */}

              <div className="mb-5">
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#222]
                    dark:text-gray-200
                  "
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    disabled={passwordLoading}
                    placeholder="Confirm new password"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      pl-11
                      pr-11
                      text-sm
                      outline-none
                      focus:border-[#C99516]
                      dark:border-[#333]
                      dark:bg-[#111]
                      dark:text-white
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleChangePassword
                }
                disabled={passwordLoading}
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#D4AF37]
                  text-sm
                  font-bold
                  text-[#B18412]
                  transition
                  hover:bg-[#D4AF37]
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {passwordLoading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock size={17} />
                    Change Password
                  </>
                )}
              </button>
            </section>

            {/* QUICK LINKS */}

            <section
              className="
                rounded-3xl
                border
                border-[#ececec]
                bg-white
                p-6
                shadow-sm
                dark:border-[#222]
                dark:bg-[#0d0d0d]
              "
            >
              <h2
                className="
                  mb-4
                  text-lg
                  font-bold
                  text-[#111]
                  dark:text-white
                "
              >
                Quick Links
              </h2>

              <div className="space-y-2">
                <Link
                  href="/dashboard/orders"
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    p-3
                    transition
                    hover:bg-gray-50
                    dark:hover:bg-[#151515]
                  "
                >
                  <ShoppingBag
                    size={19}
                    className="text-[#C99516]"
                  />

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-200
                    "
                  >
                    My Orders
                  </span>
                </Link>

                <Link
                  href="/dashboard/wishlist"
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    p-3
                    transition
                    hover:bg-gray-50
                    dark:hover:bg-[#151515]
                  "
                >
                  <span
                    className="
                      text-lg
                      text-[#C99516]
                    "
                  >
                    ♡
                  </span>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-200
                    "
                  >
                    My Wishlist
                  </span>
                </Link>
              </div>
            </section>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-200
                bg-white
                text-sm
                font-bold
                text-red-600
                transition
                hover:bg-red-50
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-red-900
                dark:bg-[#0d0d0d]
              "
            >
              {loggingOut ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut size={18} />
                  Logout
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
