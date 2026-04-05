import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api/axios";
import toast from "react-hot-toast";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get(`/loyalty/customers/${id}`);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setUpdating(true);
    try {
      await api.patch(`/loyalty/customers/${id}`, {
        name,
        email,
        password: password || undefined,
      });
      toast.success("User updated successfully");
      nav("/admin/users");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen font-black text-xl tracking-widest animate-pulse uppercase">Fetching User Profile...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-12 transform transition-all hover:scale-[1.01]">
        <h2 className="text-3xl font-black mb-8 text-center text-gray-900 tracking-tighter">
          Update Profile
        </h2>
        
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-secondary transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-secondary transition-all outline-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-50">
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4">Leave blank to keep current password</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-secondary transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-secondary transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-primary text-black py-5 rounded-[2rem] font-black text-lg hover:opacity-90 transition-all shadow-xl active:scale-95 disabled:opacity-50 border-4 border-white"
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
