import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            breadcrumb={[{ name: 'User', url: '/dashboard/user' }]}
        >
            <Head title="Dashboard - User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">User</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
