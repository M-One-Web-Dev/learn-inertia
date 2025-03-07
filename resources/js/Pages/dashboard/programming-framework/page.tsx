import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            breadcrumb={[{ name: 'Framework', url: '/dashboard/framework' }]}
        >
            <Head title="Framework" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Framework</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
