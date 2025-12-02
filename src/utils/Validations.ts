export const isValidEmail = (email: string): boolean =>
/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string): boolean =>
/^\d{10,15}$/.test(phone);

export const isValidDOB = (dob: string): boolean => {
const date = new Date(dob);
return date < new Date();
};

export const validateSignup = (formData: any): string | null => {
const { name, email, password, dob, gender, phone } = formData;

if (!name || !email || !password || !dob || !gender || !phone) {
return "Please fill in all fields";
}

if (!isValidEmail(email)) return "Invalid email format";

if (password.length < 6)
return "Password must be at least 6 characters";

if (!isValidPhone(phone))
return "Please enter a valid phone number";

if (!isValidDOB(dob)) return "Invalid Date of Birth";

return null; // no validation errors
};

export const validateLogin = (email: string, password: string): string | null => {
if (!email || !password) return "Please enter both Email and Password";

if (!isValidEmail(email)) return "Invalid email format";

return null;
};
