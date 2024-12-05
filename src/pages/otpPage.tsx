import { useRef, useState } from "react";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return; // Prevent input of more than one digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input field
    if (value && index < otp.length - 1) {
      otpInputRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("Text").split("");
    if (pastedData.length === otp.length) {
      setOtp(pastedData);
      otpInputRef.current[otp.length - 1]?.focus();
    }
  };

  return (
    <div className="relative font-inter antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center">
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
                <p className="text-[15px] text-slate-500">
                  Enter the 4-digit verification code that was sent to your mail.
                </p>
              </header>
              <form id="otp-form">
                <div className="flex items-center justify-center gap-3">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onPaste={handlePaste}
                      ref={(el) => (otpInputRef.current[index] = el)}
                      className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      pattern="\d*"
                      maxLength={1}
                    />
                  ))}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                  >
                    Verify Account
                  </button>
                </div>
              </form>
              <div className="text-sm text-slate-500 mt-4">
                Didn't receive code?{" "}
                <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <footer className="absolute left-6 right-6 md:left-12 md:right-auto bottom-4 md:bottom-8 text-center md:text-left">
        <a
          className="text-xs text-slate-500 hover:underline"
          href="https://cruip.com"
        >
          &copy;Cruip - Tailwind CSS templates
        </a>
      </footer> */}
      {/* <div className="fixed bottom-0 right-0 w-full md:bottom-6 md:right-12 md:w-auto z-50">
        <div className="bg-slate-800 text-sm p-3 md:rounded shadow flex justify-between">
          <div className="text-slate-500 inline-flex">
            <a
              className="font-medium hover:underline text-slate-300"
              href="https://cruip.com/otp-form-example-made-with-tailwind-css-and-javascript/"
              target="_blank"
            >
              Read Tutorial
            </a>
            <span className="italic px-1.5">or</span>
            <a
              className="font-medium hover:underline text-indigo-500 flex items-center"
              href="https://github.com/cruip/cruip-tutorials/blob/main/otp-form/index.html"
              target="_blank"
              rel="noreferrer"
            >
              <span>Download</span>
              <svg
                className="fill-indigo-400 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
              >
                <path d="m1.649 8.514-.91-.915 5.514-5.523H2.027l.01-1.258h6.388v6.394H7.158l.01-4.226z" />
              </svg>
            </a>
          </div>
          <button className="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-slate-700">
            <span className="sr-only">Close</span>
            <svg
              className="w-4 h-4 shrink-0 fill-current"
              viewBox="0 0 16 16"
            >
              <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
            </svg>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default OtpVerification;
