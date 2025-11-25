import { prisma } from "@repo/database";
import { Mail, Phone, CheckCircle, XCircle } from "lucide-react";

export default async function ContactPage() {
    const inquiries = await prisma.contactInquiry.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="p-8 w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Inquiries</h1>
                    <p className="text-gray-500">Manage customer messages and support requests</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {inquiries.map((inquiry: any) => (
                        <div key={inquiry.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-lg font-bold text-gray-900">{inquiry.name}</h3>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${inquiry.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                                            inquiry.status === 'RESPONDED' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {inquiry.status}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-400">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <div className="flex items-center space-x-1">
                                    <Mail size={14} />
                                    <span>{inquiry.email}</span>
                                </div>
                                {inquiry.phone && (
                                    <div className="flex items-center space-x-1">
                                        <Phone size={14} />
                                        <span>{inquiry.phone}</span>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm">
                                {inquiry.subject && <div className="font-bold mb-1">{inquiry.subject}</div>}
                                {inquiry.message}
                            </div>

                            <div className="mt-4 flex space-x-3">
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Reply</button>
                                <button className="text-sm font-medium text-gray-600 hover:text-gray-800">Mark as Closed</button>
                            </div>
                        </div>
                    ))}
                    {inquiries.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            No inquiries found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
