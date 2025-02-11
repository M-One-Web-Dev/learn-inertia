import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            breadcrumb={[{ name: 'Languange', url: '/dashboard/languange' }]}
        >
            <Head title="Dashboard - Language" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Language</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
