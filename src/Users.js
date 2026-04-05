import { Link } from 'react-router-dom';
import { useCustomers, useEarnPoints, useRedeemPoints, useDeleteCustomer } from './hooks/useLoyalty';
import { FiPlus, FiGift, FiUser, FiUsers, FiEdit3, FiTrash2 } from 'react-icons/fi';

export default function Customers() {
  const { data: customers, isLoading } = useCustomers();
  const earnPoints = useEarnPoints();
  const redeemPoints = useRedeemPoints();
  const deleteCustomer = useDeleteCustomer();

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      deleteCustomer.mutate(id);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen font-bold">Loading customers...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900">Customers</h1>
            <p className="mt-2 text-gray-600">Give points and redeem rewards for your loyal fans.</p>
          </div>
          <Link to="/admin/user/create" className="bg-black text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition active:scale-95 flex items-center gap-2">
            <FiPlus /> New Customer
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers?.map((customer) => (
            <div key={customer._id} className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group">
              {/* Point Badge */}
              <div className="absolute top-0 right-0 bg-black text-white px-6 py-2 rounded-bl-3xl font-black text-lg">
                {customer.points} <span className="text-xs uppercase font-normal ml-1">pts</span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-2xl group-hover:bg-black group-hover:text-white transition-colors">
                  <FiUser />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{customer.email}</p>
                </div>
                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Link 
                    to={`/admin/users/${customer._id}`} 
                    className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition"
                    title="Edit Profile"
                  >
                    <FiEdit3 />
                  </Link>
                  <button 
                    onClick={() => handleDelete(customer._id, customer.name)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                    title="Delete User"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  onClick={() => earnPoints.mutate({ customerId: customer._id, pointsToAdd: 1 })}
                  disabled={earnPoints.isPending}
                  className="bg-green-50 text-green-700 p-4 rounded-2xl font-bold hover:bg-green-100 transition flex flex-col items-center gap-1 group/btn"
                >
                  <FiPlus className="text-xl group-hover/btn:scale-125 transition-transform" />
                  <span className="text-[10px] uppercase tracking-tighter">Add Point</span>
                </button>
                
                <button
                  onClick={() => {
                    const points = prompt("Enter points to redeem:", "10");
                    if (points) redeemPoints.mutate({ customerId: customer._id, pointsToRedeem: parseInt(points) });
                  }}
                  disabled={redeemPoints.isPending}
                  className="bg-red-50 text-red-700 p-4 rounded-2xl font-bold hover:bg-red-100 transition flex flex-col items-center gap-1 group/btn"
                >
                  <FiGift className="text-xl group-hover/btn:scale-125 transition-transform" />
                  <span className="text-[10px] uppercase tracking-tighter">Redeem</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {customers?.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <FiUsers className="mx-auto text-6xl text-gray-200 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400">No customers found</h3>
            <p className="text-gray-400 mt-2">Start registering customers to see them here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
